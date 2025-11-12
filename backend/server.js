const express = require('express');
const cors = require('cors');
const db = require('./database.js'); // ต้องมั่นใจว่า database.js export 'pool' จาก pg
const qrcode = require('qrcode');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
// const CORRECT_PASSWORD = 'admin'; // (ยกเลิกการตรวจสอบรหัสผ่านตามโค้ดล่าสุด)

// Setup (Uploads folder, Multer, Middleware)
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
const upload = multer({ dest: uploadDir + '/' });
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper Functions
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

// POST /upload-employees - Upload Excel file
app.post('/upload-employees', upload.single('employeeFile'), handleUploadErrors, async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ "error": "ไม่พบไฟล์ที่อัปโหลด" });
    }
    const filePath = req.file.path;
    const client = await db.connect(); // ขอ Client สำหรับ Transaction

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        await client.query('BEGIN'); // เริ่ม Transaction

        // PostgreSQL: ใช้ $1, $2... และ ON CONFLICT DO NOTHING
        const sql = `
            INSERT INTO employees (first_name, last_name, department, employee_id) 
            VALUES ($1, $2, $3, $4) 
            ON CONFLICT (employee_id) DO NOTHING
        `;
        
        let count = 0;
        // Start from 1 to skip header row
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (row && row[0] && row[1] && row[2] && row[3]) {
                const firstName = row[0];
                const lastName = row[1];
                const department = row[2];
                const employeeId = String(row[3]).toUpperCase();
                
                await client.query(sql, [firstName, lastName, department, employeeId]);
                count++;
            }
        }

        await client.query('COMMIT'); // ยืนยัน
        res.status(200).json({ "message": `อัปโหลดและประมวลผลข้อมูลสำเร็จ ${count} รายการ (รอพนักงานยืนยัน)` });

    } catch (err) {
        await client.query('ROLLBACK'); // ยกเลิกถ้ามีปัญหา
        return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการประมวลผลไฟล์ Excel: " + err.message });
    } finally {
        client.release(); // คืน Connection
        safeUnlink(filePath);
    }
});

// POST /add-employee - Admin adds a single employee
app.post('/add-employee', async (req, res) => {
    const { firstName, lastName, department, employeeId } = req.body;

    if (!firstName || !lastName || !department || !employeeId) {
        return res.status(400).json({ "error": "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    const employeeIdUpper = String(employeeId).toUpperCase();
    
    // PostgreSQL: ใช้ NOW()
    const sql = `
        INSERT INTO employees (first_name, last_name, department, employee_id, registration_time) 
        VALUES ($1, $2, $3, $4, NOW())
        ON CONFLICT (employee_id) DO NOTHING
    `;

    try {
        const result = await db.query(sql, [firstName, lastName, department, employeeIdUpper]);
        
        // ตรวจสอบว่ามีการ Insert จริงหรือไม่ (rowCount)
        if (result.rowCount === 0) {
            return res.status(409).json({ "error": "มีรหัสพนักงานนี้ในระบบแล้ว" });
        }
        res.status(201).json({ "message": "เพิ่มและยืนยันข้อมูลพนักงานสำเร็จ" });
    } catch (err) {
        res.status(500).json({ "error": "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + err.message });
    }
});

// GET /find/:employeeId
app.get('/find/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId.toUpperCase();
    const sql = "SELECT * FROM employees WHERE employee_id = $1"; // ใช้ $1

    try {
        const result = await db.query(sql, [employeeId]);
        const row = result.rows[0];

        if (row) {
            const isFirstTimeRegistration = (row.registration_time === null);
            
            const processRequest = async () => {
                try {
                    const qrCodeDataUrl = await qrcode.toDataURL(row.employee_id, { width: 350, margin: 1 });
                    res.status(200).json({
                        "message": isFirstTimeRegistration ? "ยืนยันการลงทะเบียนสำเร็จ!" : "พบข้อมูลของคุณแล้ว",
                        "data": {
                            "firstName": row.first_name, 
                            "lastName": row.last_name, 
                            "department": row.department,
                            "employeeId": row.employee_id, 
                            "qrCode": qrCodeDataUrl
                        }
                    });
                } catch (qrErr) {
                    return res.status(500).json({ "error": "ไม่สามารถสร้าง QR Code ได้" });
                }
            };

            if (isFirstTimeRegistration) {
                // PostgreSQL: ใช้ NOW()
                const sql_update = "UPDATE employees SET registration_time = NOW() WHERE employee_id = $1";
                await db.query(sql_update, [employeeId]);
                processRequest();
            } else {
                processRequest();
            }
        } else {
            return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้ในระบบ" });
        }
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// GET /employees
app.get('/employees', async (req, res) => {
    // PostgreSQL: boolean checked_in จะคืนค่าเป็น true/false
    const sql = `
        SELECT id, first_name, last_name, employee_id, department, 
               registration_time, checked_in, checkin_time, 
               sport_day_registered, sport_day_reg_time 
        FROM employees 
        ORDER BY registration_time DESC
    `;
    try {
        const result = await db.query(sql);
        res.status(200).json({ "message": "success", "data": result.rows });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// GET /employees/status-summary
app.get('/employees/status-summary', async (req, res) => {
    const queries = {
        total: "SELECT COUNT(*) as count FROM employees",
        new_year: "SELECT COUNT(*) as count FROM employees WHERE registration_time IS NOT NULL",
        sport_day: "SELECT COUNT(*) as count FROM employees WHERE sport_day_registered = TRUE", // Postgres: TRUE
        checked_in: "SELECT COUNT(*) as count FROM employees WHERE checked_in = TRUE",
        all_three: "SELECT COUNT(*) as count FROM employees WHERE registration_time IS NOT NULL AND sport_day_registered = TRUE AND checked_in = TRUE"
    };

    try {
        const results = {};
        // รัน Query ทั้งหมดพร้อมกัน
        for (const [key, query] of Object.entries(queries)) {
            const result = await db.query(query);
            // Postgres COUNT(*) คืนค่าเป็น String (bigint) ต้องแปลงเป็น Int
            results[key] = parseInt(result.rows[0].count);
        }
        res.status(200).json({ data: results });
    } catch (err) {
        res.status(500).json({ "error": "Database error: " + err.message });
    }
});

// POST /checkin
app.post('/checkin', async (req, res) => {
    const { employeeId } = req.body;
    if (!employeeId) { return res.status(400).json({ "error": "กรุณากรอกรหัสพนักงาน" }); }
    
    const employeeIdUpper = employeeId.toUpperCase();
    const sql = "SELECT * FROM employees WHERE employee_id = $1";

    try {
        const result = await db.query(sql, [employeeIdUpper]);
        const row = result.rows[0];

        if (!row) { return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้ในระบบ" }); }
        
        if (row.checked_in) { // Postgres returns boolean true/false directly
            return res.status(409).json({
                "error": "พนักงานคนนี้เช็คอินไปแล้ว",
                "data": {
                    "firstName": row.first_name, "lastName": row.last_name, 
                    "department": row.department, "employeeId": row.employee_id, 
                    "checkin_time": row.checkin_time
                }
            });
        }

        const updateSql = `UPDATE employees SET checked_in = TRUE, checkin_time = NOW() WHERE employee_id = $1`;
        await db.query(updateSql, [employeeIdUpper]);
        
        res.status(200).json({
            "message": "เช็คอินสำเร็จ!",
            "data": { "firstName": row.first_name, "lastName": row.last_name, "department": row.department, "employeeId": row.employee_id }
        });

    } catch (err) {
        res.status(500).json({ "error": "เกิดข้อผิดพลาดในการบันทึกข้อมูลเช็คอิน: " + err.message });
    }
});

// POST /sportday-register
app.post('/sportday-register', async (req, res) => {
    const { employeeId } = req.body;
    if (!employeeId) { return res.status(400).json({ "error": "กรุณากรอกรหัสพนักงาน" }); }
    
    const employeeIdUpper = employeeId.toUpperCase();
    const sql = "SELECT * FROM employees WHERE employee_id = $1";

    try {
        const result = await db.query(sql, [employeeIdUpper]);
        const row = result.rows[0];

        if (!row) { return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้ในระบบ" }); }
        
        if (row.sport_day_registered) {
            return res.status(409).json({
                "error": "คุณได้ลงทะเบียนเข้าร่วมงานกีฬาสีไปแล้ว",
                "data": { "reg_time": row.sport_day_reg_time }
            });
        }

        const updateSql = `UPDATE employees SET sport_day_registered = TRUE, sport_day_reg_time = NOW() WHERE employee_id = $1`;
        await db.query(updateSql, [employeeIdUpper]);

        res.status(200).json({
            "message": "ลงทะเบียนเข้าร่วมงานกีฬาสีสำเร็จ!",
            "data": { 
                "firstName": row.first_name, "lastName": row.last_name, 
                "department": row.department, "employeeId": row.employee_id 
            }
        });

    } catch (err) {
        res.status(500).json({ "error": "เกิดข้อผิดพลาด: " + err.message });
    }
});

// DELETE /employees/all
app.delete('/employees/all', async (req, res) => {
    const { adminPassword } = req.body;
    // ใช้ 'admin' เป็นรหัสผ่าน default (ตามโค้ดเดิม)
    if (adminPassword !== 'admin') {
        return res.status(401).json({ "error": "รหัสผ่าน Admin ไม่ถูกต้อง" });
    }

    const client = await db.connect();
    try {
        await client.query('BEGIN');
        await client.query("DELETE FROM employees");
        await client.query("DELETE FROM votes");
        await client.query("UPDATE candidates SET votes = 0");
        await client.query('COMMIT');
        
        res.status(200).json({ "message": "ลบข้อมูลพนักงาน, ข้อมูลการโหวต, และรีเซ็ตคะแนนทั้งหมดสำเร็จ" });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ "error": "เกิดข้อผิดพลาด: " + err.message });
    } finally {
        client.release();
    }
});

// DELETE /employees/:id
app.delete('/employees/:id', async (req, res) => {
    const sql = "DELETE FROM employees WHERE id = $1";
    try {
        const result = await db.query(sql, [req.params.id]);
        if (result.rowCount === 0) { 
            return res.status(404).json({ "error": "ไม่พบข้อมูลพนักงานที่ต้องการลบ" }); 
        }
        res.status(200).json({ "message": "ลบข้อมูลสำเร็จ" });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// --- Prize Endpoints ---

// GET /draw
app.get('/draw', async (req, res) => {
    try {
        const prizeRes = await db.query("SELECT COUNT(*) as count FROM prizes");
        const numberOfWinners = parseInt(prizeRes.rows[0].count);

        if (numberOfWinners === 0) {
            return res.status(400).json({ "error": "กรุณาเพิ่มรางวัลในหน้า 'จัดการรางวัล' ก่อน" });
        }

        // PostgreSQL: boolean = TRUE
        const sql = `
            SELECT id, first_name, last_name, employee_id, department 
            FROM employees 
            WHERE checked_in = TRUE AND sport_day_registered = TRUE AND registration_time IS NOT NULL
        `;
        const empRes = await db.query(sql);
        const rows = empRes.rows;

        if (rows.length === 0) {
            return res.status(400).json({ "error": "ยังไม่มีผู้มีสิทธิ์ครบทั้ง 3 เงื่อนไข" });
        }
        if (rows.length < numberOfWinners) {
            return res.status(400).json({ "error": `มีผู้มีสิทธิ์ครบ (${rows.length} คน) น้อยกว่าจำนวนรางวัล (${numberOfWinners} รางวัล)` });
        }

        // Shuffle (Fisher-Yates) - JS Logic
        for (let i = rows.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rows[i], rows[j]] = [rows[j], rows[i]];
        }

        const winners = rows.slice(0, numberOfWinners);
        res.status(200).json({ "message": "success", "data": winners });

    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// GET /prizes
app.get('/prizes', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM prizes ORDER BY id ASC");
        res.status(200).json({ data: result.rows });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// POST /prizes
app.post('/prizes', async (req, res) => {
    const { name } = req.body;
    if (!name) { return res.status(400).json({ "error": "กรุณากรอกชื่อรางวัล" }); }
    
    try {
        // PostgreSQL: RETURNING id
        const sql = "INSERT INTO prizes (name) VALUES ($1) RETURNING id";
        const result = await db.query(sql, [name]);
        res.status(201).json({ "message": "เพิ่มรางวัลสำเร็จ", "id": result.rows[0].id });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// PUT /prizes/:id
app.put('/prizes/:id', async (req, res) => {
    const { name } = req.body;
    if (!name) { return res.status(400).json({ "error": "กรุณากรอกชื่อรางวัล" }); }

    try {
        const sql = "UPDATE prizes SET name = $1 WHERE id = $2";
        const result = await db.query(sql, [name, req.params.id]);
        if (result.rowCount === 0) { return res.status(404).json({ "error": "ไม่พบรางวัลที่ต้องการแก้ไข" }); }
        res.status(200).json({ "message": "แก้ไขรางวัลสำเร็จ" });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// DELETE /prizes/:id
app.delete('/prizes/:id', async (req, res) => {
    try {
        const result = await db.query("DELETE FROM prizes WHERE id = $1", [req.params.id]);
        if (result.rowCount === 0) { return res.status(404).json({ "error": "ไม่พบรางวัลที่ต้องการลบ" }); }
        res.status(200).json({ "message": "ลบรางวัลสำเร็จ" });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// POST /prizes/reset
app.post('/prizes/reset', async (req, res) => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        await client.query("DELETE FROM prizes");
        
        const defaultPrizes = [
            "รางวัลที่ 5: บัตรกำนัล 2,000 บาท",
            "รางวัลที่ 4: พัดลมไอน้ำ",
            "รางวัลที่ 3: Smart TV 55 นิ้ว",
            "รางวัลที่ 2: ทองคำ 1 บาท",
            "รางวัลที่ 1: iPhone 16"
        ];
        
        for (const p of defaultPrizes) {
            await client.query("INSERT INTO prizes (name) VALUES ($1)", [p]);
        }

        await client.query('COMMIT');
        res.status(200).json({ "message": "รีเซ็ตรายการรางวัลเป็นค่าเริ่มต้นสำเร็จ" });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ "error": "Failed to repopulate prizes: " + err.message });
    } finally {
        client.release();
    }
});

// --- Vote Endpoints ---

// GET /vote-status
app.get('/vote-status', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM vote_status WHERE id = 1");
        const row = result.rows[0];
        
        const now = new Date();
        // เช็ค Deadline
        if (row.is_open && row.deadline && new Date(row.deadline) < now) {
            await db.query("UPDATE vote_status SET is_open = FALSE WHERE id = 1");
            return res.status(200).json({ is_open: false, deadline: row.deadline });
        }
        
        res.status(200).json({ is_open: !!row.is_open, deadline: row.deadline });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// POST /vote/start
app.post('/vote/start', async (req, res) => {
    const { durationInMinutes } = req.body;
    if (!durationInMinutes || durationInMinutes <= 0) {
        return res.status(400).json({ "error": "กรุณากำหนดระยะเวลาให้ถูกต้อง" });
    }

    const now = new Date();
    const deadline = new Date(now.getTime() + durationInMinutes * 60000);
    const deadlineISO = deadline.toISOString();

    try {
        const sql = "UPDATE vote_status SET is_open = TRUE, deadline = $1 WHERE id = 1";
        await db.query(sql, [deadlineISO]);
        res.status(201).json({ "message": "เปิดระบบโหวตสำเร็จ!", "deadline": deadlineISO });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// POST /vote/close
app.post('/vote/close', async (req, res) => {
    try {
        await db.query("UPDATE vote_status SET is_open = FALSE, deadline = NULL WHERE id = 1");
        res.status(200).json({ "message": "ปิดระบบโหวตสำเร็จ" });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// GET /candidates (Also used for results)
app.get('/candidates', async (req, res) => {
    try {
        const result = await db.query("SELECT id, name, department, votes FROM candidates ORDER BY votes DESC");
        res.status(200).json({ data: result.rows });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// POST /vote
app.post('/vote', async (req, res) => {
    const { employeeId, candidateId } = req.body;
    if (!employeeId || !candidateId) { return res.status(400).json({ "error": "ข้อมูลไม่ครบถ้วน" }); }
    
    const employeeIdUpper = employeeId.toUpperCase();
    const client = await db.connect();

    try {
        // 1. Check Vote Status
        const statusRes = await client.query("SELECT * FROM vote_status WHERE id = 1");
        const statusRow = statusRes.rows[0];
        const now = new Date();

        if (!statusRow.is_open) {
            return res.status(403).json({ "error": "ระบบปิดอยู่" });
        }
        if (statusRow.deadline && new Date(statusRow.deadline) < now) {
            await client.query("UPDATE vote_status SET is_open = FALSE WHERE id = 1");
            return res.status(403).json({ "error": "หมดเวลาโหวตแล้ว" });
        }

        await client.query('BEGIN');

        // 2. Check Employee Eligibility
        const empRes = await client.query("SELECT checked_in FROM employees WHERE employee_id = $1", [employeeIdUpper]);
        const empRow = empRes.rows[0];
        
        if (!empRow) { 
            await client.query('ROLLBACK');
            return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้" }); 
        }
        if (!empRow.checked_in) { 
            await client.query('ROLLBACK');
            return res.status(403).json({ "error": "พนักงานยังไม่ได้เช็คอิน" }); 
        }

        // 3. Insert Vote (Postgres will throw error on Unique Constraint if exists)
        const voteSql = "INSERT INTO votes (employee_id) VALUES ($1)";
        await client.query(voteSql, [employeeIdUpper]);

        // 4. Update Score
        await client.query("UPDATE candidates SET votes = votes + 1 WHERE id = $1", [candidateId]);

        await client.query('COMMIT');
        res.status(200).json({ "message": "โหวตสำเร็จ!" });

    } catch (err) {
        await client.query('ROLLBACK');
        // Postgres Error Code 23505 = Unique Violation
        if (err.code === '23505') {
            return res.status(409).json({ "error": "คุณได้ทำการโหวตไปแล้ว" });
        }
        res.status(500).json({ "error": "Error voting: " + err.message });
    } finally {
        client.release();
    }
});

// GET /results (Same as candidates)
app.get('/results', async (req, res) => {
    try {
        const result = await db.query("SELECT name, department, votes FROM candidates ORDER BY votes DESC");
        res.status(200).json({ data: result.rows });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// POST /candidates
app.post('/candidates', async (req, res) => {
    const { name, department } = req.body;
    if (!name || !department) { return res.status(400).json({ "error": "กรุณากรอกข้อมูล" }); }
    
    try {
        const sql = "INSERT INTO candidates (name, department) VALUES ($1, $2) RETURNING id";
        const result = await db.query(sql, [name, department]);
        res.status(201).json({ "message": "เพิ่มผู้เข้าประกวดสำเร็จ", "id": result.rows[0].id });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// PUT /candidates/:id
app.put('/candidates/:id', async (req, res) => {
    const { name, department } = req.body;
    if (!name || !department) { return res.status(400).json({ "error": "กรุณากรอกข้อมูล" }); }

    try {
        const sql = "UPDATE candidates SET name = $1, department = $2 WHERE id = $3";
        const result = await db.query(sql, [name, department, req.params.id]);
        if (result.rowCount === 0) { return res.status(404).json({ "error": "ไม่พบผู้เข้าประกวด" }); }
        res.status(200).json({ "message": "แก้ไขสำเร็จ" });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// DELETE /candidates/:id
app.delete('/candidates/:id', async (req, res) => {
    try {
        const result = await db.query("DELETE FROM candidates WHERE id = $1", [req.params.id]);
        if (result.rowCount === 0) { return res.status(404).json({ "error": "ไม่พบผู้เข้าประกวด" }); }
        res.status(200).json({ "message": "ลบสำเร็จ" });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

// POST /candidates/reset
app.post('/candidates/reset', async (req, res) => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        await client.query("DELETE FROM candidates");
        await client.query("DELETE FROM votes");

        await client.query("INSERT INTO candidates (name, department) VALUES ($1, $2), ($3, $4), ($5, $6)", 
            ["สมชาย ใจดี", "ฝ่ายขาย", "สมศรี มีสุข", "ฝ่ายการตลาด", "พรเทพ มุ่งมั่น", "ฝ่ายบุคคล"]);

        await client.query('COMMIT');
        res.status(200).json({ "message": "รีเซ็ตผู้เข้าประกวดและเคลียร์ผลโหวตสำเร็จ" });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ "error": "Failed to reset candidates: " + err.message });
    } finally {
        client.release();
    }
});

// GET /check-vote-eligibility/:employeeId
app.get('/check-vote-eligibility/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId.toUpperCase();
    
    try {
        // 1. Check Vote Status
        const statusRes = await db.query("SELECT * FROM vote_status WHERE id = 1");
        const statusRow = statusRes.rows[0];
        const now = new Date();

        if (!statusRow.is_open) {
            return res.status(403).json({ status: 'vote_closed', message: "ระบบปิดโหวตแล้ว" });
        }
        if (statusRow.deadline && new Date(statusRow.deadline) < now) {
            await db.query("UPDATE vote_status SET is_open = FALSE WHERE id = 1");
            return res.status(403).json({ status: 'vote_closed', message: "หมดเวลาโหวตแล้ว" });
        }

        // 2. Check Employee Exists & Checked In
        const empRes = await db.query("SELECT checked_in FROM employees WHERE employee_id = $1", [employeeId]);
        const empRow = empRes.rows[0];

        if (!empRow) {
            return res.status(404).json({ status: 'not_found', message: "ไม่พบรหัสพนักงาน" });
        }
        if (!empRow.checked_in) {
            return res.status(403).json({ status: 'not_checked_in', message: "ยังไม่ได้เช็คอิน" });
        }

        // 3. Check Already Voted
        const voteRes = await db.query("SELECT * FROM votes WHERE employee_id = $1", [employeeId]);
        if (voteRes.rows.length > 0) {
            return res.status(409).json({ status: 'already_voted', message: "คุณได้ทำการโหวตไปแล้ว" });
        }

        res.status(200).json({ 
            status: 'eligible', 
            message: `คุณมีสิทธิ์โหวต (ปิดโหวต ${new Date(statusRow.deadline).toLocaleTimeString('th-TH')})`,
            deadline: statusRow.deadline
        });

    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});