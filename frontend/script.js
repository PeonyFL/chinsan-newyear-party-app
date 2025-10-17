// !!! สำคัญ: เปลี่ยน URL นี้เป็น URL Backend ของคุณบน Render หรือ localhost !!!
const API_BASE_URL = "http://localhost:3000";

// --- Get all elements ---
const mainCard = document.getElementById('main-card');
const mainSections = document.getElementById('main-sections');
const registrationSection = document.getElementById('registration-section');
const findSection = document.getElementById('find-section');
const employeeListSection = document.getElementById('employee-list-section');
const drawSection = document.getElementById('draw-section');
const checkinSection = document.getElementById('checkin-section');
const registrationForm = document.getElementById('registrationForm');
const findForm = document.getElementById('findForm');
const checkinForm = document.getElementById('checkinForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');

// --- Buttons ---
const backToFormBtn = document.getElementById('backToFormBtn');
const viewEmployeesBtn = document.getElementById('viewEmployeesBtn');
const backFromListBtn = document.getElementById('backFromListBtn');
const showDrawPageBtn = document.getElementById('showDrawPageBtn');
const backFromDrawBtn = document.getElementById('backFromDrawBtn');
const showCheckinPageBtn = document.getElementById('showCheckinPageBtn');
const backFromCheckinBtn = document.getElementById('backFromCheckinBtn');

// --- Links ---
const showFindFormLink = document.getElementById('showFindFormLink');
const showRegisterFormLink = document.getElementById('showRegisterFormLink');

// --- Prize Draw Elements ---
const prizeDisplayList = document.getElementById('prize-display-list');
const drawAnimationArea = document.getElementById('draw-animation-area');
const currentPrizeDrawing = document.getElementById('current-prize-drawing');
const slotName = document.getElementById('slot-name');
const slotId = document.getElementById('slot-id');
const drawControls = document.getElementById('draw-controls');
const drawNextBtn = document.getElementById('drawNextBtn');
const resetDrawBtn = document.getElementById('resetDrawBtn');
const winnersListContainer = document.getElementById('winnersListContainer');
const winnersList = document.getElementById('winnersList');

// --- Check-in Elements ---
const checkinResultContainer = document.getElementById('checkinResultContainer');

// --- Modal Elements ---
const winnerModalEl = document.getElementById('winnerModal');
const winnerModal = new bootstrap.Modal(winnerModalEl); // สร้าง Instance ของ Bootstrap Modal
const modalPrizeName = document.getElementById('modal-prize-name');
const modalWinnerName = document.getElementById('modal-winner-name');
const modalWinnerId = document.getElementById('modal-winner-id');

// --- Global state ---
let allWinners = [];
let allEmployees = [];
let currentWinnerIndex = 0;
const defaultSections = [registrationSection, findSection];
const fullScreenSections = [employeeListSection, drawSection, checkinSection];

// --- Page Navigation Functions ---
function navigateTo(sectionToShow) {
    [...defaultSections, ...fullScreenSections, resultDiv, errorDiv].forEach(sec => sec.classList.add('d-none'));
    sectionToShow.classList.remove('d-none');
    
    if (fullScreenSections.includes(sectionToShow)) {
        mainCard.classList.add('fullscreen');
    } else {
        mainCard.classList.remove('fullscreen');
    }
}

async function showDrawPage() {
    navigateTo(drawSection);
    await setupNewDraw();
}

// --- Event Listeners for navigation ---
showFindFormLink.addEventListener('click', (e) => { e.preventDefault(); navigateTo(findSection); });
showRegisterFormLink.addEventListener('click', (e) => { e.preventDefault(); navigateTo(registrationSection); });
backToFormBtn.addEventListener('click', () => navigateTo(registrationSection));
backFromListBtn.addEventListener('click', () => navigateTo(registrationSection));
showDrawPageBtn.addEventListener('click', showDrawPage);
backFromDrawBtn.addEventListener('click', () => navigateTo(registrationSection));
resetDrawBtn.addEventListener('click', setupNewDraw);
showCheckinPageBtn.addEventListener('click', () => navigateTo(checkinSection));
backFromCheckinBtn.addEventListener('click', () => navigateTo(registrationSection));

// --- Main Application Logic ---
registrationForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const employeeId = document.getElementById('employeeId').value.toUpperCase();
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, employeeId }),
        });
        const data = await response.json();
        if (response.ok) {
            displayResult(data);
        } else {
            displayError(data.error);
        }
    } catch (error) {
        displayError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
});

findForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const employeeId = document.getElementById('findEmployeeId').value.toUpperCase();
    if (!employeeId) { displayError('กรุณากรอกรหัสพนักงาน'); return; }
    try {
        const response = await fetch(`${API_BASE_URL}/find/${employeeId}`);
        const data = await response.json();
        if (response.ok) {
            displayResult(data);
        } else {
            displayError(data.error);
        }
    } catch (error) {
        displayError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
});

viewEmployeesBtn.addEventListener('click', async function() {
    try {
        const response = await fetch(`${API_BASE_URL}/employees`);
        const result = await response.json();
        if (response.ok) {
            navigateTo(employeeListSection);
            renderEmployeeTable(result.data);
        } else {
            displayError(result.error);
        }
    } catch (error) {
        displayError('ไม่สามารถเชื่อมต่อเพื่อดึงรายชื่อได้');
    }
});

checkinForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const checkinEmployeeId = document.getElementById('checkinEmployeeId').value.toUpperCase();
    if (!checkinEmployeeId) { return; }
    try {
        const response = await fetch(`${API_BASE_URL}/find/${checkinEmployeeId}`);
        const result = await response.json();
        displayCheckinResult(response.ok, result.data);
    } catch (error) {
        displayCheckinResult(false);
    }
    checkinForm.reset();
});

// --- Prize Draw Logic ---
async function setupNewDraw() {
    drawNextBtn.disabled = true;
    drawNextBtn.innerText = 'กำลังเตรียมข้อมูล...';
    
    winnersList.innerHTML = '';
    winnersListContainer.classList.add('d-none');
    drawAnimationArea.classList.remove('d-none');
    resetDrawBtn.classList.add('d-none');
    drawNextBtn.classList.remove('d-none');

    try {
        const [winnersResponse, employeesResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/draw`),
            fetch(`${API_BASE_URL}/employees`)
        ]);
        if (!winnersResponse.ok || !employeesResponse.ok) throw new Error('Failed to fetch data');
        
        const winnersResult = await winnersResponse.json();
        const employeesResult = await employeesResponse.json();

        allWinners = winnersResult.data;
        allEmployees = employeesResult.data;
        currentWinnerIndex = 0;

        drawNextBtn.disabled = false;
        drawNextBtn.innerText = 'สุ่มรางวัลถัดไป!';
        updatePrizeDisplay();
    } catch (error) {
        displayError('ไม่สามารถเตรียมการสุ่มรางวัลได้');
        drawNextBtn.innerText = 'เกิดข้อผิดพลาด';
    }
}

drawNextBtn.addEventListener('click', async function() {
    if (currentWinnerIndex >= allWinners.length) return;
    drawNextBtn.disabled = true;
    await runSingleDrawAnimation(allWinners[currentWinnerIndex]);
    currentWinnerIndex++;
    if (currentWinnerIndex < allWinners.length) {
        updatePrizeDisplay();
        drawNextBtn.disabled = false;
    } else {
        drawNextBtn.classList.add('d-none');
        resetDrawBtn.classList.remove('d-none');
        currentPrizeDrawing.innerText = "จับรางวัลครบแล้ว!";
    }
});

async function runSingleDrawAnimation(winner) {
    const animationDuration = 3000;
    const shuffleInterval = 50;

    const shuffle = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * allEmployees.length);
        const randomEmployee = allEmployees[randomIndex];
        slotName.innerText = `${randomEmployee.first_name} ${randomEmployee.last_name}`;
        slotId.innerText = randomEmployee.employee_id;
    }, shuffleInterval);

    await new Promise(resolve => setTimeout(resolve, animationDuration));
    clearInterval(shuffle);

    slotName.innerText = `${winner.first_name} ${winner.last_name}`;
    slotId.innerText = winner.employee_id;
    
    const prizes = Array.from(prizeDisplayList.querySelectorAll('li')).map(li => li.innerText);
    const prize = prizes[currentWinnerIndex];
    
    winnersListContainer.classList.remove('d-none');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<span class="prize-title">${prize}</span>: <span class="winner-name">${winner.first_name} ${winner.last_name}</span> (รหัส: ${winner.employee_id})`;
    winnersList.appendChild(li);

    showWinnerPopup(winner, prize);
}

// --- Helper Functions ---
function updatePrizeDisplay() {
    const prizes = Array.from(prizeDisplayList.querySelectorAll('li'));
    prizes.forEach(li => li.classList.remove('drawing-now'));
    if (currentWinnerIndex < prizes.length) {
        prizes[currentWinnerIndex].classList.add('drawing-now');
        currentPrizeDrawing.innerText = prizes[currentWinnerIndex].innerText;
    }
}

function showWinnerPopup(winner, prize) {
    modalPrizeName.innerText = prize;
    modalWinnerName.innerText = `${winner.first_name} ${winner.last_name}`;
    modalWinnerId.innerText = `(รหัส: ${winner.employee_id})`;
    winnerModal.show(); // ใช้ method .show() ของ Bootstrap Modal
}

function displayCheckinResult(isSuccess, data = null) {
    checkinResultContainer.classList.remove('d-none');
    if (isSuccess) {
        checkinResultContainer.innerHTML = `
            <div class="alert alert-success d-flex align-items-center" role="alert">
                <div class="status-icon me-3">✔️</div>
                <div>
                    <h4 class="alert-heading">ตรวจสอบสำเร็จ</h4>
                    <p class="mb-0"><strong>ชื่อ:</strong> ${data.firstName} ${data.lastName}</p>
                    <p class="mb-0"><strong>รหัสพนักงาน:</strong> ${data.employeeId}</p>
                </div>
            </div>
        `;
    } else {
        checkinResultContainer.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <div class="status-icon me-3">❌</div>
                <div>
                    <h4 class="alert-heading">ไม่พบข้อมูล</h4>
                    <p class="mb-0">กรุณาตรวจสอบรหัสพนักงานอีกครั้ง</p>
                </div>
            </div>
        `;
    }
}

function renderEmployeeTable(employees) {
    if (employees.length === 0) {
        employeeTableContainer.innerHTML = '<p class="text-center">ยังไม่มีผู้ลงทะเบียน</p>';
        return;
    }
    const table = document.createElement('table');
    table.className = 'table table-striped table-hover';
    table.innerHTML = `
        <thead class="table-light">
            <tr>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>รหัสพนักงาน</th>
                <th>เวลาลงทะเบียน</th>
            </tr>
        </thead>
        <tbody>
            ${employees.map(emp => `
                <tr>
                    <td>${emp.first_name}</td>
                    <td>${emp.last_name}</td>
                    <td>${emp.employee_id}</td>
                    <td>${new Date(emp.registration_time).toLocaleString('th-TH')}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    employeeTableContainer.innerHTML = '';
    employeeTableContainer.appendChild(table);
}

function displayResult(data) {
    navigateTo(resultDiv);
    document.getElementById('resultMessage').innerText = data.message;
    document.getElementById('qrCodeContainer').innerHTML = `<img src="${data.data.qrCode}" class="img-fluid" alt="QR Code">`;
}

function displayError(message) {
    errorDiv.classList.remove('d-none');
    document.getElementById('errorMessage').innerText = message || 'เกิดข้อผิดพลาดบางอย่าง';
}