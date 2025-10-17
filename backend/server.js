const express = require('express');
const cors = require('cors');
const db = require('./database.js');
const qrcode = require('qrcode');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- Endpoint สำหรับการลงทะเบียน ---
app.post('/register', async (req, res) => {
    const { firstName, lastName } = req.body;
    // แปลงรหัสพนักงานเป็นตัวพิมพ์ใหญ่เสมอ
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
            const options = { width: 350, margin: 1 };
            const qrCodeDataUrl = await qrcode.toDataURL(employeeId, options);
            res.status(201).json({
                "message": "ลงทะเบียนสำเร็จ!",
                "data": { "id": this.lastID, "firstName": firstName, "lastName": lastName, "employeeId": employeeId, "qrCode": qrCodeDataUrl }
            });
        } catch (qrErr) {
            console.error('QR Code generation failed:', qrErr);
            return res.status(500).json({ "error": "ไม่สามารถสร้าง QR Code ได้" });
        }
    });
});

// --- Endpoint สำหรับค้นหา QR Code ---
app.get('/find/:employeeId', (req, res) => {
    // แปลงรหัสพนักงานที่ใช้ค้นหาเป็นตัวพิมพ์ใหญ่
    const employeeId = req.params.employeeId.toUpperCase();
    const sql = "SELECT * FROM employees WHERE employee_id = ?";

    db.get(sql, [employeeId], async (err, row) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        if (row) {
            try {
                const options = { width: 350, margin: 1 };
                const qrCodeDataUrl = await qrcode.toDataURL(row.employee_id, options);
                res.status(200).json({
                    "message": "พบข้อมูลของคุณแล้ว",
                    "data": { "id": row.id, "firstName": row.first_name, "lastName": row.last_name, "employeeId": row.employee_id, "qrCode": qrCodeDataUrl }
                });
            } catch (qrErr) {
                console.error('QR Code generation failed:', qrErr);
                return res.status(500).json({ "error": "ไม่สามารถสร้าง QR Code ได้" });
            }
        } else {
            return res.status(404).json({ "error": "ไม่พบรหัสพนักงานนี้ในระบบ" });
        }
    });
});

// --- Endpoint สำหรับดูรายชื่อทั้งหมด ---
app.get('/employees', (req, res) => {
    const sql = "SELECT id, first_name, last_name, employee_id, registration_time FROM employees ORDER BY registration_time DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.status(200).json({
            "message": "success",
            "data": rows
        });
    });
});


// --- Admin Endpoints ---
const SECRET_KEY = "YourSuperSecretPassword12345"; // !!! เปลี่ยนเป็นรหัสผ่านของคุณเองที่เดายากๆ !!!

app.get('/admin/view-all', (req, res) => {
    if (req.query.key !== SECRET_KEY) {
        return res.status(401).json({ "error": "Unauthorized" });
    }
    const sql = "SELECT * FROM employees ORDER BY registration_time DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.status(200).json(rows);
    });
});

app.get('/admin/delete/:id', (req, res) => {
    if (req.query.key !== SECRET_KEY) {
        return res.status(401).json({ "error": "Unauthorized" });
    }
    const sql = "DELETE FROM employees WHERE id = ?";
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.status(200).json({ "message": "Success", "deletedRows": this.changes });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});