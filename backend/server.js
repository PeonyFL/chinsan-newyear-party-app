const express = require('express');
const cors = require('cors');
const db = require('./database.js');
const qrcode = require('qrcode');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const PORT = 3000;
const CORRECT_PASSWORD = 'admin'; // Admin password

// Setup (Uploads folder, Multer, Middleware)
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
const upload = multer({ dest: uploadDir + '/' });
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public'

// Helper Functions (safeUnlink, handleUploadErrors)
function safeUnlink(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (unlinkErr) {
        console.error("Error deleting temp file:", filePath, unlinkErr.message);
    }
}
function handleUploadErrors(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ "error": "Upload Error: " + err.message });
    } else if (err) {
        return res.status(500).json({ "error": "Unknown upload error: " + err.message });
    }
    next();
}

// --- Employee Endpoints ---

// POST /upload-employees - Upload Excel file for bulk employee addition
app.post('/upload-employees', upload.single('employeeFile'), handleUploadErrors, (req, res) => {
    const { adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        safeUnlink(req.file.path);
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    if (!req.file) {
        return res.status(400).json({ "error": "ไม่พบไฟล์ที่อัปโหลด" });
    }
    const filePath = req.file.path;
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        const sql = 'INSERT OR IGNORE INTO employees (first_name, last_name, department, employee_id) VALUES (?,?,?,?)';
        const stmt = db.prepare(sql);
        let count = 0;
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');
            // Start from 1 to skip header row
            for (let i = 1; i < data.length; i++) {
                const row = data[i];
                // Ensure all required columns exist
                if (row && row[0] && row[1] && row[2] && row[3]) {
                    const firstName = row[0];
                    const lastName = row[1];
                    const department = row[2];
                    const employeeId = String(row[3]).toUpperCase(); // Standardize employee ID
                    stmt.run(firstName, lastName, department, employeeId);
                    count++;
                }
            }
            db.run('COMMIT', (err) => {
                if (err) {
                    db.run('ROLLBACK');
                    safeUnlink(filePath);
                    return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + err.message });
                }
                stmt.finalize();
                safeUnlink(filePath); // Delete temp file after processing
                res.status(200).json({ "message": `อัปโหลดและประมวลผลข้อมูลสำเร็จ ${count} รายการ (รอพนักงานยืนยัน)` });
            });
        });
    } catch (err) {
        safeUnlink(filePath); // Delete temp file on error
        return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการประมวลผลไฟล์ Excel: " + err.message });
    }
});

// POST /add-employee - Admin adds a single employee
app.post('/add-employee', (req, res) => {
    const { firstName, lastName, department, employeeId, adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    if (!firstName || !lastName || !department || !employeeId) {
        return res.status(400).json({ "error": "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }
    const sql = 'INSERT OR IGNORE INTO employees (first_name, last_name, department, employee_id) VALUES (?,?,?,?)';
    const employeeIdUpper = String(employeeId).toUpperCase();
    db.run(sql, [firstName, lastName, department, employeeIdUpper], function(err) {
        if (err) {
            return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + err.message });
        }
        if (this.changes === 0) { // If IGNORE prevented insertion (duplicate employee_id)
            return res.status(409).json({ "error": "มีรหัสพนักงานนี้ในระบบแล้ว" });
        }
        res.status(201).json({ "message": "เพิ่มข้อมูลพนักงานสำเร็จ (รอพนักงานยืนยัน)" });
    });
});

// GET /find/:employeeId - Employee finds their info and confirms registration
app.get('/find/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId.toUpperCase();
    const sql = "SELECT * FROM employees WHERE employee_id = ?";
    db.get(sql, [employeeId], (err, row) => {
        if (err) { return res.status(500).json({ "error": err.message }); }
        if (row) {
            const isFirstTimeRegistration = (row.registration_time === null);
            const processRequest = async () => {
                try {
                    const qrCodeDataUrl = await qrcode.toDataURL(row.employee_id, { width: 350, margin: 1 });
                    res.status(200).json({
                        "message": isFirstTimeRegistration ? "ยืนยันการลงทะเบียนสำเร็จ!" : "พบข้อมูลของคุณแล้ว",
                        "data": {
                            "firstName": row.first_name, "lastName": row.last_name, "department": row.department,
                            "employeeId": row.employee_id, "qrCode": qrCodeDataUrl
                        }
                    });
                } catch (qrErr) {
                    return res.status(500).json({ "error": "ไม่สามารถสร้าง QR Code ได้" });
                }
            };
            if (isFirstTimeRegistration) {
                // Use ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ) for JavaScript compatibility
                const sql_update = "UPDATE employees SET registration_time = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE employee_id = ?";
                db.run(sql_update, [employeeId], (updateErr) => {
                    if (updateErr) {
                        return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการบันทึกเวลายืนยัน" });
                    }
                    processRequest(); // Proceed after successful update
                });
            } else {
                processRequest(); // Proceed directly if already registered
            }
        } else {
            return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้ในระบบ" });
        }
    });
});

// GET /employees - Get list of all employees (Admin)
app.get('/employees', (req, res) => {
    const sql = "SELECT id, first_name, last_name, employee_id, department, registration_time, checked_in, checkin_time FROM employees ORDER BY registration_time DESC";
    db.all(sql, [], (err, rows) => {
        if (err) { res.status(500).json({ "error": err.message }); return; }
        res.status(200).json({ "message": "success", "data": rows });
    });
});

// POST /checkin - Check in an employee (Admin)
app.post('/checkin', (req, res) => {
    const { employeeId } = req.body;
    if (!employeeId) { return res.status(400).json({ "error": "กรุณากรอกรหัสพนักงาน" }); }
    const employeeIdUpper = employeeId.toUpperCase();
    const sql = "SELECT * FROM employees WHERE employee_id = ?";
    db.get(sql, [employeeIdUpper], (err, row) => {
        if (err) { return res.status(500).json({ "error": err.message }); }
        if (!row) { return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้ในระบบ" }); }
        if (row.checked_in) {
            return res.status(409).json({
                "error": "พนักงานคนนี้เช็คอินไปแล้ว",
                "data": { // Include data for display
                    "firstName": row.first_name, "lastName": row.last_name, "department": row.department,
                    "employeeId": row.employee_id, "checkin_time": row.checkin_time
                }
            });
        }
        // Use ISO 8601 format
        const updateSql = `UPDATE employees SET checked_in = 1, checkin_time = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE employee_id = ?`;
        db.run(updateSql, [employeeIdUpper], function(err) {
            if (err) { return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการบันทึกข้อมูลเช็คอิน" }); }
            res.status(200).json({
                "message": "เช็คอินสำเร็จ!",
                "data": { "firstName": row.first_name, "lastName": row.last_name, "department": row.department, "employeeId": row.employee_id }
            });
        });
    });
});

// DELETE /employees/all - Delete all employee data (Admin)
app.delete('/employees/all', (req, res) => {
    const { adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        db.run("DELETE FROM employees"); // Clear employees
        db.run("DELETE FROM votes"); // Clear votes log
        db.run("UPDATE candidates SET votes = 0"); // Reset candidate votes
        db.run('COMMIT', (err) => {
            if (err) {
                db.run('ROLLBACK');
                return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการยืนยัน Transaction: " + err.message });
            }
            res.status(200).json({ "message": "ลบข้อมูลพนักงาน, ข้อมูลการโหวต, และรีเซ็ตคะแนนทั้งหมดสำเร็จ" });
        });
    });
});

// DELETE /employees/:id - Delete a single employee (Admin)
app.delete('/employees/:id', (req, res) => {
    const { adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    const sql = "DELETE FROM employees WHERE id = ?";
    db.run(sql, [req.params.id], function(err) {
        if (err) { return res.status(500).json({ "error": err.message }); }
        if (this.changes === 0) { return res.status(404).json({ "error": "ไม่พบข้อมูลพนักงานที่ต้องการลบ" }); }
        res.status(200).json({ "message": "ลบข้อมูลสำเร็จ" });
    });
});

// --- Prize Endpoints ---

// GET /draw - Select winners for the draw
app.get('/draw', (req, res) => {
    // 1. Get the number of prizes
    db.get("SELECT COUNT(*) as count FROM prizes", [], (err, prizeRow) => {
        if (err) { return res.status(500).json({ "error": "Database error getting prize count: " + err.message }); }
        const numberOfWinners = prizeRow.count;
        if (numberOfWinners === 0) {
            return res.status(400).json({ "error": "กรุณาเพิ่มรางวัลในหน้า 'จัดการรางวัล' ก่อน" });
        }

        // 2. Select eligible employees (checked_in = 1)
        const sql = "SELECT id, first_name, last_name, employee_id, department FROM employees WHERE checked_in = 1";
        db.all(sql, [], (err, rows) => {
            if (err) { return res.status(500).json({ "error": "Database error getting checked-in employees: " + err.message }); }
            if (rows.length === 0) {
                return res.status(400).json({ "error": "ยังไม่มีผู้เช็คอินเข้าร่วมงาน" });
            }
            if (rows.length < numberOfWinners) {
                return res.status(400).json({ "error": `มีผู้เช็คอิน (${rows.length} คน) น้อยกว่าจำนวนรางวัล (${numberOfWinners} รางวัล)` });
            }

            // 3. Shuffle the eligible employees (Fisher-Yates shuffle)
            for (let i = rows.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [rows[i], rows[j]] = [rows[j], rows[i]];
            }

            // 4. Select the winners
            const winners = rows.slice(0, numberOfWinners);
            res.status(200).json({ "message": "success", "data": winners });
        });
    });
});

// GET /prizes - Get all prizes
app.get('/prizes', (req, res) => {
    const sql = "SELECT * FROM prizes ORDER BY id ASC"; // Order prizes consistently
    db.all(sql, [], (err, rows) => {
        if (err) { return res.status(500).json({ "error": err.message }); }
        res.status(200).json({ data: rows });
    });
});

// POST /prizes - Add a new prize
app.post('/prizes', (req, res) => {
    const { name, adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    if (!name) {
        return res.status(400).json({ "error": "กรุณากรอกชื่อรางวัล" });
    }
    const sql = "INSERT INTO prizes (name) VALUES (?)";
    db.run(sql, [name], function(err) {
        if (err) { return res.status(500).json({ "error": err.message }); }
        res.status(201).json({ "message": "เพิ่มรางวัลสำเร็จ", "id": this.lastID });
    });
});

// PUT /prizes/:id - Edit an existing prize
app.put('/prizes/:id', (req, res) => {
    const { name, adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    if (!name) {
        return res.status(400).json({ "error": "กรุณากรอกชื่อรางวัล" });
    }
    const sql = "UPDATE prizes SET name = ? WHERE id = ?";
    db.run(sql, [name, req.params.id], function(err) {
        if (err) { return res.status(500).json({ "error": err.message }); }
        if (this.changes === 0) { return res.status(404).json({ "error": "ไม่พบรางวัลที่ต้องการแก้ไข" }); }
        res.status(200).json({ "message": "แก้ไขรางวัลสำเร็จ" });
    });
});

// DELETE /prizes/:id - Delete a prize
app.delete('/prizes/:id', (req, res) => {
    const { adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    const sql = "DELETE FROM prizes WHERE id = ?";
    db.run(sql, [req.params.id], function(err) {
        if (err) { return res.status(500).json({ "error": err.message }); }
        if (this.changes === 0) { return res.status(404).json({ "error": "ไม่พบรางวัลที่ต้องการลบ" }); }
        res.status(200).json({ "message": "ลบรางวัลสำเร็จ" });
    });
});

// POST /prizes/reset - Reset prizes to default
app.post('/prizes/reset', (req, res) => {
    const { adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    db.serialize(() => {
        db.run("DELETE FROM prizes"); // Clear existing prizes
        const insert = 'INSERT INTO prizes (name) VALUES (?)';
        // Add default prizes
        db.run(insert, ["รางวัลที่ 5: บัตรกำนัล 2,000 บาท"]);
        db.run(insert, ["รางวัลที่ 4: พัดลมไอน้ำ"]);
        db.run(insert, ["รางวัลที่ 3: Smart TV 55 นิ้ว"]);
        db.run(insert, ["รางวัลที่ 2: ทองคำ 1 บาท"]);
        db.run(insert, ["รางวัลที่ 1: iPhone 16"], (err) => { // Use callback on the last insert
             if (err) { return res.status(500).json({ "error": "Failed to repopulate prizes" }); }
             res.status(200).json({ "message": "รีเซ็ตรายการรางวัลเป็นค่าเริ่มต้นสำเร็จ" });
        });
    });
});

// --- Vote Endpoints ---

// GET /candidates - Get all candidates (includes votes for management/results)
app.get('/candidates', (req, res) => {
    const sql = "SELECT id, name, department, votes FROM candidates ORDER BY votes DESC"; // Order by votes for results display
    db.all(sql, [], (err, rows) => {
        if (err) { return res.status(500).json({ "error": err.message }); }
        res.status(200).json({ data: rows });
    });
});

// POST /vote - Submit a vote
app.post('/vote', (req, res) => {
    const { employeeId, candidateId } = req.body;
    if (!employeeId || !candidateId) { return res.status(400).json({ "error": "ข้อมูลไม่ครบถ้วน (vote)" }); }
    const employeeIdUpper = employeeId.toUpperCase();

    // Double-check check-in status on the server
    db.get("SELECT checked_in FROM employees WHERE employee_id = ?", [employeeIdUpper], (err, empRow) => {
        if (err) { return res.status(500).json({ "error": "DB Error checking employee status: " + err.message }); }
        if (!empRow) { return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้" }); } // Should be caught by eligibility check, but good to have
        if (!empRow.checked_in) { return res.status(403).json({ "error": "พนักงานยังไม่ได้เช็คอิน (Server Check)" }); } // Extra server-side check

        // Check if already voted
        db.get("SELECT * FROM votes WHERE employee_id = ?", [employeeIdUpper], (err, voteRow) => {
            if (err) { return res.status(500).json({ "error": "DB Error checking vote status: " + err.message }); }
            if (voteRow) { return res.status(409).json({ "error": "คุณได้ทำการโหวตไปแล้ว (Server Check)" }); }

            // Proceed with voting in a transaction
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');
                // Log the vote
                db.run("INSERT INTO votes (employee_id) VALUES (?)", [employeeIdUpper], (err) => {
                    if (err) {
                        db.run('ROLLBACK');
                        return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการบันทึกสิทธิ์โหวต" });
                    }
                });
                // Increment candidate's vote count
                db.run("UPDATE candidates SET votes = votes + 1 WHERE id = ?", [candidateId], (err) => {
                     if (err) {
                        db.run('ROLLBACK');
                        return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการอัปเดตคะแนน" });
                    }
                });
                // Commit transaction
                db.run('COMMIT', (err) => {
                    if (err) {
                        db.run('ROLLBACK'); // Rollback on commit error
                        return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการยืนยันผลโหวต" });
                    }
                    res.status(200).json({ "message": "โหวตสำเร็จ!" });
                });
            });
        });
    });
});

// GET /results - Get vote results (same as /candidates now)
app.get('/results', (req, res) => {
    const sql = "SELECT name, department, votes FROM candidates ORDER BY votes DESC";
    db.all(sql, [], (err, rows) => {
        if (err) { return res.status(500).json({ "error": err.message }); }
        res.status(200).json({ data: rows });
    });
});

// POST /candidates - Add a new candidate
app.post('/candidates', (req, res) => {
    const { name, department, adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    if (!name || !department) {
        return res.status(400).json({ "error": "กรุณากรอกชื่อและฝ่าย" });
    }
    const sql = "INSERT INTO candidates (name, department) VALUES (?, ?)";
    db.run(sql, [name, department], function(err) {
        if (err) { return res.status(500).json({ "error": err.message }); }
        res.status(201).json({ "message": "เพิ่มผู้เข้าประกวดสำเร็จ", "id": this.lastID });
    });
});

// PUT /candidates/:id - Edit a candidate
app.put('/candidates/:id', (req, res) => {
    const { name, department, adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    if (!name || !department) {
        return res.status(400).json({ "error": "กรุณากรอกชื่อและฝ่าย" });
    }
    const sql = "UPDATE candidates SET name = ?, department = ? WHERE id = ?";
    db.run(sql, [name, department, req.params.id], function(err) {
        if (err) { return res.status(500).json({ "error": err.message }); }
        if (this.changes === 0) { return res.status(404).json({ "error": "ไม่พบผู้เข้าประกวดที่ต้องการแก้ไข" }); }
        res.status(200).json({ "message": "แก้ไขผู้เข้าประกวดสำเร็จ" });
    });
});

// DELETE /candidates/:id - Delete a candidate
app.delete('/candidates/:id', (req, res) => {
    const { adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    // Note: Deleting a candidate also implicitly removes their votes,
    // but does not give back the vote permission to employees who voted for them.
    const sql = "DELETE FROM candidates WHERE id = ?";
    db.run(sql, [req.params.id], function(err) {
        if (err) { return res.status(500).json({ "error": err.message }); }
        if (this.changes === 0) { return res.status(404).json({ "error": "ไม่พบผู้เข้าประกวดที่ต้องการลบ" }); }
        res.status(200).json({ "message": "ลบผู้เข้าประกวดสำเร็จ" });
    });
});

// POST /candidates/reset - Reset candidates to default
app.post('/candidates/reset', (req, res) => {
    const { adminPassword } = req.body;
    if (adminPassword !== CORRECT_PASSWORD) {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }
    db.serialize(() => {
        db.run("DELETE FROM candidates"); // Clear all candidates
        db.run("DELETE FROM votes"); // IMPORTANT: Clear all vote records as well
        const insert = 'INSERT INTO candidates (name, department) VALUES (?,?)';
        // Add default candidates
        db.run(insert, ["สมชาย ใจดี", "ฝ่ายขาย"]);
        db.run(insert, ["สมศรี มีสุข", "ฝ่ายการตลาด"]);
        db.run(insert, ["พรเทพ มุ่งมั่น", "ฝ่ายบุคคล"], (err) => { // Callback on last insert
             if (err) { return res.status(500).json({ "error": "Failed to repopulate candidates" }); }
             res.status(200).json({ "message": "รีเซ็ตผู้เข้าประกวดและเคลียร์ผลโหวตทั้งหมดสำเร็จ" });
        });
    });
});

// GET /check-vote-eligibility/:employeeId - Check if employee can vote
app.get('/check-vote-eligibility/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId.toUpperCase();
    if (!employeeId) {
        return res.status(400).json({ status: 'error', message: "กรุณากรอกรหัสพนักงาน" });
    }

    // 1. Check if employee exists and is checked in
    const sqlEmployee = "SELECT checked_in FROM employees WHERE employee_id = ?";
    db.get(sqlEmployee, [employeeId], (err, empRow) => {
        if (err) { return res.status(500).json({ status: 'error', message: "DB Error: " + err.message }); }
        if (!empRow) {
            return res.status(404).json({ status: 'not_found', message: "ไม่พบรหัสพนักงานนี้" });
        }
        if (!empRow.checked_in) {
            return res.status(403).json({ status: 'not_checked_in', message: "คุณยังไม่ได้เช็คอินเข้าร่วมงาน" });
        }

        // 2. Check if employee has already voted
        const sqlVote = "SELECT * FROM votes WHERE employee_id = ?";
        db.get(sqlVote, [employeeId], (err, voteRow) => {
            if (err) { return res.status(500).json({ status: 'error', message: "DB Error: " + err.message }); }
            if (voteRow) {
                return res.status(409).json({ status: 'already_voted', message: "คุณได้ทำการโหวตไปแล้ว" });
            }
            // If checked in and not voted yet, they are eligible
            res.status(200).json({ status: 'eligible', message: "คุณมีสิทธิ์โหวต" });
        });
    });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});