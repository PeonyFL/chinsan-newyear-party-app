const { pool } = require('./backend/src/config/db');

async function verify() {
    try {
        console.log("Connecting to DB...");
        const client = await pool.connect();

        console.log("--- Checking Prize Count ---");
        const pRes = await client.query("SELECT COUNT(*) FROM prizes");
        console.log(`Total Prizes: ${pRes.rows[0].count}`);

        console.log("--- Checking Employee Stats ---");
        const allRes = await client.query("SELECT COUNT(*) FROM employees");
        console.log(`Total Employees: ${allRes.rows[0].count}`);

        const eligibleRes = await client.query("SELECT COUNT(*) FROM employees WHERE checked_in = TRUE AND sport_day_registered = TRUE AND registration_time IS NOT NULL");
        console.log(`Eligible Employees (DB Query): ${eligibleRes.rows[0].count}`);

        console.log("--- Sample Employee Data ---");
        const sampleRes = await client.query("SELECT * FROM employees WHERE checked_in = TRUE LIMIT 1");
        if (sampleRes.rows.length > 0) {
            const row = sampleRes.rows[0];
            console.log("Sample Row:", row);
            console.log("Type of checked_in:", typeof row.checked_in);
            console.log("Type of sport_day_registered:", typeof row.sport_day_registered);
            console.log("Type of registration_time:", typeof row.registration_time); // Object (Date) or String
            console.log("Value of checked_in:", row.checked_in);
        } else {
            console.log("No checked-in employees found to sample.");
        }

        client.release();
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

verify();
