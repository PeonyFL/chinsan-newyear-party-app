const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "new_year_party.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error("Failed to connect to the database:", err.message);
        throw err;
    }

    console.log('Connected to the SQLite database.');

    db.serialize(() => {
        // 1. PRAGMA settings
        db.exec('PRAGMA journal_mode = WAL;', (err) => {
            if (err) console.error("Error setting PRAGMA:", err.message);
        });

        // 2. Create employees table
        db.run(`CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT UNIQUE,
            first_name TEXT,
            last_name TEXT,
            department TEXT,
            registration_time TIMESTAMP,
            checked_in INTEGER DEFAULT 0,
            checkin_time TIMESTAMP,
            sport_day_registered INTEGER DEFAULT 0,
            sport_day_reg_time TIMESTAMP
        )`, (err) => {
            if (err) console.error("Error creating 'employees' table:", err.message);
        });

        // 3. Create candidates table
        db.run(`CREATE TABLE IF NOT EXISTS candidates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT,
            votes INTEGER DEFAULT 0
        )`, (err) => {
            if (err) console.error("Error creating 'candidates' table:", err.message);
        });

        // 4. Create votes table
        db.run(`CREATE TABLE IF NOT EXISTS votes (
            employee_id TEXT PRIMARY KEY
        )`, (err) => {
            if (err) console.error("Error creating 'votes' table:", err.message);
        });

        // 5. Create prizes table
        db.run(`CREATE TABLE IF NOT EXISTS prizes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )`, (err) => {
            if (err) console.error("Error creating 'prizes' table:", err.message);
        });

        // (ใหม่) 6. Create vote_status table
        db.run(`CREATE TABLE IF NOT EXISTS vote_status (
            id INTEGER PRIMARY KEY DEFAULT 1,
            is_open INTEGER DEFAULT 0,
            deadline TIMESTAMP
        )`, (err) => {
            if (err) console.error("Error creating 'vote_status' table:", err.message);
        });

        // (ใหม่) 7. Ensure the single row exists in vote_status
        db.run(`INSERT OR IGNORE INTO vote_status (id, is_open, deadline) VALUES (1, 0, NULL)`, (err) => {
            if (err) console.error("Error inserting default 'vote_status' row:", err.message);
        });

        // Check candidates
        db.get("SELECT COUNT(*) as count FROM candidates", [], (err, row) => {
            if (err) { console.error("Error checking 'candidates' count:", err.message); return; }
            if (row && row.count === 0) {
                console.log("Populating 'candidates' table with default data...");
                const insert = 'INSERT INTO candidates (name, department) VALUES (?,?)';
                db.serialize(() => {
                    db.run(insert, ["สมชาย ใจดี", "ฝ่ายขาย"]);
                    db.run(insert, ["สมศรี มีสุข", "ฝ่ายการตลาด"]);
                    db.run(insert, ["พรเทพ มุ่งมั่น", "ฝ่ายบุคคล"]);
                });
            }
        });

        // Check prizes
        db.get("SELECT COUNT(*) as count FROM prizes", [], (err, row) => {
            if (err) { console.error("Error checking 'prizes' count:", err.message); return; }
            if (row && row.count === 0) {
                console.log("Populating 'prizes' table with default data...");
                const insert = 'INSERT INTO prizes (name) VALUES (?)';
                db.serialize(() => {
                    db.run(insert, ["รางวัลที่ 5: บัตรกำนัล 2,000 บาท"]);
                    db.run(insert, ["รางวัลที่ 4: พัดลมไอน้ำ"]);
                    db.run(insert, ["รางวัลที่ 3: Smart TV 55 นิ้ว"]);
                    db.run(insert, ["รางวัลที่ 2: ทองคำ 1 บาท"]);
                    db.run(insert, ["รางวัลที่ 1: iPhone 16"]);
                });
            }
        });
    });
});

module.exports = db;