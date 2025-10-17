const API_BASE_URL = "http://localhost:3000";

// --- Language Dictionary ---
const translations = {
    en: {
        page_title: "New Year Party Registration 2025",
        role_selection_title: "Please Select Your Role",
        employee_button: "Employee",
        main_title: "New Year Party Registration",
        main_subtitle: "Fill in your information to receive a QR Code for entry",
        form_firstname: "First Name",
        form_lastname: "Last Name",
        form_department: "Department",
        form_employee_id: "Employee ID",
        register_button: "Register",
        forgot_qr_link: "Forgot QR Code? / Find QR Code",
        search_button: "Search",
        back_to_register_link: "Back to Registration",
        save_qr_instruction: "Please save this QR Code for event entry.",
        back_to_main_button: "Back to Main",
        admin_modal_title: "For Admin",
        admin_modal_password_label: "Please enter password",
        login_button: "Login",
        error_title: "Error",
        winner_modal_title: "🎉 Congratulations! 🎉",
        winner_modal_subtitle: "The lucky winner for the prize",
        close_button: "Close",
        export_modal_title: "Select Data to Export",
        export_modal_subtitle: "Please select the data you wish to export to an Excel file.",
        export_option_employees: "All Registered Employees List",
        export_option_winners: "Lucky Draw Winners List",
        export_option_votes: "Contest Voting Results",
        cancel_button: "Cancel",
        confirm_export_button: "Confirm Export",
        admin_actions: "Admin Actions",
        view_employees_button: "View List",
        draw_prize_button: "Draw Prizes",
        checkin_button: "Check-in",
        vote_button: "Vote",
        export_excel_button: "Export Data to Excel",
        employee_list_title: "Registered Employees List",
        draw_title: "Lucky Draw",
        prize_list_title: "5 Prizes",
        start_draw_button: "Start Drawing!",
        drawing_for_prize: "Drawing for:",
        slot_name_placeholder: "Name-Lastname",
        slot_id_placeholder: "Employee ID",
        draw_next_button: "Draw Next Prize!",
        reset_draw_button: "Start New Draw",
        winners_list_title: "🎉 Lucky Winners 🎉",
        checkin_title: "Event Check-in",
        checkin_form_label: "Enter Employee ID",
        checkin_form_button: "Check",
        vote_title: "Contest Voting",
        vote_subtitle: "Enter your Employee ID and choose your favorite candidate.",
        vote_form_id: "Your Employee ID",
        vote_submit_button: "Submit Vote",
        view_vote_results_button: "View Latest Results",
        vote_results_title: "Latest Vote Results",
    },
    th: {
        page_title: "ลงทะเบียนเข้าร่วมงานปีใหม่ 2568",
        role_selection_title: "กรุณาเลือกบทบาทของคุณ",
        employee_button: "พนักงาน",
        main_title: "ลงทะเบียนเข้าร่วมงานปีใหม่",
        main_subtitle: "กรอกข้อมูลเพื่อรับ QR Code สำหรับเข้างาน",
        form_firstname: "ชื่อจริง",
        form_lastname: "นามสกุล",
        form_department: "ฝ่าย",
        form_employee_id: "รหัสพนักงาน",
        register_button: "ลงทะเบียน",
        forgot_qr_link: "ลืม QR Code? / ค้นหา QR Code",
        search_button: "ค้นหา",
        back_to_register_link: "กลับไปหน้าลงทะเบียน",
        save_qr_instruction: "กรุณาบันทึก QR Code นี้ไว้สำหรับสแกนเข้างาน",
        back_to_main_button: "กลับไปหน้าหลัก",
        admin_modal_title: "สำหรับ Admin",
        admin_modal_password_label: "กรุณากรอกรหัสผ่าน",
        login_button: "เข้าสู่ระบบ",
        error_title: "เกิดข้อผิดพลาด",
        winner_modal_title: "🎉 ขอแสดงความยินดี! 🎉",
        winner_modal_subtitle: "ผู้โชคดีที่ได้รับรางวัล",
        close_button: "ปิด",
        export_modal_title: "เลือกหัวข้อที่ต้องการ Export",
        export_modal_subtitle: "กรุณาเลือกข้อมูลที่ต้องการนำออกมาเป็นไฟล์ Excel",
        export_option_employees: "รายชื่อผู้ลงทะเบียนทั้งหมด",
        export_option_winners: "รายชื่อผู้โชคดีที่ได้รับรางวัล",
        export_option_votes: "ผลคะแนนโหวตการประกวด",
        cancel_button: "ยกเลิก",
        confirm_export_button: "ยืนยันการ Export",
        admin_actions: "เมนูสำหรับ Admin",
        view_employees_button: "ดูรายชื่อ",
        draw_prize_button: "สุ่มรางวัล",
        checkin_button: "เช็คอิน",
        vote_button: "โหวต",
        export_excel_button: "Export ข้อมูลเป็น Excel",
        employee_list_title: "รายชื่อผู้ลงทะเบียน",
        draw_title: "จับรางวัลผู้โชคดี",
        prize_list_title: "ของรางวัล 5 รายการ",
        start_draw_button: "เริ่มการสุ่ม!",
        drawing_for_prize: "กำลังสุ่มรางวัล:",
        slot_name_placeholder: "ชื่อ-นามสกุล",
        slot_id_placeholder: "รหัสพนักงาน",
        draw_next_button: "สุ่มรางวัลถัดไป!",
        reset_draw_button: "เริ่มการสุ่มใหม่",
        winners_list_title: "🎉 รายชื่อผู้โชคดี 🎉",
        checkin_title: "ตรวจสอบผู้เข้าร่วมงาน",
        checkin_form_label: "กรอกรหัสพนักงาน",
        checkin_form_button: "ตรวจสอบ",
        vote_title: "โหวตการประกวด",
        vote_subtitle: "กรอกรหัสพนักงานของคุณ และเลือกผู้เข้าประกวดที่คุณชื่นชอบ",
        vote_form_id: "รหัสพนักงานของคุณ",
        vote_submit_button: "ส่งคะแนนโหวต",
        view_vote_results_button: "ดูผลโหวตล่าสุด",
        vote_results_title: "ผลโหวตล่าสุด",
    }
};

// --- DOM Elements ---
const langThBtn = document.getElementById('lang-th-btn');
const langEnBtn = document.getElementById('lang-en-btn');
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

// --- Language Switcher Logic ---
function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            elem.innerText = translations[lang][key];
        }
    });
    langThBtn.classList.toggle('active', lang === 'th');
    langEnBtn.classList.toggle('active', lang === 'en');
}

langThBtn.addEventListener('click', () => setLanguage('th'));
langEnBtn.addEventListener('click', () => setLanguage('en'));

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'th';
    setLanguage(savedLang);
});


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
document.getElementById('confirm-export-btn').addEventListener('click', exportToExcel);

function navigateTo(sectionToShow) {
    allSections.forEach(sec => sec.classList.add('d-none'));
    sectionToShow.classList.remove('d-none');
    mainHeaderContainer.classList.toggle('d-none', sectionToShow !== registrationSection && sectionToShow !== findSection);
    mainCard.classList.toggle('fullscreen', fullScreenSections.includes(sectionToShow));
}

function displayError(message) {
    errorMessage.innerText = message || 'เกิดข้อผิดพลาดบางอย่าง';
    errorToast.show();
}

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
    const CORRECT_PASSWORD = 'admin';
    if (password === CORRECT_PASSWORD) {
        adminPasswordModal.hide();
        adminPasswordInput.value = '';
        adminPasswordError.innerText = '';
        showAdminView();
    } else {
        adminPasswordError.innerText = 'รหัสผ่านไม่ถูกต้อง';
    }
});

// --- Main Application Logic ---
registrationForm.addEventListener('submit', async (e) => { e.preventDefault(); const payload = { firstName: document.getElementById('firstName').value, lastName: document.getElementById('lastName').value, department: document.getElementById('department').value, employeeId: document.getElementById('employeeId').value.toUpperCase() }; try { const res = await fetch(`${API_BASE_URL}/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const data = await res.json(); if (res.ok) { navigateTo(resultDiv); document.getElementById('resultMessage').innerText = data.message; document.getElementById('qrCodeContainer').innerHTML = `<img src="${data.data.qrCode}" class="img-fluid" alt="QR Code">`; } else { displayError(data.error); } } catch (err) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); } });
findForm.addEventListener('submit', async (e) => { e.preventDefault(); const employeeId = document.getElementById('findEmployeeId').value.toUpperCase(); if (!employeeId) return; try { const res = await fetch(`${API_BASE_URL}/find/${employeeId}`); const data = await res.json(); if (res.ok) { navigateTo(resultDiv); document.getElementById('resultMessage').innerText = data.message; document.getElementById('qrCodeContainer').innerHTML = `<img src="${data.data.qrCode}" class="img-fluid" alt="QR Code">`; } else { displayError(data.error); } } catch (err) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); } });
checkinForm.addEventListener('submit', async (e) => { e.preventDefault(); const employeeId = document.getElementById('checkinEmployeeId').value.toUpperCase(); if (!employeeId) return; try { const response = await fetch(`${API_BASE_URL}/checkin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ employeeId }) }); const result = await response.json(); const container = document.getElementById('checkinResultContainer'); container.classList.remove('d-none'); if (response.ok) { container.innerHTML = `<div class="alert alert-success d-flex align-items-center"><div class="status-icon me-3">✔️</div><div><h4 class="alert-heading">เช็คอินสำเร็จ</h4><p class="mb-0"><strong>ชื่อ:</strong> ${result.data.firstName} ${result.data.lastName}</p><p class="mb-0"><strong>ฝ่าย:</strong> ${result.data.department}</p><p class="mb-0"><strong>รหัสพนักงาน:</strong> ${result.data.employeeId}</p></div></div>`; } else if (response.status === 409) { const checkinTime = new Date(result.data.checkin_time).toLocaleString('th-TH'); container.innerHTML = `<div class="alert alert-warning d-flex align-items-center"><div class="status-icon me-3">⚠️</div><div><h4 class="alert-heading">เช็คอินไปแล้ว</h4><p class="mb-0"><strong>ชื่อ:</strong> ${result.data.firstName} ${result.data.lastName}</p><p class="mb-0"><strong>ฝ่าย:</strong> ${result.data.department}</p><p class="mb-0"><strong>เวลาที่เช็คอิน:</strong> ${checkinTime}</p></div></div>`; } else { container.innerHTML = `<div class="alert alert-danger d-flex align-items-center"><div class="status-icon me-3">❌</div><div><h4 class="alert-heading">ไม่พบข้อมูล</h4><p class="mb-0">กรุณาตรวจสอบรหัสพนักงานอีกครั้ง</p></div></div>`; } } catch (error) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); } checkinForm.reset(); });
async function showEmployeeList() { try { const res = await fetch(`${API_BASE_URL}/employees`); const result = await res.json(); if (res.ok) { navigateTo(employeeListSection); const container = document.getElementById('employeeTableContainer'); document.getElementById('employee-count-badge').innerText = `${result.data.length} คน`; if (result.data.length === 0) { container.innerHTML = '<p class="text-center">ยังไม่มีผู้ลงทะเบียน</p>'; return; } container.innerHTML = `<table class="table table-striped table-hover"><thead class="table-light"><tr><th>ชื่อ</th><th>นามสกุล</th><th>ฝ่าย</th><th>รหัสพนักงาน</th><th>เวลาลงทะเบียน</th><th>สถานะเช็คอิน</th></tr></thead><tbody>${result.data.map(emp => `<tr><td>${emp.first_name}</td><td>${emp.last_name}</td><td>${emp.department}</td><td>${emp.employee_id}</td><td>${new Date(emp.registration_time).toLocaleString('th-TH')}</td><td>${emp.checked_in ? `✔️ <small>${new Date(emp.checkin_time).toLocaleTimeString('th-TH')}</small>` : '❌'}</td></tr>`).join('')}</tbody></table>`; } else { displayError(result.error); } } catch (err) { displayError('ไม่สามารถเชื่อมต่อได้'); } }
const drawElements = { setup: document.getElementById('draw-setup'), startBtn: document.getElementById('startDrawBtn'), nextBtn: document.getElementById('drawNextBtn'), resetBtn: document.getElementById('resetDrawBtn'), animationArea: document.getElementById('draw-animation-area'), prizeList: document.getElementById('prize-display-list'), currentPrize: document.getElementById('current-prize-drawing'), slotName: document.getElementById('slot-name'), slotId: document.getElementById('slot-id'), winnersContainer: document.getElementById('winnersListContainer'), winnersList: document.getElementById('winnersList'), modal: new bootstrap.Modal(document.getElementById('winnerModal')), modalPrize: document.getElementById('modal-prize-name'), modalWinner: document.getElementById('modal-winner-name'), modalId: document.getElementById('modal-winner-id') };
let allWinners = [], allEmployees = [], currentWinnerIndex = 0;
drawElements.startBtn.addEventListener('click', setupNewDraw);
async function setupNewDraw() { drawElements.startBtn.disabled = true; drawElements.startBtn.innerText = 'กำลังเตรียมข้อมูล...'; try { const [winRes, empRes] = await Promise.all([fetch(`${API_BASE_URL}/draw`), fetch(`${API_BASE_URL}/employees`)]); if (!winRes.ok || !empRes.ok) throw new Error((await (winRes.ok ? empRes : winRes).json()).error || 'Failed to fetch data'); allWinners = (await winRes.json()).data; allEmployees = (await empRes.json()).data; currentWinnerIndex = 0; drawElements.setup.classList.add('d-none'); drawElements.animationArea.classList.remove('d-none'); drawElements.winnersList.innerHTML = ''; drawElements.winnersContainer.classList.add('d-none'); drawElements.nextBtn.disabled = false; drawElements.nextBtn.classList.remove('d-none'); drawElements.resetBtn.classList.add('d-none'); updatePrizeDisplay(); } catch (err) { displayError(err.message); drawElements.startBtn.disabled = false; drawElements.startBtn.innerText = 'เริ่มการสุ่ม!'; } }
drawElements.nextBtn.addEventListener('click', async () => { if (currentWinnerIndex >= allWinners.length) return; drawElements.nextBtn.disabled = true; await runSingleDrawAnimation(allWinners[currentWinnerIndex]); currentWinnerIndex++; if (currentWinnerIndex < allWinners.length) { updatePrizeDisplay(); drawElements.nextBtn.disabled = false; } else { drawElements.nextBtn.classList.add('d-none'); drawElements.resetBtn.classList.remove('d-none'); drawElements.currentPrize.innerText = "จับรางวัลครบแล้ว!"; } });
drawElements.resetBtn.addEventListener('click', () => { drawElements.setup.classList.remove('d-none'); drawElements.animationArea.classList.add('d-none'); });
async function runSingleDrawAnimation(winner) { const shuffle = setInterval(() => { const rand = allEmployees[Math.floor(Math.random() * allEmployees.length)]; drawElements.slotName.innerText = `${rand.first_name} ${rand.last_name}`; drawElements.slotId.innerText = rand.employee_id; }, 50); await new Promise(res => setTimeout(res, 3000)); clearInterval(shuffle); drawElements.slotName.innerText = `${winner.first_name} ${winner.last_name}`; drawElements.slotId.innerText = winner.employee_id; const prizes = Array.from(drawElements.prizeList.querySelectorAll('li')).map(li => li.innerText); const prize = prizes[currentWinnerIndex]; drawElements.winnersContainer.classList.remove('d-none'); const li = document.createElement('li'); li.className = 'list-group-item'; li.innerHTML = `<span>${prize}</span>: <span class="winner-name">${winner.first_name} ${winner.last_name}</span> (รหัส: ${winner.employee_id})`; drawElements.winnersList.appendChild(li); showWinnerPopup(winner, prize); }
function updatePrizeDisplay() { const prizes = Array.from(drawElements.prizeList.querySelectorAll('li')); prizes.forEach(li => li.classList.remove('drawing-now')); if (currentWinnerIndex < prizes.length) { prizes[currentWinnerIndex].classList.add('drawing-now'); drawElements.currentPrize.innerText = prizes[currentWinnerIndex].innerText; } }
function showWinnerPopup(winner, prize) { drawElements.modalPrize.innerText = prize; drawElements.modalWinner.innerText = `${winner.first_name} ${winner.last_name}`; drawElements.modalId.innerText = `(รหัส: ${winner.employee_id})`; drawElements.modal.show(); }
const voteElements = { form: document.getElementById('voteForm'), employeeId: document.getElementById('voteEmployeeId'), candidateList: document.getElementById('candidate-list'), resultsBtn: document.getElementById('viewVoteResultsBtn'), resultsContainer: document.getElementById('vote-results-container'), resultsList: document.getElementById('vote-results-list') };
async function showVotePage() { navigateTo(voteSection); await loadCandidates(); voteElements.resultsContainer.classList.add('d-none'); }
async function loadCandidates() { try { const res = await fetch(`${API_BASE_URL}/candidates`); const result = await res.json(); voteElements.candidateList.innerHTML = ''; if (res.ok) { result.data.forEach(c => { voteElements.candidateList.innerHTML += `<div class="form-check"><input class="form-check-input" type="radio" name="candidate" id="c-${c.id}" value="${c.id}" required><label class="form-check-label" for="c-${c.id}"><div class="d-flex justify-content-between align-items-center"><div><div class="candidate-name">${c.name}</div><div class="candidate-dept">${c.department}</div></div></div></label></div>`; }); } } catch (err) { displayError('ไม่สามารถโหลดรายชื่อผู้เข้าประกวด'); } }
voteElements.form.addEventListener('submit', async (e) => { e.preventDefault(); const selected = document.querySelector('input[name="candidate"]:checked'); if (!selected) { displayError('กรุณาเลือกผู้เข้าประกวด'); return; } try { const res = await fetch(`${API_BASE_URL}/vote`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ employeeId: voteElements.employeeId.value, candidateId: selected.value }), }); const result = await res.json(); if (res.ok) { alert('โหวตสำเร็จ!'); await loadVoteResults(); } else { displayError(result.error); } } catch (err) { displayError('ไม่สามารถส่งผลโหวตได้'); } });
voteElements.resultsBtn.addEventListener('click', loadVoteResults);
async function loadVoteResults() { try { const res = await fetch(`${API_BASE_URL}/results`); const result = await res.json(); if (res.ok) { voteElements.resultsList.innerHTML = result.data.map(c => `<li class="list-group-item"><span>${c.name} (${c.department})</span><span class="badge bg-primary rounded-pill">${c.votes} คะแนน</span></li>`).join(''); voteElements.resultsContainer.classList.remove('d-none'); } } catch (err) { displayError('ไม่สามารถโหลดผลโหวตได้'); } }
async function exportToExcel() { const btn = document.getElementById('confirm-export-btn'); btn.disabled = true; btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> กำลังเตรียมข้อมูล...`; const exportEmployees = document.getElementById('export-employees-check').checked; const exportWinners = document.getElementById('export-winners-check').checked; const exportVotes = document.getElementById('export-votes-check').checked; if (!exportEmployees && !exportWinners && !exportVotes) { alert("กรุณาเลือกอย่างน้อย 1 หัวข้อเพื่อ Export"); btn.disabled = false; btn.innerText = 'ยืนยันการ Export'; return; } try { const promises = []; if (exportEmployees) promises.push(fetch(`${API_BASE_URL}/employees`).then(res => res.json())); if (exportWinners) promises.push(fetch(`${API_BASE_URL}/draw`).then(res => res.json())); if (exportVotes) promises.push(fetch(`${API_BASE_URL}/results`).then(res => res.json())); const results = await Promise.all(promises); const wb = XLSX.utils.book_new(); let promiseIndex = 0; if (exportEmployees) { const employeesData = results[promiseIndex++].data; const sheetData = employeesData.map(emp => ({ 'รหัสพนักงาน': emp.employee_id, 'ชื่อ': emp.first_name, 'นามสกุล': emp.last_name, 'ฝ่าย': emp.department, 'สถานะเช็คอิน': emp.checked_in ? 'เช็คอินแล้ว' : 'ยังไม่เช็คอิน', 'เวลาที่เช็คอิน': emp.checked_in ? new Date(emp.checkin_time).toLocaleString('th-TH') : '-', 'เวลาลงทะเบียน': new Date(emp.registration_time).toLocaleString('th-TH') })); const sheet = XLSX.utils.json_to_sheet(sheetData); XLSX.utils.book_append_sheet(wb, sheet, "รายชื่อผู้ลงทะเบียน"); } if (exportWinners) { const winnersData = results[promiseIndex++].data; const prizes = Array.from(drawElements.prizeList.querySelectorAll('li')).map(li => li.innerText); const sheetData = winnersData.map((winner, index) => ({ 'รางวัล': prizes[index] || `รางวัลที่ ${index + 1}`, 'ชื่อ': winner.first_name, 'นามสกุล': winner.last_name, 'ฝ่าย': winner.department, 'รหัสพนักงาน': winner.employee_id })); const sheet = XLSX.utils.json_to_sheet(sheetData); XLSX.utils.book_append_sheet(wb, sheet, "รายชื่อผู้โชคดี"); } if (exportVotes) { const resultsData = results[promiseIndex++].data; const sheetData = resultsData.map(c => ({ 'ผู้เข้าประกวด': c.name, 'ฝ่าย': c.department, 'คะแนนโหวต': c.votes })); const sheet = XLSX.utils.json_to_sheet(sheetData); XLSX.utils.book_append_sheet(wb, sheet, "ผลโหวต"); } XLSX.writeFile(wb, "Party_Event_Data.xlsx"); const exportModal = bootstrap.Modal.getInstance(document.getElementById('exportExcelModal')); exportModal.hide(); } catch (err) { displayError(err.message || "เกิดข้อผิดพลาดในการ Export ข้อมูล"); } finally { btn.disabled = false; btn.innerText = 'ยืนยันการ Export'; } }