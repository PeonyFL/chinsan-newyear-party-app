const { Pool } = require('pg');
require('dotenv').config(); // โหลดค่าจาก .env

// ตั้งค่าการเชื่อมต่อ (ดึงจาก Environment Variables)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: false // <--- ต้องมีบรรทัดนี้สำหรับ Supabase !!!
    }
});

console.log('Connecting to Google Cloud SQL (PostgreSQL)...');

// ฟังก์ชันสำหรับสร้างตาราง (Schema Migration)
const initDb = async () => {
    const client = await pool.connect();
    try {
        // 1. Employees Table
        // SQLite: INTEGER PRIMARY KEY AUTOINCREMENT -> Postgres: SERIAL PRIMARY KEY
        // SQLite: strftime -> Postgres: ใช้ CURRENT_TIMESTAMP หรือจัดการฝั่ง Node
        await client.query(`
            CREATE TABLE IF NOT EXISTS employees (
                id SERIAL PRIMARY KEY,
                employee_id TEXT UNIQUE NOT NULL,
                first_name TEXT,
                last_name TEXT,
                department TEXT,
                registration_time TIMESTAMP WITH TIME ZONE,
                checked_in BOOLEAN DEFAULT FALSE,
                checkin_time TIMESTAMP WITH TIME ZONE,
                sport_day_registered BOOLEAN DEFAULT FALSE,
                sport_day_reg_time TIMESTAMP WITH TIME ZONE
            );
        `);

        // 2. Candidates Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS candidates (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                department TEXT,
                votes INTEGER DEFAULT 0
            );
        `);

        // 3. Votes Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS votes (
                employee_id TEXT PRIMARY KEY
            );
        `);

        // 4. Prizes Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS prizes (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL
            );
        `);

        // 5. Vote Status Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS vote_status (
                id INTEGER PRIMARY KEY DEFAULT 1,
                is_open BOOLEAN DEFAULT FALSE,
                deadline TIMESTAMP WITH TIME ZONE
            );
        `);

        // Ensure default vote status row
        await client.query(`
            INSERT INTO vote_status (id, is_open, deadline) 
            VALUES (1, FALSE, NULL) 
            ON CONFLICT (id) DO NOTHING;
        `);

        // Initial Data Checks (ตรวจสอบและเพิ่มข้อมูลเริ่มต้น)
        const candRes = await client.query("SELECT COUNT(*) FROM candidates");
        if (parseInt(candRes.rows[0].count) === 0) {
            console.log("Seeding candidates...");
            await client.query("INSERT INTO candidates (name, department) VALUES ($1, $2), ($3, $4), ($5, $6)", 
                ["สมชาย ใจดี", "ฝ่ายขาย", "สมศรี มีสุข", "ฝ่ายการตลาด", "พรเทพ มุ่งมั่น", "ฝ่ายบุคคล"]);
        }

        const prizeRes = await client.query("SELECT COUNT(*) FROM prizes");
        if (parseInt(prizeRes.rows[0].count) === 0) {
            console.log("Seeding prizes...");
            const prizes = [
                "รางวัลที่ 5: บัตรกำนัล 2,000 บาท", "รางวัลที่ 4: พัดลมไอน้ำ",
                "รางวัลที่ 3: Smart TV 55 นิ้ว", "รางวัลที่ 2: ทองคำ 1 บาท", "รางวัลที่ 1: iPhone 16"
            ];
            // Loop insert หรือใช้ Bulk insert ก็ได้
            for (const p of prizes) {
                await client.query("INSERT INTO prizes (name) VALUES ($1)", [p]);
            }
        }

        console.log("Database initialized successfully.");

    } catch (err) {
        console.error("Error initializing database:", err);
    } finally {
        client.release();
    }
};

initDb();

module.exports = pool;