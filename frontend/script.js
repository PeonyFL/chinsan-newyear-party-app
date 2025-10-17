// !!! สำคัญ: เปลี่ยน URL นี้เป็น URL Backend ของคุณบน Render หรือ localhost !!!
const API_BASE_URL = "http://localhost:3000";

// --- DOM Elements ---
const mainCard = document.getElementById('main-card');
const mainHeaderContainer = document.getElementById('main-header-container');
const roleSelectionSection = document.getElementById('role-selection-section');
const appSections = document.getElementById('app-sections');
const registrationSection = document.getElementById('registration-section');
const findSection = document.getElementById('find-section');
const employeeListSection = document.getElementById('employee-list-section');
const drawSection = document.getElementById('draw-section');
const checkinSection = document.getElementById('checkin-section');
const voteSection = document.getElementById('vote-section');
const resultDiv = document.getElementById('result');
const errorToastEl = document.getElementById('errorToast');
const errorToast = new bootstrap.Toast(errorToastEl);
const errorMessage = document.getElementById('errorMessage');

const registrationForm = document.getElementById('registrationForm');
const findForm = document.getElementById('findForm');
const checkinForm = document.getElementById('checkinForm');
const voteForm = document.getElementById('voteForm');

const adminActionsContainer = document.getElementById('admin-actions-container');
const adminPasswordModalEl = document.getElementById('adminPasswordModal');
const adminPasswordModal = new bootstrap.Modal(adminPasswordModalEl);
const adminPasswordForm = document.getElementById('adminPasswordForm');
const adminPasswordInput = document.getElementById('admin-password-input');
const adminPasswordError = document.getElementById('admin-password-error');

const allSections = [registrationSection, findSection, employeeListSection, drawSection, checkinSection, voteSection, resultDiv];
const fullScreenSections = [employeeListSection, drawSection, voteSection];

// --- Navigation ---
document.getElementById('select-employee-btn').addEventListener('click', showEmployeeView);
document.getElementById('select-admin-btn').addEventListener('click', () => adminPasswordModal.show());
document.getElementById('showFindFormLink').addEventListener('click', (e) => { e.preventDefault(); navigateTo(findSection); });
document.getElementById('showRegisterFormLink').addEventListener('click', (e) => { e.preventDefault(); navigateTo(registrationSection); });
document.getElementById('backToFormBtn').addEventListener('click', () => navigateTo(registrationSection));
document.getElementById('viewEmployeesBtn').addEventListener('click', showEmployeeList);
document.getElementById('backFromListBtn').addEventListener('click', () => navigateTo(registrationSection));
document.getElementById('showDrawPageBtn').addEventListener('click', () => navigateTo(drawSection));
document.getElementById('backFromDrawBtn').addEventListener('click', () => navigateTo(registrationSection));
document.getElementById('showCheckinPageBtn').addEventListener('click', () => navigateTo(checkinSection));
document.getElementById('backFromCheckinBtn').addEventListener('click', () => navigateTo(registrationSection));
document.getElementById('showVotePageBtn').addEventListener('click', showVotePage);
document.getElementById('backFromVoteBtn').addEventListener('click', () => navigateTo(registrationSection));

function navigateTo(sectionToShow) {
    allSections.forEach(sec => sec.classList.add('d-none'));
    sectionToShow.classList.remove('d-none');
    
    mainHeaderContainer.classList.toggle('d-none', sectionToShow !== registrationSection && sectionToShow !== findSection);
    
    if (fullScreenSections.includes(sectionToShow)) {
        mainCard.classList.add('fullscreen');
    } else {
        mainCard.classList.remove('fullscreen');
    }
}

function displayError(message) {
    errorMessage.innerText = message || 'เกิดข้อผิดพลาดบางอย่าง';
    errorToast.show();
}

// --- Role Selection Logic ---
function showEmployeeView() {
    roleSelectionSection.classList.add('d-none');
    appSections.classList.remove('d-none');
    adminActionsContainer.classList.add('d-none');
    navigateTo(registrationSection);
}

function showAdminView() {
    roleSelectionSection.classList.add('d-none');
    appSections.classList.remove('d-none');
    adminActionsContainer.classList.remove('d-none');
    navigateTo(registrationSection);
}

adminPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = adminPasswordInput.value;
    const CORRECT_PASSWORD = 'chinsan42'; // <-- ตั้งรหัสผ่าน Admin ที่นี่

    if (password === CORRECT_PASSWORD) {
        adminPasswordModal.hide();
        adminPasswordInput.value = '';
        adminPasswordError.innerText = '';
        showAdminView();
    } else {
        adminPasswordError.innerText = 'รหัสผ่านไม่ถูกต้อง';
        adminPasswordInput.value = '';
    }
});

// --- Main Application Logic (Registration, Find, Check-in, etc.) ---
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = { 
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        employeeId: document.getElementById('employeeId').value.toUpperCase()
    };
    try {
        const res = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok) {
            navigateTo(resultDiv);
            document.getElementById('resultMessage').innerText = data.message;
            const qrContainer = document.getElementById('qrCodeContainer');
            qrContainer.innerHTML = '';
            const qrImage = new Image();
            qrImage.src = data.data.qrCode;
            qrImage.className = 'img-fluid';
            qrImage.alt = 'QR Code';
            qrContainer.appendChild(qrImage);
        } else {
            displayError(data.error);
        }
    } catch (err) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); }
});

findForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const employeeId = document.getElementById('findEmployeeId').value.toUpperCase();
    if (!employeeId) return;
    try {
        const res = await fetch(`${API_BASE_URL}/find/${employeeId}`);
        const data = await res.json();
        if (res.ok) {
            navigateTo(resultDiv);
            document.getElementById('resultMessage').innerText = data.message;
            const qrContainer = document.getElementById('qrCodeContainer');
            // Backend's /find endpoint also needs to return qrCode data to display it here
            qrContainer.innerHTML = `<img src="${data.data.qrCode}" class="img-fluid" alt="QR Code">`;
        } else {
            displayError(data.error);
        }
    } catch (err) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); }
});

checkinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const employeeId = document.getElementById('checkinEmployeeId').value.toUpperCase();
    if (!employeeId) return;
    try {
        const response = await fetch(`${API_BASE_URL}/checkin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeId })
        });
        const result = await response.json();
        const container = document.getElementById('checkinResultContainer');
        container.classList.remove('d-none');
        if (response.ok) {
            container.innerHTML = `<div class="alert alert-success d-flex align-items-center"><div class="status-icon me-3">✔️</div><div><h4 class="alert-heading">เช็คอินสำเร็จ</h4><p class="mb-0"><strong>ชื่อ:</strong> ${result.data.firstName} ${result.data.lastName}</p><p class="mb-0"><strong>รหัสพนักงาน:</strong> ${result.data.employeeId}</p></div></div>`;
        } else if (response.status === 409) {
            const checkinTime = new Date(result.data.checkin_time).toLocaleString('th-TH');
            container.innerHTML = `<div class="alert alert-warning d-flex align-items-center"><div class="status-icon me-3">⚠️</div><div><h4 class="alert-heading">เช็คอินไปแล้ว</h4><p class="mb-0"><strong>ชื่อ:</strong> ${result.data.firstName} ${result.data.lastName}</p><p class="mb-0"><strong>เวลาที่เช็คอิน:</strong> ${checkinTime}</p></div></div>`;
        } else {
            container.innerHTML = `<div class="alert alert-danger d-flex align-items-center"><div class="status-icon me-3">❌</div><div><h4 class="alert-heading">ไม่พบข้อมูล</h4><p class="mb-0">กรุณาตรวจสอบรหัสพนักงานอีกครั้ง</p></div></div>`;
        }
    } catch (error) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); }
    checkinForm.reset();
});

async function showEmployeeList() {
    try {
        const res = await fetch(`${API_BASE_URL}/employees`);
        const result = await res.json();
        if (res.ok) {
            navigateTo(employeeListSection);
            const container = document.getElementById('employeeTableContainer');
            const countBadge = document.getElementById('employee-count-badge');
            countBadge.innerText = `${result.data.length} คน`;
            if (result.data.length === 0) {
                container.innerHTML = '<p class="text-center">ยังไม่มีผู้ลงทะเบียน</p>';
                return;
            }
            container.innerHTML = `<table class="table table-striped table-hover"><thead class="table-light"><tr><th>ชื่อ</th><th>นามสกุล</th><th>รหัสพนักงาน</th><th>เวลาลงทะเบียน</th><th>สถานะเช็คอิน</th></tr></thead><tbody>${result.data.map(emp => `<tr><td>${emp.first_name}</td><td>${emp.last_name}</td><td>${emp.employee_id}</td><td>${new Date(emp.registration_time).toLocaleString('th-TH')}</td><td>${emp.checked_in ? `✔️ ${new Date(emp.checkin_time).toLocaleTimeString('th-TH')}` : '❌'}</td></tr>`).join('')}</tbody></table>`;
        } else { displayError(result.error); }
    } catch (err) { displayError('ไม่สามารถเชื่อมต่อได้'); }
}

const drawElements = {
    setup: document.getElementById('draw-setup'),
    startBtn: document.getElementById('startDrawBtn'),
    nextBtn: document.getElementById('drawNextBtn'),
    resetBtn: document.getElementById('resetDrawBtn'),
    animationArea: document.getElementById('draw-animation-area'),
    prizeList: document.getElementById('prize-display-list'),
    currentPrize: document.getElementById('current-prize-drawing'),
    slotName: document.getElementById('slot-name'),
    slotId: document.getElementById('slot-id'),
    winnersContainer: document.getElementById('winnersListContainer'),
    winnersList: document.getElementById('winnersList'),
    modal: new bootstrap.Modal(document.getElementById('winnerModal')),
    modalPrize: document.getElementById('modal-prize-name'),
    modalWinner: document.getElementById('modal-winner-name'),
    modalId: document.getElementById('modal-winner-id')
};
let allWinners = [], allEmployees = [], currentWinnerIndex = 0;
drawElements.startBtn.addEventListener('click', setupNewDraw);
async function setupNewDraw() {
    drawElements.startBtn.disabled = true;
    drawElements.startBtn.innerText = 'กำลังเตรียมข้อมูล...';
    try {
        const [winRes, empRes] = await Promise.all([fetch(`${API_BASE_URL}/draw`), fetch(`${API_BASE_URL}/employees`)]);
        if (!winRes.ok || !empRes.ok) throw new Error((await (winRes.ok ? empRes : winRes).json()).error || 'Failed to fetch data');
        allWinners = (await winRes.json()).data;
        allEmployees = (await empRes.json()).data;
        currentWinnerIndex = 0;
        
        drawElements.setup.classList.add('d-none');
        drawElements.animationArea.classList.remove('d-none');
        drawElements.winnersList.innerHTML = '';
        drawElements.winnersContainer.classList.add('d-none');
        drawElements.nextBtn.disabled = false;
        drawElements.nextBtn.classList.remove('d-none');
        drawElements.resetBtn.classList.add('d-none');
        updatePrizeDisplay();
    } catch (err) { 
        displayError(err.message); 
        drawElements.startBtn.disabled = false;
        drawElements.startBtn.innerText = 'เริ่มการสุ่ม!';
    }
}
drawElements.nextBtn.addEventListener('click', async () => {
    if (currentWinnerIndex >= allWinners.length) return;
    drawElements.nextBtn.disabled = true;
    await runSingleDrawAnimation(allWinners[currentWinnerIndex]);
    currentWinnerIndex++;
    if (currentWinnerIndex < allWinners.length) {
        updatePrizeDisplay();
        drawElements.nextBtn.disabled = false;
    } else {
        drawElements.nextBtn.classList.add('d-none');
        drawElements.resetBtn.classList.remove('d-none');
        drawElements.currentPrize.innerText = "จับรางวัลครบแล้ว!";
    }
});
drawElements.resetBtn.addEventListener('click', () => {
    drawElements.setup.classList.remove('d-none');
    drawElements.animationArea.classList.add('d-none');
    drawElements.winnersContainer.classList.add('d-none');
    drawElements.startBtn.disabled = false;
    drawElements.startBtn.innerText = 'เริ่มการสุ่ม!';
});
async function runSingleDrawAnimation(winner) {
    const shuffle = setInterval(() => {
        const rand = allEmployees[Math.floor(Math.random() * allEmployees.length)];
        drawElements.slotName.innerText = `${rand.first_name} ${rand.last_name}`;
        drawElements.slotId.innerText = rand.employee_id;
    }, 50);
    await new Promise(res => setTimeout(res, 3000));
    clearInterval(shuffle);
    drawElements.slotName.innerText = `${winner.first_name} ${winner.last_name}`;
    drawElements.slotId.innerText = winner.employee_id;
    const prizes = Array.from(drawElements.prizeList.querySelectorAll('li')).map(li => li.innerText);
    const prize = prizes[currentWinnerIndex];
    drawElements.winnersContainer.classList.remove('d-none');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<span>${prize}</span>: <span class="winner-name">${winner.first_name} ${winner.last_name}</span> (รหัส: ${winner.employee_id})`;
    drawElements.winnersList.appendChild(li);
    showWinnerPopup(winner, prize);
}
function updatePrizeDisplay() {
    const prizes = Array.from(drawElements.prizeList.querySelectorAll('li'));
    prizes.forEach(li => li.classList.remove('drawing-now'));
    if (currentWinnerIndex < prizes.length) {
        prizes[currentWinnerIndex].classList.add('drawing-now');
        drawElements.currentPrize.innerText = prizes[currentWinnerIndex].innerText;
    }
}
function showWinnerPopup(winner, prize) {
    drawElements.modalPrize.innerText = prize;
    drawElements.modalWinner.innerText = `${winner.first_name} ${winner.last_name}`;
    drawElements.modalId.innerText = `(รหัส: ${winner.employee_id})`;
    drawElements.modal.show();
}

const voteElements = {
    form: document.getElementById('voteForm'),
    employeeId: document.getElementById('voteEmployeeId'),
    candidateList: document.getElementById('candidate-list'),
    resultsBtn: document.getElementById('viewVoteResultsBtn'),
    resultsContainer: document.getElementById('vote-results-container'),
    resultsList: document.getElementById('vote-results-list')
};
async function showVotePage() {
    navigateTo(voteSection);
    await loadCandidates();
    voteElements.resultsContainer.classList.add('d-none');
}
async function loadCandidates() {
    try {
        const res = await fetch(`${API_BASE_URL}/candidates`);
        const result = await res.json();
        voteElements.candidateList.innerHTML = '';
        if (res.ok) {
            result.data.forEach(c => {
                voteElements.candidateList.innerHTML += `<div class="form-check"><input class="form-check-input" type="radio" name="candidate" id="c-${c.id}" value="${c.id}" required><label class="form-check-label" for="c-${c.id}"><div class="d-flex justify-content-between align-items-center"><div><div class="candidate-name">${c.name}</div><div class="candidate-dept">${c.department}</div></div></div></label></div>`;
            });
        }
    } catch (err) { displayError('ไม่สามารถโหลดรายชื่อผู้เข้าประกวด'); }
}
voteElements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const selected = document.querySelector('input[name="candidate"]:checked');
    if (!selected) { displayError('กรุณาเลือกผู้เข้าประกวด'); return; }
    try {
        const res = await fetch(`${API_BASE_URL}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeId: voteElements.employeeId.value, candidateId: selected.value }),
        });
        const result = await res.json();
        if (res.ok) {
            alert('โหวตสำเร็จ!');
            await loadVoteResults();
        } else { displayError(result.error); }
    } catch (err) { displayError('ไม่สามารถส่งผลโหวตได้'); }
});
voteElements.resultsBtn.addEventListener('click', loadVoteResults);
async function loadVoteResults() {
    try {
        const res = await fetch(`${API_BASE_URL}/results`);
        const result = await res.json();
        if (res.ok) {
            voteElements.resultsList.innerHTML = result.data.map(c => `<li class="list-group-item"><span>${c.name} (${c.department})</span><span class="badge bg-primary rounded-pill">${c.votes} คะแนน</span></li>`).join('');
            voteElements.resultsContainer.classList.remove('d-none');
        }
    } catch (err) { displayError('ไม่สามารถโหลดผลโหวตได้'); }
}