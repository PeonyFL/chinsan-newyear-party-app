// --- API Base URL ---
const API_BASE_URL = "https://chinsanparty-backend.onrender.com"; // เปลี่ยนเป็น URL ของคุณ

// --- Translations ---
const translations = {
    en: {
        page_title: "Chinsan New Year Party 2026", role_selection_title: "Please Select Your Role", employee_button: "Employee (New Year)",
        main_title: "Chinsan New Year Party 2026", main_subtitle: "Enter Employee ID to Login",
        form_firstname: "First Name", form_lastname: "Last Name", form_department: "Department", form_employee_id: "Password (Employee ID)",
        register_button: "Register", forgot_qr_link: "Forgot QR Code? / Find QR Code", search_button: "Search",
        back_to_register_link: "Back to Registration", save_qr_instruction: "Please save this QR Code for event entry.",
        back_to_main_button: "Back to Main", save_qr_button: "Save QR Code", admin_modal_title: "For Admin",
        admin_modal_password_label: "Please enter password", login_button: "Login", error_title: "Error",
        winner_modal_title: "🎉 Congratulations! 🎉", winner_modal_subtitle: "The lucky winner for the prize", close_button: "Close",
        export_modal_title: "Select Data to Export", export_modal_subtitle: "Please select the data you wish to export to an Excel file.",
        export_option_employees: "All Registered Employees List", export_option_winners: "Lucky Draw Winners List", export_option_votes: "Contest Voting Results",
        cancel_button: "Cancel", confirm_export_button: "Confirm Export", admin_actions: "Admin Actions",
        view_employees_button: "View List", draw_prize_button: "Draw Prizes", checkin_button: "Check-in", vote_button: "Vote",
        export_excel_button: "Export Data to Excel", employee_list_title: "Registered Employees List",
        draw_title: "Lucky Draw", prize_list_title: "Prizes List", start_draw_button: "Start Drawing!", drawing_for_prize: "Drawing for:",
        slot_name_placeholder: "Name-Lastname", slot_id_placeholder: "Employee ID", draw_next_button: "Draw Next Prize!", reset_draw_button: "Start New Draw",
        winners_list_title: "🎉 Lucky Winners 🎉", checkin_title: "Event Check-in", checkin_form_label: "Enter Employee ID", checkin_form_button: "Check",
        vote_title: "Contest Voting", vote_subtitle: "Select your favorite candidate", vote_form_id: "Your Employee ID", vote_submit_button: "Submit Vote",
        view_vote_results_button: "View Latest Results", vote_results_title: "Latest Vote Results",
        table_header_manage: "Actions", delete_button: "Delete", delete_confirm_title: "Confirm Deletion", delete_confirm_text: "Are you sure you want to delete this registration?",
        sportday_button: "Sport Day Registration",
        sportday_title: "Sport Day Registration",
        sportday_subtitle: "Enter Employee ID to confirm participation",
        sportday_register_button: "Confirm Participation",
        back_to_role_selection: "Back to Main Menu",
        table_header_sportday_status: "Sport Day Status",
        back_to_admin_menu: "Back to Admin Menu",
        sportday_admin_button: "Sport Day Reg.",
        draw_time_label: "Draw Time (seconds)",
        draw_count_label: "Prizes (this round)",
        draw_next_button: "Draw Now!",
        vote_manage_title: "Voting Settings",
        vote_status_loading: "Loading status...",
        vote_status_closed: "Status: Voting Closed",
        vote_duration_label: "Duration (minutes)",
        vote_start_button: "Start Voting",
        vote_status_open: "Status: Voting OPEN",
        vote_close_button: "Close Voting Now",
        vote_countdown_label: "Time remaining:",
        vote_time_up: "Voting time has expired!",
        find_qr_button: "Find Employee QR",
        status_check_button: "Check Participation Status",
        status_modal_title: "Participation Status Summary",
        status_modal_subtitle: "Summary of employees at each step.",
        status_total: "Total Employees in System",
        status_new_year: "✔️ New Year Registered (Got QR)",
        status_sport_day: "✔️ Sport Day Registered",
        status_checked_in: "✔️ Checked-in to Event",
        status_all_three: "⭐ All Conditions Met (Eligible for Draw)",
        add_employee_button: "Add New Employee (Manual)",
        save_qr_line_instruction: "For LINE users: Please long-press the image and select 'Save Image'."
    },
    th: {
        page_title: "Chinsan New Year Party 2026", role_selection_title: "กรุณาเลือกบทบาทของคุณ", employee_button: "พนักงาน (งานปีใหม่)",
        main_title: "Chinsan New Year Party 2026", main_subtitle: "กรอกรหัสพนักงานเพื่อเข้าสู่ระบบ",
        form_firstname: "ชื่อจริง", form_lastname: "นามสกุล", form_department: "ฝ่าย", form_employee_id: "รหัสผ่าน (รหัสพนักงาน)",
        register_button: "ลงทะเบียน", forgot_qr_link: "ลืม QR Code? / ค้นหา QR Code", search_button: "ค้นหา",
        back_to_register_link: "กลับไปหน้าลงทะเบียน", save_qr_instruction: "กรุณาบันทึก QR Code นี้ไว้สำหรับสแกนเข้างาน",
        back_to_main_button: "กลับไปหน้าหลัก", save_qr_button: "บันทึก QR Code", admin_modal_title: "สำหรับ Admin",
        admin_modal_password_label: "กรุณากรอกรหัสผ่าน", login_button: "เข้าสู่ระบบ", error_title: "เกิดข้อผิดพลาด",
        winner_modal_title: "🎉 ขอแสดงความยินดี! 🎉", winner_modal_subtitle: "ผู้โชคดีที่ได้รับรางวัล", close_button: "ปิด",
        export_modal_title: "เลือกหัวข้อที่ต้องการ Export", export_modal_subtitle: "กรุณาเลือกข้อมูลที่ต้องการนำออกมาเป็นไฟล์ Excel",
        export_option_employees: "รายชื่อผู้ลงทะเบียนทั้งหมด", export_option_winners: "รายชื่อผู้โชคดีที่ได้รับรางวัล", export_option_votes: "ผลคะแนนโหวตการประกวด",
        cancel_button: "ยกเลิก", confirm_export_button: "ยืนยันการ Export", admin_actions: "เมนูสำหรับ Admin",
        view_employees_button: "ดูรายชื่อ", draw_prize_button: "สุ่มรางวัล", checkin_button: "เช็คอิน", vote_button: "โหวต",
        export_excel_button: "Export ข้อมูลเป็น Excel", employee_list_title: "รายชื่อผู้ลงทะเบียน",
        draw_title: "จับรางวัลผู้โชคดี", prize_list_title: "รายการของรางวัล", start_draw_button: "เริ่มการสุ่ม!", drawing_for_prize: "กำลังสุ่มรางวัล:",
        slot_name_placeholder: "ชื่อ-นามสกุล", slot_id_placeholder: "รหัสพนักงาน", draw_next_button: "สุ่มรางวัลถัดไป!", reset_draw_button: "เริ่มการสุ่มใหม่",
        winners_list_title: "🎉 รายชื่อผู้โชคดี 🎉", checkin_title: "ตรวจสอบผู้เข้าร่วมงาน", checkin_form_label: "กรอกรหัสพนักงาน", checkin_form_button: "ตรวจสอบ",
        vote_title: "โหวตการประกวด", vote_subtitle: "เลือกผู้เข้าประกวดที่คุณชื่นชอบ", vote_form_id: "รหัสพนักงานของคุณ", vote_submit_button: "ส่งคะแนนโหวต",
        view_vote_results_button: "ดูผลโหวตล่าสุด", vote_results_title: "ผลโหวตล่าสุด",
        table_header_manage: "จัดการ", delete_button: "ลบ", delete_confirm_title: "ยืนยันการลบ", delete_confirm_text: "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?",
        sportday_button: "ลงทะเบียนกีฬาสี",
        sportday_title: "ลงทะเบียนกีฬาสี",
        sportday_subtitle: "กรอกรหัสพนักงานเพื่อยืนยันการเข้าร่วม",
        sportday_register_button: "ยืนยันเข้าร่วม",
        back_to_role_selection: "กลับไปหน้าหลัก",
        table_header_sportday_status: "สถานะกีฬาสี",
        sportday_admin_button: "ลงทะเบียนกีฬาสี",
        draw_time_label: "เวลาสุ่ม (วินาที)",
        draw_count_label: "จำนวนรางวัล (รอบนี้)",
        draw_next_button: "สุ่มรางวัล!",
        vote_manage_title: "ตั้งค่าการโหวต",
        vote_status_loading: "กำลังโหลดสถานะ...",
        vote_status_closed: "สถานะ: ปิดโหวต",
        vote_duration_label: "ระยะเวลา (นาที)",
        vote_start_button: "เริ่มเปิดโหวต",
        vote_status_open: "สถานะ: เปิดโหวต",
        vote_close_button: "ปิดโหวตทันที",
        vote_countdown_label: "เวลาที่เหลือ:",
        vote_time_up: "หมดเวลาโหวตแล้ว!",
        find_qr_button: "ค้นหา QR พนักงาน",
        back_to_admin_menu: "กลับไปหน้า Admin",
        status_check_button: "สรุปสถานะการเข้าร่วม",
        status_modal_title: "สรุปสถานะการเข้าร่วม",
        status_modal_subtitle: "สรุปจำนวนพนักงานที่ดำเนินการในแต่ละขั้นตอน",
        status_total: "พนักงานทั้งหมดในระบบ",
        status_new_year: "✔️ ลงทะเบียนปีใหม่ (รับ QR)",
        status_sport_day: "✔️ ลงทะเบียนกีฬาสี",
        status_checked_in: "✔️ เช็คอินเข้างาน",
        status_all_three: "⭐ ครบทุกเงื่อนไข (มีสิทธิ์สุ่มรางวัล)",
        add_employee_button: "เพิ่มพนักงาน (กรอกเอง)",
        save_qr_line_instruction: "สำหรับผู้ใช้ LINE: กรุณากดค้างที่รูปภาพ และเลือก 'บันทึกรูปภาพ' (Save Image)"
    }
};

// ------------------------------ DOM Elements ------------------------------------
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
const realtimeResultsSection = document.getElementById('realtime-results-section');
const sportdaySection = document.getElementById('sportday-section');
const errorToastEl = document.getElementById('errorToast');
const errorToast = new bootstrap.Toast(errorToastEl);
const errorMessage = document.getElementById('errorMessage');
const successToastEl = document.getElementById('successToast');
const successToast = new bootstrap.Toast(successToastEl);
const successMessage = document.getElementById('successMessage');
const registrationForm = document.getElementById('registrationForm');
const findForm = document.getElementById('findForm');
const checkinForm = document.getElementById('checkinForm');
const voteForm = document.getElementById('voteForm');
const sportdayForm = document.getElementById('sportdayForm');
const adminActionsContainer = document.getElementById('admin-actions-container');
const adminPasswordModalEl = document.getElementById('adminPasswordModal');
const adminPasswordModal = new bootstrap.Modal(adminPasswordModalEl);
const adminPasswordForm = document.getElementById('adminPasswordForm');
const adminPasswordInput = document.getElementById('admin-password-input');
const adminPasswordError = document.getElementById('admin-password-error');
const manageVotePeriodModalEl = document.getElementById('manageVotePeriodModal');
const manageVotePeriodModal = new bootstrap.Modal(manageVotePeriodModalEl);
const voteStatusLoading = document.getElementById('vote-status-loading');
const voteStatusDisplay = document.getElementById('vote-status-display');
const voteStatusClosed = document.getElementById('vote-status-closed');
const voteStatusOpen = document.getElementById('vote-status-open');
const voteDeadlineDisplay = document.getElementById('vote-deadline-display');
const startVoteForm = document.getElementById('startVoteForm');
const voteDurationInput = document.getElementById('voteDurationInput');
const closeVoteNowBtn = document.getElementById('closeVoteNowBtn');
const voteCountdownContainer = document.getElementById('vote-countdown-container');
const voteCountdownTimer = document.getElementById('vote-countdown-timer');
const adminVoteCountdown = document.getElementById('admin-vote-countdown');
const statusCheckModalEl = document.getElementById('statusCheckModal');
const statusCheckLoading = document.getElementById('status-check-loading');
const statusCheckList = document.getElementById('status-check-list');
const allSections = [registrationSection, findSection, employeeListSection, drawSection, checkinSection, voteSection, resultDiv, realtimeResultsSection, sportdaySection];
const fullScreenSections = [employeeListSection, drawSection, voteSection, realtimeResultsSection];

// ------------------------------ GLOBAL VARIABLES ------------------------------------
let allEmployeeData = [];
let realtimeIntervalId = null;
let currentVotingEmployeeId = null;
let voteCountdownIntervalId = null;
let excludedEmployeeIds = new Set();
let adminVoteCountdownIntervalId = null;
let voteStatusPollIntervalId = null;
let isAdminLoggedIn = false;
let returnToSection = registrationSection; // Default return path

// --- Language Switcher Logic ---
function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            if (elem.hasAttribute('placeholder') && translations[lang][key]) {
                elem.placeholder = translations[lang][key];
            } else {
                elem.innerText = translations[lang][key];
            }
        }
    });
    langThBtn.classList.toggle('active', lang === 'th');
    langEnBtn.classList.toggle('active', lang === 'en');
}
langThBtn.addEventListener('click', () => setLanguage('th'));
langEnBtn.addEventListener('click', () => setLanguage('en'));

document.addEventListener('DOMContentLoaded', async () => {
    const savedLang = localStorage.getItem('language') || 'th';
    setLanguage(savedLang);

    if (window.location.hash === '#vote' || window.location.hash === '#newyear') {
        await showEmployeeView();
    }
    else if (window.location.hash === '#sportday') {
        showSportdayView();
    }
});

window.addEventListener('hashchange', async () => {
    if (window.location.hash === '#vote' || window.location.hash === '#newyear') {
        await showEmployeeView();
    }
    else if (window.location.hash === '#sportday') {
        showSportdayView();
    }
});

// --- Navigation ---
document.getElementById('select-employee-btn').addEventListener('click', showEmployeeView);
document.getElementById('select-admin-btn').addEventListener('click', () => adminPasswordModal.show());

// จัดการปุ่ม "ค้นหา QR Code" ในหน้าพนักงาน
document.getElementById('showFindFormLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('backFromFindBtn').classList.remove('d-none');
    document.getElementById('backFromFindBtn').innerText = "กลับไปหน้าลงทะเบียน"; // เปลี่ยน text ให้เข้าใจง่าย
    navigateTo(findSection);
});

// จัดการปุ่ม "ย้อนกลับ" จากหน้าค้นหา (แยก logic ระหว่าง Admin กับ Employee)
document.getElementById('backFromFindBtn').addEventListener('click', () => {
    if (isAdminLoggedIn) {
        // Admin: กลับไปหน้า Registration ที่มีเมนู Admin
        registrationForm.classList.add('d-none');
        adminActionsContainer.classList.remove('d-none');
        navigateTo(registrationSection);
    } else {
        // Employee: กลับไปหน้า Registration Form
        registrationForm.classList.remove('d-none');
        adminActionsContainer.classList.add('d-none');
        navigateTo(registrationSection);
    }
});

document.getElementById('showFindQrPageBtn').addEventListener('click', () => {
    // ปุ่มนี้มาจาก Admin Menu
    document.getElementById('backFromFindBtn').classList.remove('d-none');
    navigateTo(findSection);
});

// --- Employee Status Check Logic ---
const employeeStatusModal = new bootstrap.Modal(document.getElementById('employeeStatusModal'));
document.getElementById('check-my-status-btn').addEventListener('click', () => {
    document.getElementById('checkMyStatusForm').reset();
    document.getElementById('my-status-result').classList.add('d-none');
    employeeStatusModal.show();
});
document.getElementById('check-status-btn-employee').addEventListener('click', () => {
    document.getElementById('checkMyStatusForm').reset();
    document.getElementById('my-status-result').classList.add('d-none');
    employeeStatusModal.show();
});

document.getElementById('checkMyStatusForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const empId = document.getElementById('myStatusEmployeeId').value.trim();
    if (!empId) return;

    const loading = document.getElementById('my-status-loading');
    const resultDiv = document.getElementById('my-status-result');
    loading.classList.remove('d-none');
    resultDiv.classList.add('d-none');

    try {
        const res = await fetch(`${API_BASE_URL}/employee-status/${empId}`);
        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "ไม่พบข้อมูล");

        const { data, employee } = result;
        document.getElementById('my-status-name').innerText = `${employee.first_name} ${employee.last_name}`;

        const setStatus = (id, valid) => {
            const el = document.getElementById(id);
            el.innerHTML = valid
                ? '<span class="badge bg-success rounded-pill"><i class="fa-solid fa-check"></i> เรียบร้อย</span>'
                : '<span class="badge bg-secondary rounded-pill"><i class="fa-solid fa-times"></i> ยังไม่ทำ</span>';
        };

        setStatus('my-status-newyear', data.registered_new_year);
        setStatus('my-status-sportday', data.registered_sport_day);
        setStatus('my-status-checkin', data.checked_in);

        const prizeEl = document.getElementById('my-status-prize');
        prizeEl.innerHTML = data.eligible_for_prize
            ? '<span class="badge bg-success rounded-pill">🎉 มีสิทธิ์ลุ้นรางวัล</span>'
            : '<span class="badge bg-danger rounded-pill">❌ ยังไม่มีสิทธิ์</span>';

        resultDiv.classList.remove('d-none');
    } catch (err) {
        displayError(err.message);
    } finally {
        loading.classList.add('d-none');
    }
});

// Status Check Modal Logic
statusCheckModalEl.addEventListener('show.bs.modal', async () => {
    statusCheckLoading.classList.remove('d-none');
    statusCheckList.classList.add('d-none');
    try {
        const res = await fetch(`${API_BASE_URL}/employees/status-summary`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to load summary");
        document.getElementById('status-total').innerText = result.data.total;
        document.getElementById('status-new-year').innerText = result.data.new_year;
        document.getElementById('status-sport-day').innerText = result.data.sport_day;
        document.getElementById('status-checked-in').innerText = result.data.checked_in;
        document.getElementById('status-all-three').innerText = result.data.all_three;
        statusCheckLoading.classList.add('d-none');
        statusCheckList.classList.remove('d-none');
    } catch (err) {
        displayError(`ไม่สามารถโหลดสรุปสถานะได้: ${err.message}`);
        bootstrap.Modal.getInstance(statusCheckModalEl).hide();
    }
});

document.getElementById('showAddEmployeeFormBtn').addEventListener('click', () => {
    registrationForm.classList.toggle('d-none');
    // Show additional fields for Admin Manual Add
    if (!registrationForm.classList.contains('d-none')) {
        document.getElementById('additional-info-fields').classList.remove('d-none');
    }
});
document.getElementById('showSportdayPageBtnAdmin').addEventListener('click', () => {
    showSportdayView();
});

// Manage Vote Period Logic
manageVotePeriodModalEl.addEventListener('show.bs.modal', loadVoteStatus);
manageVotePeriodModalEl.addEventListener('hide.bs.modal', () => {
    if (adminVoteCountdownIntervalId) {
        clearInterval(adminVoteCountdownIntervalId);
        adminVoteCountdownIntervalId = null;
    }
});

async function loadVoteStatus() {
    voteStatusLoading.classList.remove('d-none');
    voteStatusDisplay.classList.add('d-none');
    voteStatusClosed.classList.add('d-none');
    voteStatusOpen.classList.add('d-none');

    try {
        const res = await fetch(`${API_BASE_URL}/vote-status`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || `Error ${res.status}`);

        if (result.is_open) {
            const deadline = new Date(result.deadline);
            voteDeadlineDisplay.innerText = `ปิดโหวตเวลา ${deadline.toLocaleString('th-TH')}`;
            voteStatusOpen.classList.remove('d-none');
            startAdminCountdown(result.deadline);
        } else {
            voteStatusClosed.classList.remove('d-none');
            if (adminVoteCountdownIntervalId) {
                clearInterval(adminVoteCountdownIntervalId);
                adminVoteCountdownIntervalId = null;
            }
        }
    } catch (err) {
        displayError(`ไม่สามารถโหลดสถานะการโหวตได้: ${err.message}`);
        manageVotePeriodModal.hide();
    } finally {
        voteStatusLoading.classList.add('d-none');
        voteStatusDisplay.classList.remove('d-none');
    }
}

startVoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const duration = voteDurationInput.value;
    if (!confirm("ยืนยันการเริ่มโหวต?")) return;
    try {
        const res = await fetch(`${API_BASE_URL}/vote/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ durationInMinutes: duration })
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || `Error ${res.status}`);
        displaySuccess(result.message);
        await loadVoteStatus();
    } catch (err) {
        displayError(err.message);
    }
});

closeVoteNowBtn.addEventListener('click', async () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการ 'ปิดโหวต' ทันที?")) {
        try {
            const res = await fetch(`${API_BASE_URL}/vote/close`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || `Error ${res.status}`);
            displaySuccess(result.message);
            await loadVoteStatus();
        } catch (err) {
            displayError(err.message);
        }
    }
});

// Sport Day Navigation
document.getElementById('select-sportday-btn').addEventListener('click', () => {
    isAdminLoggedIn = false;
    showSportdayView();
});
document.getElementById('backFromSportdayBtn').addEventListener('click', () => {
    if (isAdminLoggedIn) {
        adminActionsContainer.classList.remove('d-none');
        navigateTo(registrationSection);
    } else {
        appSections.classList.add('d-none');
        roleSelectionSection.classList.remove('d-none');
        mainCard.classList.remove('fullscreen');
        allSections.forEach(sec => sec.classList.add('d-none'));
    }
});

function showSportdayView() {
    roleSelectionSection.classList.add('d-none');
    appSections.classList.remove('d-none');
    adminActionsContainer.classList.add('d-none');
    document.getElementById('sportdayResultContainer').classList.add('d-none');
    sportdayForm.reset();
    navigateTo(sportdaySection);
}

document.getElementById('backToFormBtn').addEventListener('click', () => {
    navigateTo(returnToSection);
});
document.getElementById('viewEmployeesBtn').addEventListener('click', showEmployeeList);
document.getElementById('backFromListBtn').addEventListener('click', () => navigateTo(registrationSection));
document.getElementById('showDrawPageBtn').addEventListener('click', showDrawPage);
document.getElementById('backFromDrawBtn').addEventListener('click', () => navigateTo(registrationSection));
document.getElementById('showCheckinPageBtn').addEventListener('click', () => navigateTo(checkinSection));
document.getElementById('backFromCheckinBtn').addEventListener('click', () => navigateTo(registrationSection));
document.getElementById('showVotePageBtn').addEventListener('click', showVotePage);
document.getElementById('backFromVoteBtn').addEventListener('click', () => navigateTo(registrationSection));
document.getElementById('confirm-export-btn').addEventListener('click', exportToExcel);
document.getElementById('saveQrBtn').addEventListener('click', () => {
    // Detect LINE In-App Browser
    const isLine = /Line/i.test(navigator.userAgent);
    if (isLine) {
        const currentLang = localStorage.getItem('language') || 'th';
        alert(translations[currentLang].save_qr_line_instruction);
        return;
    }

    const qrImg = document.querySelector('#qrCodeContainer img');
    if (qrImg) {
        const employeeId = qrImg.dataset.employeeId || 'event_qr';
        const link = document.createElement('a');
        link.href = qrImg.src;
        link.download = `QRCode_${employeeId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});
document.getElementById('showRealtimeResultsBtn').addEventListener('click', showRealtimeResultsPage);
document.getElementById('backFromRealtimeBtn').addEventListener('click', () => {
    if (realtimeIntervalId) { clearInterval(realtimeIntervalId); realtimeIntervalId = null; }
    navigateTo(registrationSection);
});
document.getElementById('managePrizesBtnAdmin').addEventListener('click', () => {
    const prizeModalInstance = bootstrap.Modal.getOrCreateInstance(prizeModalEl);
    prizeModalInstance.show();
});

function navigateTo(sectionToShow) {
    // Stop Polling if leaving Realtime Page
    if (realtimeIntervalId && sectionToShow !== realtimeResultsSection) {
        clearInterval(realtimeIntervalId);
        realtimeIntervalId = null;
    }
    // Stop Status Polling if leaving Vote Page (for safety)
    if (voteStatusPollIntervalId && sectionToShow !== voteSection) {
        clearInterval(voteStatusPollIntervalId);
        voteStatusPollIntervalId = null;
    }
    if (voteCountdownIntervalId && sectionToShow !== voteSection) {
        clearInterval(voteCountdownIntervalId);
        voteCountdownIntervalId = null;
    }

    allSections.forEach(sec => sec.classList.add('d-none'));
    sectionToShow.classList.remove('d-none');
    mainHeaderContainer.classList.toggle('d-none', sectionToShow !== registrationSection && sectionToShow !== findSection);
    mainCard.classList.toggle('fullscreen', fullScreenSections.includes(sectionToShow));

    if (sectionToShow === findSection) {
        document.getElementById('backFromFindBtn').classList.toggle('d-none', !isAdminLoggedIn && !document.getElementById('backFromFindBtn').classList.contains('always-show'));
    }

    if (sectionToShow === registrationSection) {
        // Toggle elements based on Login state
        registrationForm.classList.toggle('d-none', isAdminLoggedIn);
        adminActionsContainer.classList.toggle('d-none', !isAdminLoggedIn);
    }
    if (sectionToShow !== voteSection) {
        resetVotePageUI();
    }
}
function displayError(message) { errorMessage.innerText = message || 'เกิดข้อผิดพลาดบางอย่าง'; errorToast.show(); }
function displaySuccess(message) { successMessage.innerText = message || 'ดำเนินการสำเร็จ'; successToast.show(); }

async function showEmployeeView() {
    isAdminLoggedIn = false;
    roleSelectionSection.classList.add('d-none');
    appSections.classList.remove('d-none');
    adminActionsContainer.classList.add('d-none');

    document.getElementById('backFromFindBtn').classList.add('d-none');

    if (window.location.hash === '#vote') {
        await showVotePage();
    } else {
        // Ensure inputs are hidden for normal user
        document.getElementById('additional-info-fields').classList.add('d-none');
        navigateTo(registrationSection); // เปลี่ยน Default เป็นหน้าลงทะเบียน
    }
}

function showAdminView() {
    roleSelectionSection.classList.add('d-none');
    appSections.classList.remove('d-none');
    adminActionsContainer.classList.remove('d-none');
    registrationForm.classList.add('d-none');
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
        isAdminLoggedIn = true;
        showAdminView();
    } else {
        adminPasswordError.innerText = 'รหัสผ่านไม่ถูกต้อง';
    }
});

// --- Main Application Logic ---

registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const employeeData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        department: document.getElementById('department').value,
        employeeId: document.getElementById('employeeId').value.toUpperCase(),
        isAdmin: isAdminLoggedIn
    };

    // Set return path before navigating away or on success
    returnToSection = registrationSection;

    try {
        const res = await fetch(`${API_BASE_URL}/add-employee`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        const result = await res.json();

        if (res.ok) {
            if (isAdminLoggedIn) {
                // กรณี Admin: ให้แจ้งเตือนสำเร็จเฉยๆ (ไม่เปลี่ยนหน้า)
                displaySuccess("ลงทะเบียนสำเร็จเรียบร้อย");
                registrationForm.reset();
            } else {
                // กรณี User ทั่วไป: ให้เด้งไปหน้าแสดง QR Code
                navigateTo(resultDiv);

                // Show User Info
                const userData = result.data;
                const welcomeMsg = translations[localStorage.getItem('language') || 'th'].welcome_message || "ยินดีต้อนรับ";

                document.getElementById('resultMessage').innerHTML = `
                    ${welcomeMsg} <br>
                    <span class="text-primary display-6 fw-bold">${userData.first_name} ${userData.last_name}</span><br>
                    <small class="text-muted">${userData.department}</small>
                `;
                document.getElementById('resultMessage').classList.remove('text-warning');
                document.getElementById('resultMessage').classList.add('text-success');

                document.getElementById('qrCodeContainer').innerHTML = `
                    <img src="${result.data.qrCode}" class="img-fluid" alt="QR Code" data-employee-id="${result.data.employeeId}">
                `;
                registrationForm.reset();
            }

        } else if (res.status === 409) {
            let msg = "รหัสพนักงานนี้ ลงทะเบียนไปแล้ว";
            if (result.registeredAt) {
                const dateObj = new Date(result.registeredAt);
                const dateStr = dateObj.toLocaleString('th-TH', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                });
                msg += `\n(เมื่อ: ${dateStr})`;
            }
            // Show in result div instead of error toast
            // Show in result div instead of error toast
            navigateTo(resultDiv);
            document.getElementById('resultMessage').innerText = msg; // InnerText handles \n as line break in some containers, but innerHTML with <br> is safer if needed. using innerText with CSS white-space: pre-wrap; is better. But standard h4 might ignore \n.
            // Using innerHTML for safety
            document.getElementById('resultMessage').innerHTML = msg.replace(/\n/g, '<br>');

            document.getElementById('resultMessage').classList.remove('text-success');
            document.getElementById('resultMessage').classList.add('text-warning');
            document.getElementById('qrCodeContainer').innerHTML = '<div class="text-warning py-3"><i class="fa-solid fa-clock-rotate-left fa-3x"></i></div>';
            registrationForm.reset();
        } else {
            displayError(result.error);
        }
    } catch (err) {
        displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
});

findForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const employeeId = document.getElementById('findEmployeeId').value.toUpperCase();
    if (!employeeId) return;
    returnToSection = findSection; // Set return path
    try { const res = await fetch(`${API_BASE_URL}/find/${employeeId}`); const data = await res.json(); if (res.ok) { navigateTo(resultDiv); document.getElementById('resultMessage').innerText = data.message; document.getElementById('qrCodeContainer').innerHTML = `<img src="${data.data.qrCode}" class="img-fluid" alt="QR Code" data-employee-id="${data.data.employeeId}">`; } else { displayError(data.error); } } catch (err) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); }
});
checkinForm.addEventListener('submit', async (e) => { e.preventDefault(); const employeeId = document.getElementById('checkinEmployeeId').value.toUpperCase(); if (!employeeId) return; try { const response = await fetch(`${API_BASE_URL}/checkin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ employeeId }) }); const result = await response.json(); const container = document.getElementById('checkinResultContainer'); container.classList.remove('d-none'); if (response.ok) { container.innerHTML = `<div class="alert alert-success d-flex align-items-center"><div class="status-icon me-3">✔️</div><div><h4 class="alert-heading">เช็คอินสำเร็จ</h4><p class="mb-0"><strong>ชื่อ:</strong> ${result.data.first_name} ${result.data.last_name}</p><p class="mb-0"><strong>ฝ่าย:</strong> ${result.data.department}</p><p class="mb-0"><strong>รหัสพนักงาน:</strong> ${result.data.employee_id}</p></div></div>`; } else if (response.status === 409) { const checkinTime = new Date(result.data.checkin_time).toLocaleString('th-TH'); container.innerHTML = `<div class="alert alert-warning d-flex align-items-center"><div class="status-icon me-3">⚠️</div><div><h4 class="alert-heading">เช็คอินไปแล้ว</h4><p class="mb-0"><strong>ชื่อ:</strong> ${result.data.first_name} ${result.data.last_name}</p><p class="mb-0"><strong>ฝ่าย:</strong> ${result.data.department}</p><p class="mb-0"><strong>เวลาที่เช็คอิน:</strong> ${checkinTime}</p></div></div>`; } else { container.innerHTML = `<div class="alert alert-danger d-flex align-items-center"><div class="status-icon me-3">❌</div><div><h4 class="alert-heading">ไม่พบข้อมูล</h4><p class="mb-0">กรุณาตรวจสอบรหัสพนักงานอีกครั้ง</p></div></div>`; } } catch (error) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); } checkinForm.reset(); });

async function fetchAndRenderEmployees() {
    try {
        const res = await fetch(`${API_BASE_URL}/employees`);
        const result = await res.json();
        if (res.ok) {
            allEmployeeData = result.data;
            const searchTerm = document.getElementById('employeeSearchInput').value.toLowerCase().trim();
            let dataToRender;
            if (searchTerm) {
                dataToRender = allEmployeeData.filter(emp =>
                    emp.first_name.toLowerCase().includes(searchTerm) ||
                    emp.last_name.toLowerCase().includes(searchTerm) ||
                    emp.employee_id.toLowerCase().includes(searchTerm) ||
                    (emp.department && emp.department.toLowerCase().includes(searchTerm))
                );
            } else {
                dataToRender = allEmployeeData;
            }
            renderEmployeeTable(dataToRender);
        }
    } catch (err) {
        console.error("Failed to fetch employees:", err.message);
    }
}
async function showEmployeeList() {
    navigateTo(employeeListSection);
    document.getElementById('employeeSearchInput').value = '';
    await fetchAndRenderEmployees();
}
function renderEmployeeTable(dataToRender) {
    const container = document.getElementById('employeeTableContainer');
    document.getElementById('employee-count-badge').innerText = `${dataToRender.length} คน`;
    if (dataToRender.length === 0) {
        container.innerHTML = '<p class="text-center">ไม่พบข้อมูล</p>';
        return;
    }
    const tableHeader = `<table class="table table-striped table-hover"><thead class="table-light"><tr>
        <th>ชื่อ</th>
        <th>นามสกุล</th>
        <th>ฝ่าย</th>
        <th>รหัสพนักงาน</th>
        <th>ยืนยันลงทะเบียน</th>
        <th>สถานะเช็คอิน</th>
        <th data-key="table_header_sportday_status">สถานะกีฬาสี</th> <th data-key="table_header_manage">จัดการ</th>
        </tr></thead><tbody>`;
    const tableBody = dataToRender.map(emp => `<tr>
        <td>${emp.first_name}</td>
        <td>${emp.last_name}</td>
        <td>${emp.department || '-'}</td>
        <td>${emp.employee_id}</td>
        <td>${emp.registration_time ? `✔️ <small>${new Date(emp.registration_time).toLocaleString('th-TH')}</small>` : '❌'}</td>
        <td>${emp.checked_in ? `✔️ <small>${new Date(emp.checkin_time).toLocaleString('th-TH')}</small>` : '❌'}</td>
        <td>${emp.sport_day_registered ? `✔️ <small>${new Date(emp.sport_day_reg_time).toLocaleString('th-TH')}</small>` : '❌'}</td>
        <td><button class="btn btn-danger btn-sm delete-btn" data-id="${emp.id}" data-key="delete_button">ลบ</button></td>
        </tr>`).join('');

    container.innerHTML = tableHeader + tableBody + '</tbody></table>';
    const currentLang = localStorage.getItem('language') || 'th';
    document.querySelectorAll('[data-key="delete_button"]').forEach(elem => {
        elem.innerText = translations[currentLang]['delete_button'];
    });
    document.querySelector('[data-key="table_header_manage"]').innerText = translations[currentLang]['table_header_manage'];
    const sportDayHeader = document.querySelector('[data-key="table_header_sportday_status"]');
    if (sportDayHeader) {
        sportDayHeader.innerText = translations[currentLang]['table_header_sportday_status'];
    }
}
document.getElementById('employeeSearchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    if (!allEmployeeData) return;
    const filteredData = allEmployeeData.filter(emp =>
        emp.first_name.toLowerCase().includes(searchTerm) ||
        emp.last_name.toLowerCase().includes(searchTerm) ||
        emp.employee_id.toLowerCase().includes(searchTerm) ||
        (emp.department && emp.department.toLowerCase().includes(searchTerm))
    );
    renderEmployeeTable(filteredData);
});
document.getElementById('employeeTableContainer').addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const employeeId = e.target.dataset.id;
        const currentLang = localStorage.getItem('language') || 'th';
        if (confirm(translations[currentLang].delete_confirm_text)) {
            try {
                const res = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                });
                const result = await res.json();
                if (res.ok) {
                    displaySuccess('ลบข้อมูลสำเร็จ');
                    showEmployeeList();
                } else {
                    displayError(result.error);
                }
            } catch (err) {
                displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
            }
        }
    }
});

document.getElementById('deleteAllEmployeesBtn').addEventListener('click', async () => {
    const currentLang = localStorage.getItem('language') || 'th';
    if (!confirm(translations[currentLang].delete_confirm_text + " (ข้อมูล *ทั้งหมด* รวมถึงผลโหวต)")) {
        return;
    }
    const adminPassword = prompt("นี่คือการลบข้อมูลพนักงาน *ทั้งหมด* และรีเซ็ตผลโหวต กรุณากรอกรหัสผ่าน Admin เพื่อยืนยัน:");
    if (adminPassword) {
        try {
            const res = await fetch(`${API_BASE_URL}/employees/all`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminPassword: adminPassword })
            });
            const result = await res.json();
            if (res.ok) {
                displaySuccess(result.message);
                showEmployeeList();
            } else {
                displayError(result.error);
            }
        } catch (err) {
            displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        }
    }
});

// --- Prize Draw Logic ---
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
    modalId: document.getElementById('modal-winner-id'),
    waiveBtn: document.getElementById('waiveWinnerBtn'),
    drawTimeInput: document.getElementById('drawTimeInput'),
    drawCountInput: document.getElementById('drawCountInput')
};
let allWinners = [], allEmployees = [], currentWinnerIndex = 0;
async function loadPrizesToDisplay() {
    try {
        const res = await fetch(`${API_BASE_URL}/prizes`);
        const result = await res.json();
        if (res.ok) {
            drawElements.prizeList.innerHTML = result.data
                .map(prize => `<li class="list-group-item">${prize.name}</li>`)
                .join('') || '<li class="list-group-item text-muted">ยังไม่มีรางวัล</li>';
        } else {
            drawElements.prizeList.innerHTML = `<li class="list-group-item text-danger">${result.error || 'Failed to load prizes'}</li>`;
        }
    } catch (err) {
        drawElements.prizeList.innerHTML = `<li class="list-group-item text-danger">ไม่สามารถโหลดรางวัลได้</li>`;
    }
}
async function showDrawPage() {
    navigateTo(drawSection);
    drawElements.setup.classList.remove('d-none');
    drawElements.animationArea.classList.add('d-none');
    drawElements.winnersContainer.classList.add('d-none');
    drawElements.startBtn.disabled = false;
    drawElements.startBtn.innerText = translations[localStorage.getItem('language') || 'th']['start_draw_button'];
    await loadPrizesToDisplay();
    // Check for saved state
    const savedState = localStorage.getItem('drawState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            if (state.winners && state.employees && state.winnerIndex !== undefined && state.winnerIndex < state.winners.length) {
                // Restore state
                allWinners = state.winners;
                allEmployees = state.employees;
                currentWinnerIndex = state.winnerIndex;
                if (state.excluded) {
                    excludedEmployeeIds = new Set(state.excluded);
                } else {
                    excludedEmployeeIds = new Set();
                }

                drawElements.setup.classList.add('d-none');
                drawElements.animationArea.classList.remove('d-none');
                drawElements.winnersList.innerHTML = '';
                drawElements.winnersContainer.classList.add('d-none'); // Hide initially, show if needed logic below?

                // Re-render previous winners
                if (currentWinnerIndex > 0) {
                    drawElements.winnersContainer.classList.remove('d-none');
                    const prizes = Array.from(drawElements.prizeList.querySelectorAll('li')).map(li => li.innerText);
                    for (let i = 0; i < currentWinnerIndex; i++) {
                        const w = allWinners[i];
                        const p = prizes[i];
                        const li = createWinnerListItem(w, p || 'รางวัลพิเศษ', i);
                        drawElements.winnersList.appendChild(li);
                    }
                }

                drawElements.nextBtn.disabled = false;
                drawElements.nextBtn.classList.remove('d-none');
                drawElements.resetBtn.classList.add('d-none');
                updatePrizeDisplay();
                return; // Skip default setup
            }
        } catch (e) {
            console.error("Error parsing saved state", e);
            localStorage.removeItem('drawState');
        }
    }
}
drawElements.startBtn.addEventListener('click', setupNewDraw);
async function setupNewDraw() {
    drawElements.startBtn.disabled = true;
    drawElements.startBtn.innerText = 'กำลังเตรียมข้อมูล...';
    try {
        await loadPrizesToDisplay();
        const [winRes, empRes] = await Promise.all([
            fetch(`${API_BASE_URL}/draw`),
            fetch(`${API_BASE_URL}/employees`)
        ]);
        if (!winRes.ok) throw new Error((await winRes.json()).error);
        if (!empRes.ok) throw new Error((await empRes.json()).error);
        allWinners = (await winRes.json()).data;
        allEmployees = (await empRes.json()).data;
        if (allEmployees.length === 0) throw new Error('ยังไม่มีข้อมูลพนักงาน');
        currentWinnerIndex = 0;
        excludedEmployeeIds.clear();
        drawElements.setup.classList.add('d-none');
        drawElements.animationArea.classList.remove('d-none');
        drawElements.winnersList.innerHTML = '';
        drawElements.winnersContainer.classList.add('d-none');
        drawElements.nextBtn.disabled = false;
        drawElements.nextBtn.classList.remove('d-none');
        drawElements.resetBtn.classList.add('d-none');
        updatePrizeDisplay();
        saveDrawState(); // Save initial state
    } catch (err) {
        displayError(err.message);
        drawElements.startBtn.disabled = false;
        drawElements.startBtn.innerText = translations[localStorage.getItem('language') || 'th']['start_draw_button'];
    }
}
drawElements.nextBtn.addEventListener('click', async () => {
    const count = parseInt(drawElements.drawCountInput.value) || 1;
    const time = (parseInt(drawElements.drawTimeInput.value) || 3) * 1000;
    if (currentWinnerIndex >= allWinners.length) return;
    drawElements.nextBtn.disabled = true;
    for (let i = 0; i < count; i++) {
        if (currentWinnerIndex >= allWinners.length) {
            drawElements.currentPrize.innerText = "จับรางวัลครบแล้ว!";
            break;
        }

        // Logic 2 & 3: Check eligibility before drawing
        // If the current scheduled winner is already a winner OR excluded, find a replacement.
        let candidate = allWinners[currentWinnerIndex];
        const pastWinners = allWinners.slice(0, currentWinnerIndex);
        const isAlreadyWinner = pastWinners.some(w => w.employee_id === candidate.employee_id);
        const isExcluded = excludedEmployeeIds.has(candidate.employee_id);

        if (isAlreadyWinner || isExcluded) {
            // Find replacement
            // Criteria: Checked In AND Sport Day AND Reg AND Not Already Winner AND Not Excluded
            const eligiblePool = allEmployees.filter(e =>
                e.checked_in && e.sport_day_registered && e.registration_time &&
                !pastWinners.some(w => w.employee_id === e.employee_id) &&
                !excludedEmployeeIds.has(e.employee_id)
            );

            if (eligiblePool.length === 0) {
                // No one left! Stop drawing.
                drawElements.currentPrize.innerText = "ผู้มีสิทธิ์รับรางวัลหมดแล้ว!";
                drawElements.nextBtn.disabled = true;
                drawElements.resetBtn.classList.remove('d-none');

                // If we are mid-loop (conceptually), we basically stop here.
                // We shouldn't increment currentWinnerIndex if we didn't draw.
                // But the UI needs to show we are done.
                // Let's break and ensure the 'allTokens' logic ends.
                currentWinnerIndex = allWinners.length; // Force end state
                break;
            }

            // Pick random replacement
            const newWinner = eligiblePool[Math.floor(Math.random() * eligiblePool.length)];
            allWinners[currentWinnerIndex] = newWinner;
            candidate = newWinner;
        }

        updatePrizeDisplay();
        const winner = allWinners[currentWinnerIndex];
        await runSingleDrawAnimation(winner, time);
        currentWinnerIndex++;
        saveDrawState(); // Save progress
    }
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
    localStorage.removeItem('drawState');
    showDrawPage();
});
function saveDrawState() {
    const state = {
        winners: allWinners,
        employees: allEmployees,
        winnerIndex: currentWinnerIndex,
        excluded: Array.from(excludedEmployeeIds)
    };
    localStorage.setItem('drawState', JSON.stringify(state));
}
async function runSingleDrawAnimation(winner, animationTime) {
    const shuffle = setInterval(() => {
        const rand = allEmployees[Math.floor(Math.random() * allEmployees.length)];
        drawElements.slotName.innerText = `${rand.first_name} ${rand.last_name}`;
        drawElements.slotId.innerText = rand.employee_id;
    }, 50);
    await new Promise(res => setTimeout(res, animationTime));
    clearInterval(shuffle);
    drawElements.slotName.innerText = `${winner.first_name} ${winner.last_name}`;
    drawElements.slotId.innerText = winner.employee_id;
    const prizes = Array.from(drawElements.prizeList.querySelectorAll('li')).map(li => li.innerText);
    const prize = prizes[currentWinnerIndex];
    drawElements.winnersContainer.classList.remove('d-none');
    const li = createWinnerListItem(winner, prize || 'รางวัลพิเศษ', currentWinnerIndex);
    drawElements.winnersList.appendChild(li);
    showWinnerPopup(winner, prize || 'รางวัลพิเศษ');
}

function createWinnerListItem(winner, prizeName, index) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <div>
            <span class="fw-bold text-primary">${prizeName}</span>: 
            <span class="winner-name">${winner.first_name} ${winner.last_name}</span> 
            <small class="text-muted">(รหัส: ${winner.employee_id})</small>
        </div>
        <button class="btn btn-sm btn-outline-danger waive-winner-btn" data-index="${index}">สละสิทธิ์</button>
    `;
    return li;
}

drawElements.winnersList.addEventListener('click', (e) => {
    if (e.target.classList.contains('waive-winner-btn')) {
        const index = parseInt(e.target.dataset.index);
        if (confirm("ยืนยันการสละสิทธิ์สำหรับผู้โชคดีท่านนี้? (ระบบจะสุ่มคนใหม่มาแทนทันที)")) {
            waiveWinnerAtIndex(index);
        }
    }
});

async function waiveWinnerAtIndex(index) {
    const winner = allWinners[index];
    if (!winner) return;

    // Add to excluded
    excludedEmployeeIds.add(winner.employee_id);

    // Find Replacement
    // Exclude current winners (active ones) minus the one we are removing? 
    // Actually, 'allWinners' contains everyone scheduled. 
    // We should look at who is 'active' up to currentWinnerIndex.
    // AND we must ensure we don't pick someone who is *already* a winner in another slot (unlikely if unique, but safe to check).

    // We only care about replacing THIS slot.
    // The pool is: Everyone eligible MINUS (Winners[0..currentWinnerIndex-1] excluding 'index') MINUS Excluded

    // Note: If we are replacing a past winner, 'currentWinnerIndex' might be far ahead.
    // We should strictly look at "Currently Active Winners" being the list of people who hold prizes.
    // That is basically 'allWinners[0...currentWinnerIndex-1]'.

    const activeWinners = allWinners.slice(0, currentWinnerIndex).filter((_, i) => i !== index);

    const eligible = allEmployees.filter(e =>
        e.checked_in && e.sport_day_registered && e.registration_time &&
        !activeWinners.find(w => w.employee_id === e.employee_id) &&
        !excludedEmployeeIds.has(e.employee_id)
    );

    if (eligible.length === 0) {
        alert("ไม่เหลือพนักงานที่มีสิทธิ์รับรางวัลแล้ว!");
        // Revert exclusion?
        excludedEmployeeIds.delete(winner.employee_id);
        return;
    }

    const newWinner = eligible[Math.floor(Math.random() * eligible.length)];
    allWinners[index] = newWinner;

    // Update DOM
    // Re-render the specific item
    const prizes = Array.from(drawElements.prizeList.querySelectorAll('li')).map(li => li.innerText); // Re-read prizes to be safe (or pass it in?)
    // Prize name might be tricky if we don't have it easily. 
    // But we know the index corresponds to 'prizes[index]' usually.
    // Let's grab the prize name from valid source.
    const prizeName = prizes[index] || 'รางวัลพิเศษ';

    // Find the LI
    const items = drawElements.winnersList.querySelectorAll('li');
    if (items[index]) {
        const newLi = createWinnerListItem(newWinner, prizeName, index);
        drawElements.winnersList.replaceChild(newLi, items[index]);
    }

    saveDrawState();
    displaySuccess(`เปลี่ยนผู้โชคดีเป็น: ${newWinner.first_name} ${newWinner.last_name}`);
}
drawElements.waiveBtn.addEventListener('click', waiveCurrentWinner);

async function waiveCurrentWinner() {
    if (currentWinnerIndex <= 0) return; // Should not happen if modal is open usually
    const waivedIdx = currentWinnerIndex - 1;

    // 1. Fetch Latest Employees to ensure status is up-to-date
    drawElements.waiveBtn.disabled = true;
    drawElements.waiveBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> กำลังดึงข้อมูล...';
    try {
        const empRes = await fetch(`${API_BASE_URL}/employees`);
        if (empRes.ok) {
            allEmployees = (await empRes.json()).data;
        }
    } catch (e) {
        console.error("Failed to refresh employees:", e);
    } finally {
        drawElements.waiveBtn.innerText = 'สละสิทธิ์แล้วสุ่มใหม่';
        drawElements.waiveBtn.disabled = false;
    }

    // 2. Filter eligible candidates who are NOT already winners (up to this point) AND not excluded
    // Logic 1: Pick new regardless of prize count (just need SOMEONE eligible)
    // Criteria: Checked In AND Sport Day Registered AND Registration != null
    // AND Not in *Active* Winners (0 to currentWinnerIndex-1, excluding the slot we are waiving)
    // NOTE: passing 'candidate' who is scheduled for a FUTURE slot is OK (we catch them later).

    // Add current to excluded
    const currentWinner = allWinners[waivedIdx];
    excludedEmployeeIds.add(currentWinner.employee_id);

    const activeWinners = allWinners.slice(0, currentWinnerIndex).filter((_, i) => i !== waivedIdx);

    const eligible = allEmployees.filter(e =>
        e.checked_in && e.sport_day_registered && e.registration_time &&
        !activeWinners.find(w => w.employee_id === e.employee_id) &&
        !excludedEmployeeIds.has(e.employee_id)
    );

    if (eligible.length === 0) {
        alert(`ไม่มีพนักงานที่มีสิทธิ์รับรางวัลเหลือแล้ว`);
        // We added to excluded, but we can't replace.
        // Revert exclusion? Or leave it empty?
        // User implied "Stop".
        // Let's revert the exclusion so they stay as the 'winner' on UI or nullify?
        // Current UI shows them. If we return, nothing changes.
        excludedEmployeeIds.delete(currentWinner.employee_id);
        return;
    }

    const newWinner = eligible[Math.floor(Math.random() * eligible.length)];

    // Update data
    allWinners[waivedIdx] = newWinner;

    // Decrease index to "re-draw" this slot
    currentWinnerIndex--;

    // Update UI
    if (drawElements.winnersList.lastElementChild) {
        drawElements.winnersList.removeChild(drawElements.winnersList.lastElementChild);
    }
    drawElements.modal.hide();

    // Trigger immediate redraw
    const time = (parseInt(drawElements.drawTimeInput.value) || 3) * 1000;
    updatePrizeDisplay(); // Highlight current prize

    // Disable controls
    drawElements.nextBtn.disabled = true;

    await runSingleDrawAnimation(newWinner, time);

    // Advance index and save state
    currentWinnerIndex++;
    saveDrawState();

    drawElements.nextBtn.disabled = false;
}

function updatePrizeDisplay() { const prizes = Array.from(drawElements.prizeList.querySelectorAll('li')); prizes.forEach(li => li.classList.remove('drawing-now')); if (currentWinnerIndex < prizes.length) { prizes[currentWinnerIndex].classList.add('drawing-now'); drawElements.currentPrize.innerText = prizes[currentWinnerIndex].innerText; } }
function showWinnerPopup(winner, prize) { drawElements.modalPrize.innerText = prize; drawElements.modalWinner.innerText = `${winner.first_name} ${winner.last_name}`; drawElements.modalId.innerText = `(รหัส: ${winner.employee_id})`; drawElements.modal.show(); }

// --- Prize Management ---
const prizeModalEl = document.getElementById('managePrizesModal');
const prizeModalInstance = bootstrap.Modal.getOrCreateInstance(prizeModalEl);
const prizeListContainer = document.getElementById('prize-management-list');
const addPrizeForm = document.getElementById('addPrizeForm');
const newPrizeNameInput = document.getElementById('newPrizeNameInput');
const resetPrizesBtn = document.getElementById('resetPrizesBtn');
prizeModalEl.addEventListener('show.bs.modal', loadPrizesToManager);
async function loadPrizesToManager() {
    try {
        const res = await fetch(`${API_BASE_URL}/prizes`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error);
        prizeListContainer.innerHTML = result.data.map(prize => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="prize-name">${prize.name}</span>
                <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm btn-edit-prize" data-id="${prize.id}" data-name="${prize.name}">แก้ไข</button>
                    <button class="btn btn-outline-danger btn-sm btn-delete-prize" data-id="${prize.id}">ลบ</button>
                </div>
            </li>
        `).join('') || '<li class="list-group-item text-muted">ยังไม่มีรางวัล</li>';
    } catch (err) {
        prizeListContainer.innerHTML = `<li class="list-group-item text-danger">${err.message}</li>`;
    }
}
prizeListContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-delete-prize')) {
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรางวัลนี้?")) await deletePrize(e.target.dataset.id);
    }
    if (e.target.classList.contains('btn-edit-prize')) {
        const newName = prompt("แก้ไขชื่อรางวัล:", e.target.dataset.name);
        if (newName && newName !== e.target.dataset.name) {
            if (confirm("ยืนยันการแก้ไข?")) await editPrize(e.target.dataset.id, newName);
        }
    }
});
addPrizeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newName = newPrizeNameInput.value.trim();
    if (!newName) return;
    if (!confirm("ยืนยันการเพิ่มรางวัล?")) return;
    await addPrize(newName);
    newPrizeNameInput.value = '';
});
resetPrizesBtn.addEventListener('click', async () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรางวัลทั้งหมด และรีเซ็ตเป็นค่าเริ่มต้น?")) {
        try {
            const res = await fetch(`${API_BASE_URL}/prizes/reset`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
            if (res.ok) { displaySuccess('รีเซ็ตสำเร็จ'); await loadPrizesToManager(); } else throw new Error((await res.json()).error);
        } catch (err) { displayError(err.message); }
    }
});
async function addPrize(name) { try { await fetch(`${API_BASE_URL}/prizes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) }); displaySuccess('เพิ่มสำเร็จ'); await loadPrizesToManager(); } catch (e) { displayError(e.message); } }
async function editPrize(id, name) { try { await fetch(`${API_BASE_URL}/prizes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) }); displaySuccess('แก้ไขสำเร็จ'); await loadPrizesToManager(); } catch (e) { displayError(e.message); } }
async function deletePrize(id) { try { await fetch(`${API_BASE_URL}/prizes/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }); displaySuccess('ลบสำเร็จ'); await loadPrizesToManager(); } catch (e) { displayError(e.message); } }

// --- Vote Logic ---
const voteElements = {
    form: document.getElementById('voteForm'),
    employeeIdInput: document.getElementById('voteEmployeeId'),
    candidateList: document.getElementById('candidate-list'),
    resultsBtn: document.getElementById('viewVoteResultsBtn'),
    resultsContainer: document.getElementById('vote-results-container'),
    resultsList: document.getElementById('vote-results-list'),
    eligibilityCheckDiv: document.getElementById('vote-eligibility-check'),
    checkEligibilityBtn: document.getElementById('checkVoteEligibilityBtn'),
    eligibilityMessage: document.getElementById('voteEligibilityMessage'),
    mainVoteArea: document.getElementById('vote-main-area'),
    voteUserMessage: document.getElementById('voteUserMessage')
};

function resetVotePageUI() {
    if (voteCountdownIntervalId) { clearInterval(voteCountdownIntervalId); voteCountdownIntervalId = null; }
    if (voteStatusPollIntervalId) { clearInterval(voteStatusPollIntervalId); voteStatusPollIntervalId = null; }
    if (voteCountdownContainer) {
        voteCountdownContainer.classList.add('d-none');
        voteCountdownContainer.classList.remove('alert-danger');
        voteCountdownContainer.classList.add('alert-info');
    }
    const timeUpMsg = document.getElementById('vote-time-up-msg');
    if (timeUpMsg) timeUpMsg.remove();
    voteElements.form.classList.remove('d-none');
    voteElements.eligibilityCheckDiv.classList.remove('d-none');
    voteElements.mainVoteArea.classList.add('d-none');
    voteElements.employeeIdInput.value = '';
    voteElements.employeeIdInput.disabled = false;
    voteElements.eligibilityMessage.innerText = '';
    voteElements.candidateList.innerHTML = '';
    voteElements.resultsContainer.classList.add('d-none');
    currentVotingEmployeeId = null;
    voteElements.form.reset();
    voteElements.checkEligibilityBtn.disabled = false;
    voteElements.checkEligibilityBtn.innerText = 'ตรวจสอบสิทธิ์';
}

async function showVotePage() {
    navigateTo(voteSection);
    const backBtn = document.getElementById('backFromVoteBtn');

    // Check status ONCE (Safe for users)
    if (window.location.hash === '#vote') {
        backBtn.classList.add('d-none');
        try {
            const res = await fetch(`${API_BASE_URL}/vote-status`);
            const result = await res.json();
            if (!result.is_open) {
                const lang = localStorage.getItem('language') || 'th';
                voteElements.eligibilityMessage.innerText = translations[lang]['vote_status_closed'];
                voteElements.eligibilityMessage.classList.remove('d-none');
                voteElements.eligibilityCheckDiv.classList.add('d-none');
            } else {
                voteElements.eligibilityMessage.classList.add('d-none');
                voteElements.eligibilityCheckDiv.classList.remove('d-none');
            }
        } catch (err) {
            voteElements.eligibilityMessage.innerText = `Error: ${err.message}`;
        }
    } else {
        backBtn.classList.remove('d-none');
        voteElements.eligibilityCheckDiv.classList.remove('d-none');
    }
}

voteElements.checkEligibilityBtn.addEventListener('click', async () => {
    const employeeId = voteElements.employeeIdInput.value.toUpperCase();
    if (!employeeId) { voteElements.eligibilityMessage.innerText = 'กรุณากรอกรหัสพนักงาน'; return; }
    voteElements.eligibilityMessage.innerText = '';
    voteElements.checkEligibilityBtn.disabled = true;
    voteElements.checkEligibilityBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> กำลังตรวจสอบ...';
    try {
        const res = await fetch(`${API_BASE_URL}/check-vote-eligibility/${employeeId}`);
        const result = await res.json();
        if (res.ok && result.status === 'eligible') {
            currentVotingEmployeeId = employeeId;
            voteElements.eligibilityCheckDiv.classList.add('d-none');
            voteElements.voteUserMessage.innerText = `รหัสพนักงาน: ${employeeId} (${result.message})`;
            voteElements.mainVoteArea.classList.remove('d-none');
            await loadCandidatesForVoting();
            if (result.deadline) startVoteCountdown(result.deadline);
        } else {
            voteElements.eligibilityMessage.innerText = result.message || `Error ${res.status}`;
        }
    } catch (err) {
        voteElements.eligibilityMessage.innerText = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้';
    } finally {
        voteElements.checkEligibilityBtn.disabled = false;
        voteElements.checkEligibilityBtn.innerText = 'ตรวจสอบสิทธิ์';
    }
});

async function loadCandidatesForVoting() {
    try {
        const res = await fetch(`${API_BASE_URL}/candidates`);
        const result = await res.json();
        voteElements.candidateList.innerHTML = '';
        if (res.ok) {
            const sortedCandidates = result.data.sort((a, b) => a.name.localeCompare(b.name, 'th'));
            sortedCandidates.forEach(c => {
                voteElements.candidateList.innerHTML += `<div class="form-check"><input class="form-check-input" type="radio" name="candidate" id="c-${c.id}" value="${c.id}" required><label class="form-check-label" for="c-${c.id}"><div class="d-flex justify-content-between align-items-center"><div><div class="candidate-name">${c.name}</div><div class="candidate-dept">${c.department}</div></div></div></label></div>`;
            });
        }
    } catch (err) {
        displayError(`Failed to load candidates: ${err.message}`);
    }
}

voteElements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const selected = document.querySelector('input[name="candidate"]:checked');
    if (!selected) { displayError('กรุณาเลือกผู้เข้าประกวด'); return; }
    if (!currentVotingEmployeeId) { displayError('ไม่พบรหัสพนักงาน'); resetVotePageUI(); return; }

    const submitButton = voteElements.form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> กำลังส่ง...';
    try {
        const res = await fetch(`${API_BASE_URL}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeId: currentVotingEmployeeId, candidateId: selected.value }),
        });
        const result = await res.json();
        if (res.ok) {
            displaySuccess('โหวตสำเร็จ!');
            resetVotePageUI();
        } else {
            displayError(result.error || 'ไม่สามารถส่งผลโหวตได้');
            if (res.status !== 409) resetVotePageUI();
        }
    } catch (err) {
        displayError(`Error: ${err.message}`);
        resetVotePageUI();
    } finally {
        submitButton.disabled = false;
        submitButton.innerText = 'ส่งคะแนนโหวต';
    }
});

voteElements.resultsBtn.addEventListener('click', loadVoteResults);
async function loadVoteResults() {
    try {
        const res = await fetch(`${API_BASE_URL}/results`);
        const result = await res.json();
        if (res.ok) {
            voteElements.resultsList.innerHTML = result.data.map(c => `<li class="list-group-item"><span>${c.name} (${c.department})</span><span class="badge bg-primary rounded-pill">${c.votes} คะแนน</span></li>`).join('') || '<li class="list-group-item text-muted">ยังไม่มีผลโหวต</li>';
            voteElements.resultsContainer.classList.remove('d-none');
        }
    } catch (err) {
        displayError(`Error loading results: ${err.message}`);
    }
}

function startVoteCountdown(deadlineISO) {
    if (voteCountdownIntervalId) clearInterval(voteCountdownIntervalId);
    const deadline = new Date(deadlineISO).getTime();
    voteCountdownContainer.classList.remove('d-none');
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = deadline - now;
        if (distance <= 0) {
            clearInterval(voteCountdownIntervalId);
            voteCountdownIntervalId = null;
            voteCountdownTimer.innerText = "00:00";
            voteCountdownContainer.classList.remove('alert-info');
            voteCountdownContainer.classList.add('alert-danger');
            voteElements.form.classList.add('d-none');
            let timeUpMsg = document.getElementById('vote-time-up-msg');
            if (!timeUpMsg) {
                timeUpMsg = document.createElement('div');
                timeUpMsg.id = 'vote-time-up-msg';
                timeUpMsg.className = 'alert alert-danger';
                const lang = localStorage.getItem('language') || 'th';
                timeUpMsg.innerText = translations[lang]['vote_time_up'];
                voteElements.mainVoteArea.appendChild(timeUpMsg);
            }
        } else {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            voteCountdownTimer.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            voteCountdownContainer.classList.remove('alert-danger');
            voteCountdownContainer.classList.add('alert-info');
        }
    };
    updateTimer();
    voteCountdownIntervalId = setInterval(updateTimer, 1000);
}

function startAdminCountdown(deadlineISO) {
    if (adminVoteCountdownIntervalId) clearInterval(adminVoteCountdownIntervalId);
    const deadline = new Date(deadlineISO).getTime();
    const updateAdminTimer = () => {
        const now = new Date().getTime();
        const distance = deadline - now;
        if (distance <= 0) {
            clearInterval(adminVoteCountdownIntervalId);
            adminVoteCountdownIntervalId = null;
            if (adminVoteCountdown) adminVoteCountdown.innerText = "00:00";
            const modalInstance = bootstrap.Modal.getInstance(manageVotePeriodModalEl);
            if (modalInstance && modalInstance._isShown) loadVoteStatus();
        } else {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (adminVoteCountdown) adminVoteCountdown.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    };
    updateAdminTimer();
    adminVoteCountdownIntervalId = setInterval(updateAdminTimer, 1000);
}

// --- Candidate Management ---
const candidateModalEl = document.getElementById('manageCandidatesModal');
const candidateListContainer = document.getElementById('candidate-management-list');
const addCandidateForm = document.getElementById('addCandidateForm');
const newCandidateNameInput = document.getElementById('newCandidateNameInput');
const newCandidateDeptInput = document.getElementById('newCandidateDeptInput');
const resetCandidatesBtn = document.getElementById('resetCandidatesBtn');
candidateModalEl.addEventListener('show.bs.modal', loadCandidatesToManager);

async function loadCandidatesToManager() {
    try {
        const res = await fetch(`${API_BASE_URL}/candidates`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.error);
        const sortedCandidates = result.data.sort((a, b) => a.name.localeCompare(b.name, 'th'));
        candidateListContainer.innerHTML = sortedCandidates.map(c => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div><span class="fw-bold">${c.name}</span><small class="text-muted d-block">${c.department}</small></div>
                <div class="d-flex align-items-center">
                    <span class="badge bg-primary rounded-pill me-3">${c.votes} คะแนน</span>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm btn-edit-candidate" data-id="${c.id}" data-name="${c.name}" data-dept="${c.department}">แก้ไข</button>
                        <button class="btn btn-outline-danger btn-sm btn-delete-candidate" data-id="${c.id}">ลบ</button>
                    </div>
                </div>
            </li>
        `).join('') || '<li class="list-group-item text-muted">ยังไม่มีผู้เข้าประกวด</li>';
    } catch (err) {
        candidateListContainer.innerHTML = `<li class="list-group-item text-danger">${err.message}</li>`;
    }
}
candidateListContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-delete-candidate')) {
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้เข้าประกวดนี้?")) await deleteCandidate(e.target.dataset.id);
    }
    if (e.target.classList.contains('btn-edit-candidate')) {
        const newName = prompt("แก้ไขชื่อ:", e.target.dataset.name);
        const newDept = prompt("แก้ไขฝ่าย:", e.target.dataset.dept);
        if (newName && newDept && confirm("ยืนยันการแก้ไข?")) await editCandidate(e.target.dataset.id, newName.trim(), newDept.trim());
    }
});
addCandidateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!confirm("ยืนยันการเพิ่ม?")) return;
    await addCandidate(newCandidateNameInput.value.trim(), newCandidateDeptInput.value.trim());
    newCandidateNameInput.value = ''; newCandidateDeptInput.value = '';
});
resetCandidatesBtn.addEventListener('click', async () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบและรีเซ็ตทั้งหมด?")) {
        try { await fetch(`${API_BASE_URL}/candidates/reset`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }); displaySuccess('รีเซ็ตสำเร็จ'); await loadCandidatesToManager(); } catch (e) { displayError(e.message); }
    }
});
async function addCandidate(name, department) { try { await fetch(`${API_BASE_URL}/candidates`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, department }) }); displaySuccess('สำเร็จ'); await loadCandidatesToManager(); } catch (e) { displayError(e.message); } }
async function editCandidate(id, name, department) { try { await fetch(`${API_BASE_URL}/candidates/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, department }) }); displaySuccess('สำเร็จ'); await loadCandidatesToManager(); } catch (e) { displayError(e.message); } }
async function deleteCandidate(id) { try { await fetch(`${API_BASE_URL}/candidates/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }); displaySuccess('สำเร็จ'); await loadCandidatesToManager(); } catch (e) { displayError(e.message); } }

// --- Real-time Results (Admin Only - Enabled Polling) ---
const realtimeContainer = document.getElementById('realtime-candidates-container');
const totalVotesSpan = document.getElementById('totalVotes');

function showRealtimeResultsPage() {
    navigateTo(realtimeResultsSection);
    fetchAndDisplayRealtimeResults();

    // ✅ ENABLED: เปิด Auto-Refresh เฉพาะหน้านี้ เพราะมีแค่ Admin ดู
    if (!realtimeIntervalId) {
        realtimeIntervalId = setInterval(fetchAndDisplayRealtimeResults, 3000); // ทุก 3 วินาที
    }
}

async function fetchAndDisplayRealtimeResults() {
    try {
        const res = await fetch(`${API_BASE_URL}/results`);
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้');
        const result = await res.json();
        const candidates = result.data;
        const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
        totalVotesSpan.innerText = totalVotes;
        realtimeContainer.innerHTML = candidates.map(c => {
            const percentage = totalVotes === 0 ? 0 : ((c.votes / totalVotes) * 100).toFixed(1);
            return `
                <div class="candidate-result-item">
                    <div class="candidate-info">
                        <div><span class="candidate-name">${c.name}</span> <span class="candidate-dept">(${c.department})</span></div>
                        <span class="candidate-votes">${c.votes} คะแนน</span>
                    </div>
                    <div class="progress" role="progressbar"><div class="progress-bar" style="width: ${percentage}%">${percentage}%</div></div>
                </div>`;
        }).join('') || '<p class="text-center text-muted">ยังไม่มีคะแนนโหวต</p>';
    } catch (err) {
        realtimeContainer.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        if (realtimeIntervalId) { clearInterval(realtimeIntervalId); realtimeIntervalId = null; }
    }
}

// --- Export & Upload ---
async function exportToExcel() {
    const btn = document.getElementById('confirm-export-btn');
    btn.disabled = true;
    try {
        const exportEmployees = document.getElementById('export-employees-check').checked;
        const exportWinners = document.getElementById('export-winners-check').checked;
        const exportVotes = document.getElementById('export-votes-check').checked;
        const promises = [];
        if (exportEmployees) promises.push(fetch(`${API_BASE_URL}/employees`).then(res => res.json()));
        if (exportWinners) { promises.push(fetch(`${API_BASE_URL}/draw`).then(res => res.json().catch(() => ({ data: [] })))); promises.push(fetch(`${API_BASE_URL}/prizes`).then(res => res.json())); }
        if (exportVotes) promises.push(fetch(`${API_BASE_URL}/results`).then(res => res.json()));

        const results = await Promise.all(promises);
        const wb = XLSX.utils.book_new();
        let i = 0;
        if (exportEmployees) {
            const d = results[i++].data;
            if (d) {
                const sheet = XLSX.utils.json_to_sheet(d.map(e => ({
                    'รหัส': e.employee_id,
                    'ชื่อ': e.first_name,
                    'สกุล': e.last_name,
                    'ฝ่าย': e.department,
                    'ยืนยันลงทะเบียน': e.registration_time ? '✔️ ลงแล้ว' : '❌',
                    'สถานะเช็คอิน': e.checked_in ? '✔️ มาแล้ว' : '❌',
                    'Sport Day Status': e.sport_day_registered ? '✔️ ลงแล้ว' : '❌'
                })));
                XLSX.utils.book_append_sheet(wb, sheet, "Employees");
            }
        }
        if (exportWinners) {
            const w = results[i++].data; const p = results[i++].data.map(x => x.name);
            if (w && p) {
                const sheet = XLSX.utils.json_to_sheet(w.map((e, idx) => ({ 'รางวัล': p[idx] || 'Prize', 'ผู้รับ': e.first_name + ' ' + e.last_name, 'รหัสพนักงาน': e.employee_id })));
                XLSX.utils.book_append_sheet(wb, sheet, "Winners");
            }
        }
        if (exportVotes) {
            const v = results[i++].data;
            if (v) {
                const sheet = XLSX.utils.json_to_sheet(v.map(c => ({ 'ชื่อ': c.name, 'คะแนน': c.votes })));
                XLSX.utils.book_append_sheet(wb, sheet, "Votes");
            }
        }
        XLSX.writeFile(wb, "Party_Data.xlsx");
        bootstrap.Modal.getInstance(document.getElementById('exportExcelModal')).hide();
    } catch (e) { displayError(e.message); } finally { btn.disabled = false; }
}

document.getElementById('uploadEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!confirm("ยืนยันการอัปโหลด?")) return;
    const formData = new FormData(); formData.append('employeeFile', document.getElementById('employeeFile').files[0]);
    try {
        const res = await fetch(`${API_BASE_URL}/upload-employees`, { method: 'POST', body: formData });
        const r = await res.json();
        if (res.ok) { displaySuccess(r.message); } else { displayError(r.error); }
    } catch (e) { displayError(e.message); }
});

// Sport Day Register
sportdayForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const employeeId = document.getElementById('sportdayEmployeeId').value.toUpperCase();
    if (!employeeId) return;
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    try {
        const response = await fetch(`${API_BASE_URL}/sportday-register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ employeeId }) });
        const result = await response.json();
        const container = document.getElementById('sportdayResultContainer');
        container.classList.remove('d-none');
        if (response.ok) {
            container.innerHTML = `<div class="alert alert-success">✔️ <strong>${result.message}</strong><br>ชื่อ: ${result.data.first_name} ${result.data.last_name}</div>`;
            sportdayForm.reset();
        } else {
            container.innerHTML = `<div class="alert alert-danger">❌ <strong>${result.error}</strong></div>`;
        }
    } catch (error) {
        displayError('Connection Error');
    } finally {
        submitButton.disabled = false;
    }
});