const { pool } = require('../config/db');

exports.drawPrizes = async (req, res) => {
    try {
        const pRes = await pool.query("SELECT COUNT(*) FROM prizes");
        const winnersNeeded = parseInt(pRes.rows[0].count);
        if (winnersNeeded === 0) return res.status(400).json({ "error": "ไม่มีของรางวัล" });

        const sql = `SELECT id, first_name, last_name, employee_id, department FROM employees WHERE checked_in = TRUE AND sport_day_registered = TRUE AND registration_time IS NOT NULL`;
        const { rows } = await pool.query(sql);

        if (rows.length < winnersNeeded) return res.status(400).json({ "error": "ผู้มีสิทธิ์น้อยกว่าจำนวนรางวัล" });

        for (let i = rows.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rows[i], rows[j]] = [rows[j], rows[i]];
        }
        res.status(200).json({ "message": "success", "data": rows.slice(0, winnersNeeded) });
    } catch (err) { res.status(500).json({ "error": err.message }); }
};

exports.getPrizes = async (req, res) => {
    try {
        const resDb = await pool.query("SELECT * FROM prizes ORDER BY id ASC");
        res.json({ data: resDb.rows });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.addPrize = async (req, res) => {
    try {
        await pool.query("INSERT INTO prizes (name) VALUES ($1)", [req.body.name]);
        res.status(201).json({ message: "เพิ่มรางวัลแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.updatePrize = async (req, res) => {
    try {
        await pool.query("UPDATE prizes SET name = $1 WHERE id = $2", [req.body.name, req.params.id]);
        res.json({ message: "แก้ไขแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.deletePrize = async (req, res) => {
    try {
        await pool.query("DELETE FROM prizes WHERE id = $1", [req.params.id]);
        res.json({ message: "ลบแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.resetPrizes = async (req, res) => {
    try {
        await pool.query("TRUNCATE prizes RESTART IDENTITY");
        const prizes = ["รางวัลที่ 5", "รางวัลที่ 4", "รางวัลที่ 3", "รางวัลที่ 2", "รางวัลที่ 1"];
        for (const p of prizes) await pool.query("INSERT INTO prizes (name) VALUES ($1)", [p]);
        res.json({ message: "รีเซ็ตรางวัลแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};
