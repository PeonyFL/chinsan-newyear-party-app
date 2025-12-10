const { pool } = require('../config/db');

exports.getVoteStatus = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM vote_status WHERE id = 1");
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.startVote = async (req, res) => {
    try {
        const deadline = new Date(Date.now() + req.body.durationInMinutes * 60000).toISOString();
        await pool.query("UPDATE vote_status SET is_open = TRUE, deadline = $1 WHERE id = 1", [deadline]);
        res.status(201).json({ message: "เปิดโหวตแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.closeVote = async (req, res) => {
    try {
        await pool.query("UPDATE vote_status SET is_open = FALSE WHERE id = 1");
        res.json({ message: "ปิดโหวตแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.getCandidates = async (req, res) => {
    try {
        const sql = `
            SELECT c.id, c.name, c.department, COUNT(v.employee_id)::int as votes 
            FROM candidates c 
            LEFT JOIN votes v ON c.id = v.candidate_id 
            GROUP BY c.id 
            ORDER BY votes DESC, c.name ASC
        `;
        const result = await pool.query(sql);
        res.json({ data: result.rows });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.addCandidate = async (req, res) => {
    try {
        await pool.query("INSERT INTO candidates (name, department) VALUES ($1, $2)", [req.body.name, req.body.department]);
        res.status(201).json({ message: "เพิ่มแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.updateCandidate = async (req, res) => {
    try {
        await pool.query("UPDATE candidates SET name = $1, department = $2 WHERE id = $3", [req.body.name, req.body.department, req.params.id]);
        res.json({ message: "แก้ไขแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.deleteCandidate = async (req, res) => {
    try {
        await pool.query("DELETE FROM votes WHERE candidate_id = $1", [req.params.id]);
        await pool.query("DELETE FROM candidates WHERE id = $1", [req.params.id]);
        res.json({ message: "ลบแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.resetCandidates = async (req, res) => {
    try {
        await pool.query("TRUNCATE votes, candidates RESTART IDENTITY");
        res.json({ message: "รีเซ็ตแล้ว" });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.getResults = async (req, res) => {
    try {
        const sql = `
            SELECT c.name, c.department, COUNT(v.employee_id)::int as votes 
            FROM candidates c 
            LEFT JOIN votes v ON c.id = v.candidate_id 
            GROUP BY c.id 
            ORDER BY votes DESC
        `;
        const result = await pool.query(sql);
        res.json({ data: result.rows });
    } catch (err) { res.status(500).json({ error: err.message }) }
};

exports.vote = async (req, res) => {
    const { employeeId, candidateId } = req.body;
    const eid = employeeId.toUpperCase();
    const client = await pool.connect();

    try {
        const statusRes = await pool.query("SELECT is_open, deadline FROM vote_status WHERE id = 1");
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
};

exports.checkEligibility = async (req, res) => {
    const eid = req.params.employeeId.toUpperCase();
    try {
        const s = await pool.query("SELECT * FROM vote_status");
        if (!s.rows[0].is_open) return res.status(403).json({ status: 'vote_closed', message: "ปิด" });

        const e = await pool.query("SELECT checked_in FROM employees WHERE employee_id = $1", [eid]);
        if (!e.rows[0]) return res.status(404).json({ status: 'not_found', message: "ไม่พบ" });
        if (!e.rows[0].checked_in) return res.status(403).json({ status: 'not_checked_in', message: "ยังไม่เช็คอิน" });

        const v = await pool.query("SELECT 1 FROM votes WHERE employee_id = $1", [eid]);
        if (v.rows.length > 0) return res.status(409).json({ status: 'already_voted', message: "โหวตแล้ว" });

        res.status(200).json({ status: 'eligible', message: "มีสิทธิ์", deadline: s.rows[0].deadline });
    } catch (err) { res.status(500).json({ status: 'error', message: err.message }); }
};
