// Simulation of frontend logic
const allEmployees = [
    { employee_id: 'A1', checked_in: true, sport_day_registered: true, registration_time: '2025-01-01' },
    { employee_id: 'A2', checked_in: true, sport_day_registered: true, registration_time: '2025-01-01' },
    { employee_id: 'A3', checked_in: true, sport_day_registered: true, registration_time: '2025-01-01' },
    { employee_id: 'B1', checked_in: false, sport_day_registered: true, registration_time: '2025-01-01' }, // Not checked in
    { employee_id: 'B2', checked_in: true, sport_day_registered: false, registration_time: '2025-01-01' }, // Not sport day
    { employee_id: 'B3', checked_in: true, sport_day_registered: true, registration_time: null },        // No reg time
];

const allWinners = [
    { employee_id: 'A1' } // Already a winner
];

console.log("--- Initial State ---");
console.log("All Employees:", allEmployees.length);
console.log("Eligible Candidates in Pool (Expected: A2, A3 = 2 people)");

const eligible = allEmployees.filter(e =>
    e.checked_in && e.sport_day_registered && e.registration_time &&
    !allWinners.find(w => w.employee_id === e.employee_id)
);

console.log("Eligible Found:", eligible.length);
console.log("Eligible IDs:", eligible.map(e => e.employee_id));

if (eligible.length === 2 && eligible.find(e => e.employee_id === 'A2') && eligible.find(e => e.employee_id === 'A3')) {
    console.log("✅ Logic Verification: PASSED");
} else {
    console.log("❌ Logic Verification: FAILED");
    console.log("Failed details:", eligible);
}

// Test with truthiness of formatted JSON response (simulating fetch)
const jsonEmployees = JSON.parse(JSON.stringify(allEmployees));
const jsonWinners = JSON.parse(JSON.stringify(allWinners));

console.log("\n--- JSON Simulation ---");
const eligibleJson = jsonEmployees.filter(e =>
    e.checked_in && e.sport_day_registered && e.registration_time &&
    !jsonWinners.find(w => w.employee_id === e.employee_id)
);
console.log("Eligible JSON Found:", eligibleJson.length);
