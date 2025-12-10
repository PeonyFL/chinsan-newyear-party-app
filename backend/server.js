const express = require('express');
const cors = require('cors');
const db = require('./database.js');
const qrcode = require('qrcode');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){ fs.mkdirSync(uploadDir); }
const upload = multer({ dest: uploadDir + '/' });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function safeUnlink(filePath) {
    try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (e) { console.error(e); }
}
function handleUploadErrors(err, req, res, next) {
    if (err) return res.status(500).json({ "error": err.message });
    next();
}

// --- Employee Endpoints ---

app.post('/upload-employees', upload.single('employeeFile'), handleUploadErrors, async (req, res) => {
    if (!req.file) return res.status(400).json({ "error": "ไม่พบไฟล์" });
    const filePath = req.file.path;
    const client = await db.connect();

    try {
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        await client.query('BEGIN');
        const sql = `INSERT INTO employees (first_name, last_name, department, employee_id) VALUES ($1, $2, $3, $4) ON CONFLICT (employee_id) DO NOTHING`;
        
        let count = 0;
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (row && row[0] && row[3]) {
                await client.query(sql, [row[0], row[1], row[2], String(row[3]).toUpperCase()]);
                count++;
            }
        }
        await client.query('COMMIT');
        res.status(200).json({ "message": `ประมวลผลสำเร็จ ${count} รายการ` });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ "error": err.message });
    } finally {
        client.release();
        safeUnlink(filePath);
    }
});

// --- ไฟล์ server.js ---

app.post('/add-employee', async (req, res) => {
    // รับค่า isAdmin มาด้วย
    const { firstName, lastName, department, employeeId, isAdmin } = req.body;
    const eid = String(employeeId).toUpperCase();
    
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        // 1. เช็คว่ามีรหัสนี้ในระบบไหม
        const checkRes = await client.query("SELECT * FROM employees WHERE employee_id = $1", [eid]);
        const existingUser = checkRes.rows[0];

        if (existingUser) {
            // --- กรณีมีชื่อในระบบแล้ว ---
            
            if (existingUser.registration_time) {
                // ถ้าลงทะเบียนไปแล้ว -> แจ้งเตือน
                await client.query('ROLLBACK');
                return res.status(409).json({ "error": "รหัสพนักงานนี้ ลงทะเบียนเรียบร้อยแล้ว" });
            } 
            
            // ถ้ายังไม่ลงทะเบียน (มีแต่ชื่อจาก Excel) -> อัปเดตข้อมูลและเวลาลงทะเบียน
            await client.query(
                "UPDATE employees SET first_name=$1, last_name=$2, department=$3, registration_time=NOW() WHERE employee_id=$4",
                [firstName, lastName, department, eid]
            );

        } else {
            // --- กรณีไม่มีชื่อในระบบ (รหัสใหม่) ---

            if (isAdmin) {
                // ✅ ถ้าเป็น Admin: อนุญาตให้เพิ่มพนักงานใหม่ได้
                await client.query(
                    "INSERT INTO employees (first_name, last_name, department, employee_id, registration_time) VALUES ($1, $2, $3, $4, NOW())",
                    [firstName, lastName, department, eid]
                );
            } else {
                // ❌ ถ้าเป็น User ทั่วไป: ห้ามเพิ่มเอง ต้องมีใน Excel ก่อน
                await client.query('ROLLBACK');
                return res.status(404).json({ "error": "ไม่พบข้อมูลในระบบ (กรุณาติดต่อ Admin เพื่อเพิ่มรายชื่อ)" });
            }
        }

        // สร้าง QR Code ส่งกลับไป (ทั้งกรณี Update และ Insert ของ Admin)
        const qr = await qrcode.toDataURL(eid, { width: 350, margin: 1 });
        await client.query('COMMIT');

        res.status(200).json({ 
            "message": "ลงทะเบียนสำเร็จ", 
            "data": { qrCode: qr, employeeId: eid } 
        });

    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ "error": err.message });
    } finally {
        client.release();
    }
});

// ส่วน Find QR คงเดิมไว้ (ตามที่คุยกันรอบที่แล้ว)
app.get('/find/:employeeId', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM employees WHERE employee_id = $1", [req.params.employeeId.toUpperCase()]);
        const row = result.rows[0];
        
        if (row && row.registration_time) {
            const qr = await qrcode.toDataURL(row.employee_id, { width: 350, margin: 1 });
            res.status(200).json({ "message": "พบข้อมูล QR Code", "data": { ...row, "qrCode": qr } });
        } else {
            res.status(404).json({ "error": "ไม่พบข้อมูล (หรือยังไม่ได้ลงทะเบียน)" });
        }
    } catch (err) { res.status(500).json({ "error": err.message }); }
});

app.get('/employees', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM employees ORDER BY registration_time DESC");
        res.status(200).json({ "data": result.rows });
    } catch (err) { res.status(500).json({ "error": err.message }); }
});

app.get('/employees/status-summary', async (req, res) => {
    try {
        const r1 = await db.query("SELECT COUNT(*) FROM employees");
        const r2 = await db.query("SELECT COUNT(*) FROM employees WHERE registration_time IS NOT NULL");
        const r3 = await db.query("SELECT COUNT(*) FROM employees WHERE sport_day_registered = TRUE");
        const r4 = await db.query("SELECT COUNT(*) FROM employees WHERE checked_in = TRUE");
        const r5 = await db.query("SELECT COUNT(*) FROM employees WHERE registration_time IS NOT NULL AND sport_day_registered = TRUE AND checked_in = TRUE");
        
        res.status(200).json({ data: {
            total: parseInt(r1.rows[0].count),
            new_year: parseInt(r2.rows[0].count),
            sport_day: parseInt(r3.rows[0].count),
            checked_in: parseInt(r4.rows[0].count),
            all_three: parseInt(r5.rows[0].count)
        }});
    } catch (err) { res.status(500).json({ "error": err.message }); }
});

app.post('/checkin', async (req, res) => {
    const eid = req.body.employeeId?.toUpperCase();
    if(!eid) return res.status(400).json({error: "No ID"});
    try {
        const result = await db.query("SELECT * FROM employees WHERE employee_id = $1", [eid]);
        if (!result.rows[0]) return res.status(404).json({ "error": "ไม่พบพนักงาน" });
        if (result.rows[0].checked_in) return res.status(409).json({ "error": "เช็คอินไปแล้ว", "data": result.rows[0] });

        await db.query("UPDATE employees SET checked_in = TRUE, checkin_time = NOW() WHERE employee_id = $1", [eid]);
        res.status(200).json({ "message": "เช็คอินสำเร็จ", "data": result.rows[0] });
    } catch (err) { res.status(500).json({ "error": err.message }); }
});

app.post('/sportday-register', async (req, res) => {
    const eid = req.body.employeeId?.toUpperCase();
    if(!eid) return res.status(400).json({error: "No ID"});
    try {
        const result = await db.query("SELECT * FROM employees WHERE employee_id = $1", [eid]);
        if (!result.rows[0]) return res.status(404).json({ "error": "ไม่พบพนักงาน" });
        if (result.rows[0].sport_day_registered) return res.status(409).json({ "error": "ลงทะเบียนแล้ว", "data": result.rows[0] });

        await db.query("UPDATE employees SET sport_day_registered = TRUE, sport_day_reg_time = NOW() WHERE employee_id = $1", [eid]);
        res.status(200).json({ "message": "ลงทะเบียนสำเร็จ", "data": result.rows[0] });
    } catch (err) { res.status(500).json({ "error": err.message }); }
});

app.delete('/employees/all', async (req, res) => {
    if (req.body.adminPassword !== 'admin') return res.status(401).json({ "error": "รหัสผิด" });
    try {
        await db.query("TRUNCATE employees, votes RESTART IDENTITY"); 
        res.status(200).json({ "message": "ล้างข้อมูลสำเร็จ" });
    } catch (err) { res.status(500).json({ "error": err.message }); }
});

app.delete('/employees/:id', async (req, res) => {
    try {
        await db.query("DELETE FROM employees WHERE id = $1", [req.params.id]);
        res.status(200).json({ "message": "ลบสำเร็จ" });
    } catch (err) { res.status(500).json({ "error": err.message }); }
});

// --- Prize Endpoints ---
app.get('/draw', async (req, res) => {
    try {
        const pRes = await db.query("SELECT COUNT(*) FROM prizes");
        const winnersNeeded = parseInt(pRes.rows[0].count);
        if (winnersNeeded === 0) return res.status(400).json({ "error": "ไม่มีของรางวัล" });

        const sql = `SELECT id, first_name, last_name, employee_id, department FROM employees WHERE checked_in = TRUE AND sport_day_registered = TRUE AND registration_time IS NOT NULL`;
        const { rows } = await db.query(sql);
        
        if (rows.length < winnersNeeded) return res.status(400).json({ "error": "ผู้มีสิทธิ์น้อยกว่าจำนวนรางวัล" });

        for (let i = rows.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rows[i], rows[j]] = [rows[j], rows[i]];
        }
        res.status(200).json({ "message": "success", "data": rows.slice(0, winnersNeeded) });
    } catch (err) { res.status(500).json({ "error": err.message }); }
});

app.get('/prizes', async (req, res) => {
    const resDb = await db.query("SELECT * FROM prizes ORDER BY id ASC");
    res.json({ data: resDb.rows });
});
app.post('/prizes', async (req, res) => {
    await db.query("INSERT INTO prizes (name) VALUES ($1)", [req.body.name]);
    res.status(201).json({ message: "เพิ่มรางวัลแล้ว" });
});
app.put('/prizes/:id', async (req, res) => {
    await db.query("UPDATE prizes SET name = $1 WHERE id = $2", [req.body.name, req.params.id]);
    res.json({ message: "แก้ไขแล้ว" });
});
app.delete('/prizes/:id', async (req, res) => {
    await db.query("DELETE FROM prizes WHERE id = $1", [req.params.id]);
    res.json({ message: "ลบแล้ว" });
});
app.post('/prizes/reset', async (req, res) => {
    await db.query("TRUNCATE prizes RESTART IDENTITY");
    const prizes = ["รางวัลที่ 5", "รางวัลที่ 4", "รางวัลที่ 3", "รางวัลที่ 2", "รางวัลที่ 1"];
    for (const p of prizes) await db.query("INSERT INTO prizes (name) VALUES ($1)", [p]);
    res.json({ message: "รีเซ็ตรางวัลแล้ว" });
});

// --- Vote Endpoints (FIXED for Burst Load) ---

app.get('/vote-status', async (req, res) => {
    const result = await db.query("SELECT * FROM vote_status WHERE id = 1");
    res.json(result.rows[0]);
});

app.post('/vote/start', async (req, res) => {
    const deadline = new Date(Date.now() + req.body.durationInMinutes * 60000).toISOString();
    await db.query("UPDATE vote_status SET is_open = TRUE, deadline = $1 WHERE id = 1", [deadline]);
    res.status(201).json({ message: "เปิดโหวตแล้ว" });
});

app.post('/vote/close', async (req, res) => {
    await db.query("UPDATE vote_status SET is_open = FALSE WHERE id = 1");
    res.json({ message: "ปิดโหวตแล้ว" });
});

// --- FIXED: ใช้ COUNT(*) แทนการอ่านค่า votes ที่ตายตัว ---
app.get('/candidates', async (req, res) => {
    const sql = `
        SELECT c.id, c.name, c.department, COUNT(v.employee_id)::int as votes 
        FROM candidates c 
        LEFT JOIN votes v ON c.id = v.candidate_id 
        GROUP BY c.id 
        ORDER BY votes DESC, c.name ASC
    `;
    const result = await db.query(sql);
    res.json({ data: result.rows });
});

app.get('/results', async (req, res) => {
    const sql = `
        SELECT c.name, c.department, COUNT(v.employee_id)::int as votes 
        FROM candidates c 
        LEFT JOIN votes v ON c.id = v.candidate_id 
        GROUP BY c.id 
        ORDER BY votes DESC
    `;
    const result = await db.query(sql);
    res.json({ data: result.rows });
});

// --- FIXED: เอา UPDATE candidates ออก เพื่อลด Lock ---
app.post('/vote', async (req, res) => {
    const { employeeId, candidateId } = req.body;
    const eid = employeeId.toUpperCase();
    const client = await db.connect();

    try {
        const statusRes = await db.query("SELECT is_open, deadline FROM vote_status WHERE id = 1");
        if (!statusRes.rows[0].is_open) return res.status(403).json({ "error": "ปิดโหวตแล้ว" });
        if (statusRes.rows[0].deadline && new Date(statusRes.rows[0].deadline) < new Date()) {
             return res.status(403).json({ "error": "หมดเวลา" });
        }

        await client.query('BEGIN');
        
        const empRes = await client.query("SELECT checked_in FROM employees WHERE employee_id = $1", [eid]);
        if (!empRes.rows[0] || !empRes.rows[0].checked_in) {
            await client.query('ROLLBACK');
            return res.status(403).json({ "error": "ไม่มีสิทธิ์ หรือยังไม่เช็คอิน" });
        }

        // 3. Insert Vote (Fast Insert) - ตัด UPDATE candidate ทิ้ง
        await client.query("INSERT INTO votes (employee_id, candidate_id) VALUES ($1, $2)", [eid, candidateId]);
        
        await client.query('COMMIT');
        res.status(200).json({ "message": "โหวตสำเร็จ" });

    } catch (err) {
        await client.query('ROLLBACK');
        if (err.code === '23505') return res.status(409).json({ "error": "โหวตไปแล้ว" });
        res.status(500).json({ "error": err.message });
    } finally {
        client.release();
    }
});

app.post('/candidates', async (req, res) => {
    await db.query("INSERT INTO candidates (name, department) VALUES ($1, $2)", [req.body.name, req.body.department]);
    res.status(201).json({ message: "เพิ่มแล้ว" });
});
app.put('/candidates/:id', async (req, res) => {
    await db.query("UPDATE candidates SET name = $1, department = $2 WHERE id = $3", [req.body.name, req.body.department, req.params.id]);
    res.json({ message: "แก้ไขแล้ว" });
});
app.delete('/candidates/:id', async (req, res) => {
    await db.query("DELETE FROM votes WHERE candidate_id = $1", [req.params.id]);
    await db.query("DELETE FROM candidates WHERE id = $1", [req.params.id]);
    res.json({ message: "ลบแล้ว" });
});
app.post('/candidates/reset', async (req, res) => {
    await db.query("TRUNCATE votes, candidates RESTART IDENTITY");
    res.json({ message: "รีเซ็ตแล้ว" });
});

app.get('/check-vote-eligibility/:employeeId', async (req, res) => {
    const eid = req.params.employeeId.toUpperCase();
    try {
        const s = await db.query("SELECT * FROM vote_status");
        if(!s.rows[0].is_open) return res.status(403).json({status: 'vote_closed', message: "ปิด"});
        
        const e = await db.query("SELECT checked_in FROM employees WHERE employee_id = $1", [eid]);
        if(!e.rows[0]) return res.status(404).json({status: 'not_found', message: "ไม่พบ"});
        if(!e.rows[0].checked_in) return res.status(403).json({status: 'not_checked_in', message: "ยังไม่เช็คอิน"});

        const v = await db.query("SELECT 1 FROM votes WHERE employee_id = $1", [eid]);
        if(v.rows.length > 0) return res.status(409).json({status: 'already_voted', message: "โหวตแล้ว"});

        res.status(200).json({ status: 'eligible', message: "มีสิทธิ์", deadline: s.rows[0].deadline });
    } catch(err) { res.status(500).json({status:'error', message: err.message}); }
});

app.get('/health', (req, res) => res.send('OK'));
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));