const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "new_year_party.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.exec('PRAGMA journal_mode = WAL;');

        // ตารางพนักงาน (เพิ่มคอลัมน์สำหรับเช็คอิน)
        db.run(`CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT UNIQUE,
            first_name TEXT,
            last_name TEXT,
            registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            checked_in INTEGER DEFAULT 0,
            checkin_time TIMESTAMP
        )`, (err) => {
            if (err) console.error("Error creating employees table", err);
        });

        // ตารางผู้เข้าประกวด
        db.run(`CREATE TABLE IF NOT EXISTS candidates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT,
            votes INTEGER DEFAULT 0
        )`, (err) => {
            if (err) {
                console.error("Error creating candidates table", err);
            } else {
                // เพิ่มข้อมูลผู้เข้าประกวดเบื้องต้น (ถ้ายังไม่มี)
                db.get("SELECT COUNT(*) as count FROM candidates", (err, row) => {
                    if (row.count === 0) {
                        const insert = 'INSERT INTO candidates (name, department) VALUES (?,?)';
                        db.run(insert, ["สมชาย ใจดี", "ฝ่ายขาย"]);
                        db.run(insert, ["สมศรี มีสุข", "ฝ่ายการตลาด"]);
                        db.run(insert, ["พรเทพ มุ่งมั่น", "ฝ่ายบุคคล"]);
                    }
                });
            }
        });
        
        // ตารางเก็บการโหวต
        db.run(`CREATE TABLE IF NOT EXISTS votes (
            employee_id TEXT PRIMARY KEY
        )`, (err) => {
            if (err) console.error("Error creating votes table", err);
        });
    }
});

module.exports = db;