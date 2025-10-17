// --- Get all elements ---
const mainSections = document.getElementById('main-sections');
const registrationSection = document.getElementById('registration-section');
const findSection = document.getElementById('find-section');
const employeeListSection = document.getElementById('employee-list-section');
const registrationForm = document.getElementById('registrationForm');
const findForm = document.getElementById('findForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');

// --- Buttons ---
const backToFormBtn = document.getElementById('backToFormBtn');
const viewEmployeesBtn = document.getElementById('viewEmployeesBtn');
const backFromListBtn = document.getElementById('backFromListBtn');

// --- Links ---
const showFindFormLink = document.getElementById('showFindFormLink');
const showRegisterFormLink = document.getElementById('showRegisterFormLink');


// --- Page Navigation Functions ---
function showMainPage() {
    mainSections.classList.remove('hidden');
    employeeListSection.classList.add('hidden');
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    registrationSection.classList.remove('hidden');
    findSection.classList.add('hidden');
    registrationForm.reset();
    findForm.reset();
}

function showFindPage() {
    registrationSection.classList.add('hidden');
    findSection.classList.remove('hidden');
}

// --- Event Listeners for links and buttons ---
showFindFormLink.addEventListener('click', (e) => {
    e.preventDefault();
    showFindPage();
});
showRegisterFormLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Go back to the main registration form view
    registrationSection.classList.remove('hidden');
    findSection.classList.add('hidden');
});
backToFormBtn.addEventListener('click', showMainPage);
backFromListBtn.addEventListener('click', showMainPage);


// --- Registration Form Submit (Existing) ---
registrationForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const employeeId = document.getElementById('employeeId').value;

    errorDiv.classList.add('hidden');

    try {
        const response = await fetch('https://chinsanparty-backend.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, employeeId }),
        });
        const data = await response.json();
        if (response.ok) {
            mainSections.classList.add('hidden');
            displayResult(data);
        } else {
            displayError(data.error);
        }
    } catch (error) {
        displayError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
});

// --- Find Form Submit (Existing) ---
findForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const employeeId = document.getElementById('findEmployeeId').value;
    errorDiv.classList.add('hidden');

    if (!employeeId) {
        displayError('กรุณากรอกรหัสพนักงาน');
        return;
    }

    try {
        const response = await fetch(`https://chinsanparty-backend.onrender.com/find/${employeeId}`);
        const data = await response.json();

        if (response.ok) {
            mainSections.classList.add('hidden');
            displayResult(data);
        } else {
            displayError(data.error);
        }
    } catch (error) {
        displayError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
});


// --- View Employees Button Click (New) ---
viewEmployeesBtn.addEventListener('click', async function() {
    errorDiv.classList.add('hidden');
    try {
        const response = await fetch('https://chinsanparty-backend.onrender.com/employees');
        const result = await response.json();

        if (response.ok) {
            mainSections.classList.add('hidden');
            employeeListSection.classList.remove('hidden');
            renderEmployeeTable(result.data);
        } else {
            displayError(result.error);
        }
    } catch (error) {
        displayError('ไม่สามารถเชื่อมต่อเพื่อดึงรายชื่อได้');
    }
});


// --- Table Rendering Function (New) ---
function renderEmployeeTable(employees) {
    const container = document.getElementById('employeeTableContainer');
    container.innerHTML = ''; // Clear previous table

    if (employees.length === 0) {
        container.innerHTML = '<p>ยังไม่มีผู้ลงทะเบียน</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'employee-table';

    // Create table header
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = ['ชื่อ', 'นามสกุล', 'รหัสพนักงาน', 'เวลาลงทะเบียน'];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    // Create table body
    const tbody = table.createTBody();
    employees.forEach(emp => {
        const row = tbody.insertRow();
        row.insertCell().textContent = emp.first_name;
        row.insertCell().textContent = emp.last_name;
        row.insertCell().textContent = emp.employee_id;
        // Format the date for readability
        const formattedDate = new Date(emp.registration_time).toLocaleString('th-TH');
        row.insertCell().textContent = formattedDate;
    });

    container.appendChild(table);
}


// --- Helper Functions to Display Results/Errors (Existing) ---
function displayResult(data) {
    resultDiv.classList.remove('hidden');
    document.getElementById('resultMessage').innerText = data.message;
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = '';
    const qrImage = document.createElement('img');
    qrImage.src = data.data.qrCode;
    qrContainer.appendChild(qrImage);
}

function displayError(message) {
    errorDiv.classList.remove('hidden');
    document.getElementById('errorMessage').innerText = message || 'เกิดข้อผิดพลาดบางอย่าง';
}