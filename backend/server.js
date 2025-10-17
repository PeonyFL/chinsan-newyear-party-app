const express = require('express');
const cors = require('cors');
const db = require('./database.js');
const qrcode = require('qrcode');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- Register Endpoint (Existing) ---
app.post('/register', async (req, res) => {
    // ... existing code ...
    const { firstName, lastName, employeeId } = req.body;
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

// --- Find Endpoint (Existing) ---
app.get('/find/:employeeId', (req, res) => {
    // ... existing code ...
    const { employeeId } = req.params;
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

// --- Get All Employees Endpoint (New) ---
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


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});