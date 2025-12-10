const { pool } = require('../config/db');
const qrcode = require('qrcode');
const xlsx = require('xlsx');
const fs = require('fs');

const safeUnlink = (filePath) => {
    try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (e) { console.error(e); }
};

exports.uploadEmployees = async (req, res) => {
    if (!req.file) return res.status(400).json({ "error": "ไม่พบไฟล์" });
    const filePath = req.file.path;
    const client = await pool.connect();

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
};

exports.addEmployee = async (req, res) => {
    const { employeeId, isAdmin, firstName, lastName, department } = req.body;
    const eid = String(employeeId).toUpperCase();

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const checkRes = await client.query("SELECT * FROM employees WHERE employee_id = $1", [eid]);
        const existingUser = checkRes.rows[0];

        if (existingUser) {
            if (!isAdmin) {
                if (!existingUser.registration_time) {
                    await client.query("UPDATE employees SET registration_time=NOW() WHERE employee_id=$1", [eid]);
                }
            } else {
                if (firstName && lastName) {
                    await client.query(
                        "UPDATE employees SET first_name=$1, last_name=$2, department=$3 WHERE employee_id=$4",
                        [firstName, lastName, department, eid]
                    );
                }
            }
        } else {
            if (isAdmin) {
                await client.query(
                    "INSERT INTO employees (first_name, last_name, department, employee_id, registration_time) VALUES ($1, $2, $3, $4, NOW())",
                    [firstName, lastName, department, eid]
                );
            } else {
                await client.query('ROLLBACK');
                return res.status(404).json({ "error": "ไม่พบข้อมูลในระบบ (กรุณาติดต่อ Admin เพื่อเพิ่มรายชื่อ)" });
            }
        }

        const qr = await qrcode.toDataURL(eid, { width: 350, margin: 1 });
        await client.query('COMMIT');

        const finalRes = await client.query("SELECT * FROM employees WHERE employee_id = $1", [eid]);
        const userData = finalRes.rows[0];

        res.status(200).json({
            "message": "ลงทะเบียน/เข้าสู่ระบบ สำเร็จ",
            "data": { qrCode: qr, employeeId: eid, ...userData }
        });

    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ "error": err.message });
    } finally {
        client.release();
    }
};

exports.findEmployee = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees WHERE employee_id = $1", [req.params.employeeId.toUpperCase()]);
        const row = result.rows[0];
        if (row && row.registration_time) {
            const qr = await qrcode.toDataURL(row.employee_id, { width: 350, margin: 1 });
            res.status(200).json({
                "message": "พบข้อมูล QR Code",
                "data": { ...row, "qrCode": qr }
            });
        } else {
            res.status(404).json({ "error": "ไม่พบข้อมูล (หรือยังไม่ได้ลงทะเบียน)" });
        }
    } catch (err) { res.status(500).json({ "error": err.message }); }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employees ORDER BY registration_time DESC");
        res.status(200).json({ "data": result.rows });
    } catch (err) { res.status(500).json({ "error": err.message }); }
};

exports.getStatusSummary = async (req, res) => {
    try {
        const r1 = await pool.query("SELECT COUNT(*) FROM employees");
        const r2 = await pool.query("SELECT COUNT(*) FROM employees WHERE registration_time IS NOT NULL");
        const r3 = await pool.query("SELECT COUNT(*) FROM employees WHERE sport_day_registered = TRUE");
        const r4 = await pool.query("SELECT COUNT(*) FROM employees WHERE checked_in = TRUE");
        const r5 = await pool.query("SELECT COUNT(*) FROM employees WHERE registration_time IS NOT NULL AND sport_day_registered = TRUE AND checked_in = TRUE");

        res.status(200).json({
            data: {
                total: parseInt(r1.rows[0].count),
                new_year: parseInt(r2.rows[0].count),
                sport_day: parseInt(r3.rows[0].count),
                checked_in: parseInt(r4.rows[0].count),
                all_three: parseInt(r5.rows[0].count)
            }
        });
    } catch (err) { res.status(500).json({ "error": err.message }); }
};

exports.checkin = async (req, res) => {
    const eid = req.body.employeeId?.toUpperCase();
    if (!eid) return res.status(400).json({ error: "No ID" });
    try {
        const result = await pool.query("SELECT * FROM employees WHERE employee_id = $1", [eid]);
        if (!result.rows[0]) return res.status(404).json({ "error": "ไม่พบพนักงาน" });
        if (result.rows[0].checked_in) return res.status(409).json({ "error": "เช็คอินไปแล้ว", "data": result.rows[0] });

        await pool.query("UPDATE employees SET checked_in = TRUE, checkin_time = NOW() WHERE employee_id = $1", [eid]);
        res.status(200).json({ "message": "เช็คอินสำเร็จ", "data": result.rows[0] });
    } catch (err) { res.status(500).json({ "error": err.message }); }
};

exports.sportdayRegister = async (req, res) => {
    const eid = req.body.employeeId?.toUpperCase();
    if (!eid) return res.status(400).json({ error: "No ID" });
    try {
        const result = await pool.query("SELECT * FROM employees WHERE employee_id = $1", [eid]);
        if (!result.rows[0]) return res.status(404).json({ "error": "ไม่พบพนักงาน" });
        if (result.rows[0].sport_day_registered) return res.status(409).json({ "error": "ลงทะเบียนแล้ว", "data": result.rows[0] });

        await pool.query("UPDATE employees SET sport_day_registered = TRUE, sport_day_reg_time = NOW() WHERE employee_id = $1", [eid]);
        res.status(200).json({ "message": "ลงทะเบียนสำเร็จ", "data": result.rows[0] });
    } catch (err) { res.status(500).json({ "error": err.message }); }
};

exports.deleteAllEmployees = async (req, res) => {
    if (req.body.adminPassword !== 'admin') return res.status(401).json({ "error": "รหัสผิด" });
    try {
        await pool.query("TRUNCATE employees, votes RESTART IDENTITY");
        res.status(200).json({ "message": "ล้างข้อมูลสำเร็จ" });
    } catch (err) { res.status(500).json({ "error": err.message }); }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await pool.query("DELETE FROM employees WHERE id = $1", [req.params.id]);
        res.status(200).json({ "message": "ลบสำเร็จ" });
    } catch (err) { res.status(500).json({ "error": err.message }); }
};
