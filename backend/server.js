const express = require('express');
const cors = require('cors');
const db = require('./database.js');
const qrcode = require('qrcode');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- Endpoint สำหรับการลงทะเบียน ---
app.post('/register', (req, res) => {
    const { firstName, lastName } = req.body;
    const employeeId = req.body.employeeId.toUpperCase();

    if (!firstName || !lastName || !employeeId) {
        return res.status(400).json({ "error": "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
    }
    const sql = 'INSERT INTO employees (first_name, last_name, employee_id) VALUES (?,?,?)';
    const params = [firstName, lastName, employeeId];
    db.run(sql, params, async function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ "error": "รหัสพนักงานนี้ถูกลงทะเบียนแล้ว" });
            }
            return res.status(500).json({ "error": err.message });
        }
        try {
            const qrCodeDataUrl = await qrcode.toDataURL(employeeId, { width: 350, margin: 1 });
            res.status(201).json({
                "message": "ลงทะเบียนสำเร็จ!",
                "data": { "id": this.lastID, "firstName": firstName, "lastName": lastName, "employeeId": employeeId, "qrCode": qrCodeDataUrl }
            });
        } catch (qrErr) {
            return res.status(500).json({ "error": "ไม่สามารถสร้าง QR Code ได้" });
        }
    });
});

// --- Endpoint สำหรับค้นหา/ตรวจสอบ ---
app.get('/find/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId.toUpperCase();
    const sql = "SELECT * FROM employees WHERE employee_id = ?";
    db.get(sql, [employeeId], (err, row) => {
        if (err) { return res.status(500).json({ "error": err.message }); }
        if (row) {
            res.status(200).json({
                "message": "พบข้อมูลของคุณแล้ว",
                "data": { 
                    "firstName": row.first_name, 
                    "lastName": row.last_name, 
                    "employeeId": row.employee_id
                }
            });
        } else {
            return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้ในระบบ" });
        }
    });
});

// --- Endpoint สำหรับดูรายชื่อทั้งหมด ---
app.get('/employees', (req, res) => {
    const sql = "SELECT id, first_name, last_name, employee_id, registration_time, checked_in, checkin_time FROM employees ORDER BY registration_time DESC";
    db.all(sql, [], (err, rows) => {
        if (err) { res.status(500).json({ "error": err.message }); return; }
        res.status(200).json({ "message": "success", "data": rows });
    });
});

// --- Endpoint สำหรับสุ่มรางวัล ---
app.get('/draw', (req, res) => {
    const sql = "SELECT id, first_name, last_name, employee_id FROM employees where checked_in = 1";
    const numberOfWinners = 5;
    db.all(sql, [], (err, rows) => {
        if (err) { return res.status(500).json({ "error": err.message }); }
        if (rows.length < numberOfWinners) {
            return res.status(400).json({ "error": `มีผู้ลงทะเบียนน้อยกว่า ${numberOfWinners} คน` });
        }
        for (let i = rows.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rows[i], rows[j]] = [rows[j], rows[i]];
        }
        const winners = rows.slice(0, numberOfWinners);
        res.status(200).json({ "message": "success", "data": winners });
    });
});

// --- Endpoint สำหรับ Check-in ---
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
                "data": {
                    "firstName": row.first_name, "lastName": row.last_name,
                    "employeeId": row.employee_id, "checkin_time": row.checkin_time
                }
            });
        }
        const updateSql = `UPDATE employees SET checked_in = 1, checkin_time = CURRENT_TIMESTAMP WHERE employee_id = ?`;
        db.run(updateSql, [employeeIdUpper], function(err) {
            if (err) { return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการบันทึกข้อมูลเช็คอิน" }); }
            res.status(200).json({
                "message": "เช็คอินสำเร็จ!",
                "data": { "firstName": row.first_name, "lastName": row.last_name, "employeeId": row.employee_id }
            });
        });
    });
});

// --- Endpoints สำหรับการโหวต ---
app.get('/candidates', (req, res) => {
    const sql = "SELECT id, name, department FROM candidates";
    db.all(sql, [], (err, rows) => {
        if (err) { return res.status(500).json({ "error": err.message }); }
        res.status(200).json({ data: rows });
    });
});

app.post('/vote', (req, res) => {
    const { employeeId, candidateId } = req.body;
    if (!employeeId || !candidateId) { return res.status(400).json({ "error": "ข้อมูลไม่ครบถ้วน" }); }
    const employeeIdUpper = employeeId.toUpperCase();

    db.get("SELECT * FROM employees WHERE employee_id = ?", [employeeIdUpper], (err, row) => {
        if (!row) { return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้ในระบบลงทะเบียน" }); }
        db.get("SELECT * FROM votes WHERE employee_id = ?", [employeeIdUpper], (err, voteRow) => {
            if (voteRow) { return res.status(409).json({ "error": "คุณได้ทำการโหวตไปแล้ว" }); }
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');
                db.run("INSERT INTO votes (employee_id) VALUES (?)", [employeeIdUpper]);
                db.run("UPDATE candidates SET votes = votes + 1 WHERE id = ?", [candidateId]);
                db.run('COMMIT', (err) => {
                    if (err) {
                        db.run('ROLLBACK');
                        return res.status(500).json({ "error": "เกิดข้อผิดพลาดในการบันทึกผลโหวต" });
                    }
                    res.status(200).json({ "message": "โหวตสำเร็จ!" });
                });
            });
        });
    });
});

app.get('/results', (req, res) => {
    const sql = "SELECT name, department, votes FROM candidates ORDER BY votes DESC";
    db.all(sql, [], (err, rows) => {
        if (err) { return res.status(500).json({ "error": err.message }); }
        res.status(200).json({ data: rows });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});