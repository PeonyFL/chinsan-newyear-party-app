const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "new_year_party.db";

// เชื่อมต่อหรือสร้างไฟล์ฐานข้อมูล
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // ไม่สามารถเปิดฐานข้อมูลได้
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        // เปิดใช้งานโหมด Write-Ahead Logging เพื่อประสิทธิภาพที่ดีขึ้นและลดการ lock ฐานข้อมูล
        db.exec('PRAGMA journal_mode = WAL;');

        // สร้างตาราง employees หากยังไม่มี
        db.run(`CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT UNIQUE,
            first_name TEXT,
            last_name TEXT,
            registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                // สร้างตารางไม่สำเร็จ
                console.error("Error creating table", err);
            }
        });
    }
});

module.exports = db;