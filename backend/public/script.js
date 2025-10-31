//
// --- API Base URL ---
//
const API_BASE_URL = "https://chinsanparty-backend.onrender.com";
//
// --- Language Dictionary ---
const translations = {
    en: {
        page_title: "Chinsan New Year Party 2025", role_selection_title: "Please Select Your Role", employee_button: "Employee (New Year)",
        main_title: "Chinsan New Year Party 2025", main_subtitle: "Fill in your information to receive a QR Code for entry",
        form_firstname: "First Name", form_lastname: "Last Name", form_department: "Department", form_employee_id: "Employee ID",
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
        draw_title: "Lucky Draw", prize_list_title: "รายการของรางวัล", start_draw_button: "Start Drawing!", drawing_for_prize: "Drawing for:",
        slot_name_placeholder: "Name-Lastname", slot_id_placeholder: "Employee ID", draw_next_button: "Draw Next Prize!", reset_draw_button: "Start New Draw",
        winners_list_title: "🎉 Lucky Winners 🎉", checkin_title: "Event Check-in", checkin_form_label: "Enter Employee ID", checkin_form_button: "Check",
        vote_title: "Contest Voting", vote_subtitle: "เลือกผู้เข้าประกวดที่คุณชื่นชอบ", vote_form_id: "Your Employee ID", vote_submit_button: "Submit Vote",
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
        add_employee_button: "Add New Employee (Manual)"
    },
    th: {
        page_title: "Chinsan New Year Party 2025", role_selection_title: "กรุณาเลือกบทบาทของคุณ", employee_button: "พนักงาน (งานปีใหม่)",
        main_title: "Chinsan New Year Party 2025", main_subtitle: "กรอกข้อมูลเพื่อรับ QR Code สำหรับเข้างาน",
        form_firstname: "ชื่อจริง", form_lastname: "นามสกุล", form_department: "ฝ่าย", form_employee_id: "รหัสพนักงาน",
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
        add_employee_button: "เพิ่มพนักงาน (กรอกเอง)"
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
// ------------------------------ DOM Elements ------------------------------------

let allEmployeeData = [];
let realtimeIntervalId = null;
let currentVotingEmployeeId = null;
let employeeListIntervalId = null;
let voteCountdownIntervalId = null;
let adminVoteCountdownIntervalId = null;
let voteStatusPollIntervalId = null;
let isAdminLoggedIn = false; // <-- (แก้ไข) ตัวแปรสำหรับจำสถานะ Admin


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

// (ใหม่) เพิ่ม Event Listener สำหรับปุ่ม "ค้นหา QR พนักงาน"
document.getElementById('showFindQrPageBtn').addEventListener('click', () => {
    // (ใหม่) แสดงปุ่ม "กลับไปหน้า Admin" (เพราะนี่คือ Admin)
    document.getElementById('backFromFindBtn').classList.remove('d-none');
    
    navigateTo(findSection); 
});

// (ใหม่) Status Check Modal Logic
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

// (ใหม่) เพิ่ม Event Listener สำหรับปุ่ม "กลับไปหน้า Admin"
document.getElementById('backFromFindBtn').addEventListener('click', () => {
    navigateTo(registrationSection); 
});
// (ใหม่) Event Listener สำหรับปุ่ม "เพิ่มพนักงาน (กรอกเอง)"
document.getElementById('showAddEmployeeFormBtn').addEventListener('click', () => {
    registrationForm.classList.toggle('d-none'); 
});

// (ใหม่) Event Listener สำหรับปุ่ม "ลงทะเบียนกีฬาสี" (Admin)
document.getElementById('showSportdayPageBtnAdmin').addEventListener('click', () => {
    showSportdayView(); 
});


// (ใหม่) Manage Vote Period Logic
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
        await loadVoteStatus(); // Refresh modal
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
            await loadVoteStatus(); // Refresh modal
        } catch (err) {
            displayError(err.message);
        }
    }
});


// --- (ใหม่) Navigation สำหรับกีฬาสี ---
document.getElementById('select-sportday-btn').addEventListener('click', () => {
    isAdminLoggedIn = false; // <-- (แก้ไข) เคลียร์สถานะ Admin
    showSportdayView(); 
});


/// (แก้ไข) Event Listener ของปุ่ม "กลับ" ในหน้ากีฬาสี
document.getElementById('backFromSportdayBtn').addEventListener('click', () => {
    // (แก้ไข) ตรวจสอบจากตัวแปร 'isAdminLoggedIn'
    if (isAdminLoggedIn) {
        // ถ้าเป็น Admin, ให้กลับไปหน้าเมนู Admin (registrationSection)

        // [ *** เพิ่มบรรทัดนี้ *** ]
        // ต้องเปิดเมนู Admin กลับมาด้วย เพราะ 'showSportdayView' ได้ซ่อนไป
        adminActionsContainer.classList.remove('d-none'); 
        
        navigateTo(registrationSection);
    } else {
        // ถ้าเป็นพนักงาน (เข้าจากปุ่มแรก), ให้กลับไปหน้าเลือก Role
        appSections.classList.add('d-none');
        roleSelectionSection.classList.remove('d-none');
        mainCard.classList.remove('fullscreen');
        allSections.forEach(sec => sec.classList.add('d-none'));
    }
});


// (ใหม่) ฟังก์ชันสำหรับเปิดหน้ากีฬาสี
function showSportdayView() {
    roleSelectionSection.classList.add('d-none');
    appSections.classList.remove('d-none');
    adminActionsContainer.classList.add('d-none');
    document.getElementById('sportdayResultContainer').classList.add('d-none'); // ซ่อนผลลัพธ์เก่า
    sportdayForm.reset(); // รีเซ็ตฟอร์ม
    navigateTo(sportdaySection);
}
// --- (จบส่วนใหม่) ---


document.getElementById('showFindFormLink').addEventListener('click', (e) => { e.preventDefault(); navigateTo(findSection); });
document.getElementById('showRegisterFormLink').addEventListener('click', (e) => { e.preventDefault(); navigateTo(registrationSection); });

// (แก้ไข) backToFormBtn (ปุ่มกลับจากหน้า QR) ให้ใช้ isAdminLoggedIn
document.getElementById('backToFormBtn').addEventListener('click', () => {
    navigateTo(isAdminLoggedIn ? registrationSection : findSection);
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
    if (realtimeIntervalId && sectionToShow !== realtimeResultsSection) { 
        clearInterval(realtimeIntervalId); 
        realtimeIntervalId = null; 
    }
    if (voteStatusPollIntervalId && sectionToShow !== voteSection) {
        clearInterval(voteStatusPollIntervalId);
        voteStatusPollIntervalId = null;
    }
    if (voteCountdownIntervalId && sectionToShow !== voteSection) {
        clearInterval(voteCountdownIntervalId);
        voteCountdownIntervalId = null;
    }
    if (employeeListIntervalId && sectionToShow !== employeeListSection) {
        clearInterval(employeeListIntervalId);
        employeeListIntervalId = null;
    }

    allSections.forEach(sec => sec.classList.add('d-none'));
    sectionToShow.classList.remove('d-none');
    mainHeaderContainer.classList.toggle('d-none', sectionToShow !== registrationSection && sectionToShow !== findSection); 
    mainCard.classList.toggle('fullscreen', fullScreenSections.includes(sectionToShow));

    // (แก้ไข) ใช้ isAdminLoggedIn ที่เราตั้งไว้
    if (sectionToShow === registrationSection) {
        registrationForm.classList.add('d-none');
         document.getElementById('managePrizesBtnAdmin').classList.toggle('d-none', !isAdminLoggedIn);
         document.getElementById('manageCandidatesBtn').classList.toggle('d-none', !isAdminLoggedIn);
         document.getElementById('showRealtimeResultsBtn').classList.toggle('d-none', !isAdminLoggedIn);
    }
    if (sectionToShow !== voteSection) {
        resetVotePageUI();
    }
}
function displayError(message) { errorMessage.innerText = message || 'เกิดข้อผิดพลาดบางอย่าง'; errorToast.show(); }
function displaySuccess(message) { successMessage.innerText = message || 'ดำเนินการสำเร็จ'; successToast.show(); }

// (แก้ไข) ลบฟังก์ชันที่ซ้อนกันออก
async function showEmployeeView() { 
    isAdminLoggedIn = false; // <-- (แก้ไข) เคลียร์สถานะ Admin
    roleSelectionSection.classList.add('d-none');
    appSections.classList.remove('d-none');
    adminActionsContainer.classList.add('d-none');

    document.getElementById('backFromFindBtn').classList.add('d-none');

    if (window.location.hash === '#vote') {
        await showVotePage(); 
    } else {
        navigateTo(findSection); 
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
        isAdminLoggedIn = true; // <-- (แก้ไข) ตั้งสถานะ Admin เป็น "จริง"
        showAdminView();
    } else {
        adminPasswordError.innerText = 'รหัสผ่านไม่ถูกต้อง';
    }
});

// --- Main Application Logic ---
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!confirm("ยืนยันการเพิ่มพนักงาน?")) return;

    const employeeData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        department: document.getElementById('department').value,
        employeeId: document.getElementById('employeeId').value.toUpperCase()
    };
    try {
        const res = await fetch(`${API_BASE_URL}/add-employee`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        const result = await res.json();
        if (res.ok) {
            displaySuccess(result.message);
            registrationForm.reset();
        } else {
            displayError(result.error);
        }
    } catch (err) {
        displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
});
findForm.addEventListener('submit', async (e) => { e.preventDefault(); const employeeId = document.getElementById('findEmployeeId').value.toUpperCase(); if (!employeeId) return; try { const res = await fetch(`${API_BASE_URL}/find/${employeeId}`); const data = await res.json(); if (res.ok) { navigateTo(resultDiv); document.getElementById('resultMessage').innerText = data.message; document.getElementById('qrCodeContainer').innerHTML = `<img src="${data.data.qrCode}" class="img-fluid" alt="QR Code" data-employee-id="${data.data.employeeId}">`; } else { displayError(data.error); } } catch (err) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); } });
checkinForm.addEventListener('submit', async (e) => { e.preventDefault(); const employeeId = document.getElementById('checkinEmployeeId').value.toUpperCase(); if (!employeeId) return; try { const response = await fetch(`${API_BASE_URL}/checkin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ employeeId }) }); const result = await response.json(); const container = document.getElementById('checkinResultContainer'); container.classList.remove('d-none'); if (response.ok) { container.innerHTML = `<div class="alert alert-success d-flex align-items-center"><div class="status-icon me-3">✔️</div><div><h4 class="alert-heading">เช็คอินสำเร็จ</h4><p class="mb-0"><strong>ชื่อ:</strong> ${result.data.firstName} ${result.data.lastName}</p><p class="mb-0"><strong>ฝ่าย:</strong> ${result.data.department}</p><p class="mb-0"><strong>รหัสพนักงาน:</strong> ${result.data.employeeId}</p></div></div>`; } else if (response.status === 409) { const checkinTime = new Date(result.data.checkin_time).toLocaleString('th-TH'); container.innerHTML = `<div class="alert alert-warning d-flex align-items-center"><div class="status-icon me-3">⚠️</div><div><h4 class="alert-heading">เช็คอินไปแล้ว</h4><p class="mb-0"><strong>ชื่อ:</strong> ${result.data.firstName} ${result.data.lastName}</p><p class="mb-0"><strong>ฝ่าย:</strong> ${result.data.department}</p><p class="mb-0"><strong>เวลาที่เช็คอิน:</strong> ${checkinTime}</p></div></div>`; } else { container.innerHTML = `<div class="alert alert-danger d-flex align-items-center"><div class="status-icon me-3">❌</div><div><h4 class="alert-heading">ไม่พบข้อมูล</h4><p class="mb-0">กรุณาตรวจสอบรหัสพนักงานอีกครั้ง</p></div></div>`; } } catch (error) { displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้'); } checkinForm.reset(); });

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
        } else {
            console.error("Failed to auto-refresh employee list:", result.error);
            if (employeeListIntervalId) {
                clearInterval(employeeListIntervalId);
                employeeListIntervalId = null;
            }
        }
    } catch (err) {
        console.error("Failed to connect for auto-refresh:", err.message);
        if (employeeListIntervalId) {
            clearInterval(employeeListIntervalId);
            employeeListIntervalId = null;
        }
    }
}
async function showEmployeeList() {
    navigateTo(employeeListSection); 
    document.getElementById('employeeSearchInput').value = ''; 
    if (employeeListIntervalId) clearInterval(employeeListIntervalId);
    await fetchAndRenderEmployees();
    employeeListIntervalId = setInterval(fetchAndRenderEmployees, 5000); 
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
        <td>${emp.checked_in ? `✔️ <small>${new Date(emp.checkin_time).toLocaleTimeString('th-TH')}</small>` : '❌'}</td>
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
        const confirmText = translations[currentLang].delete_confirm_text;
        
        if (confirm(confirmText)) {
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
                    displayError(result.error || 'เกิดข้อผิดพลาดในการลบข้อมูล');
                }
            } catch (err) {
                displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
            }
        }
    }
});

// (คงไว้) จุดเดียวที่ยังถามรหัสผ่าน
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
                displaySuccess(result.message || 'ลบข้อมูลทั้งหมดสำเร็จ');
                showEmployeeList();
            } else {
                displayError(result.error || 'เกิดข้อผิดพลาดในการลบข้อมูล');
            }
        } catch (err) {
            displayError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        }
    }
});

// --- Logic การสุ่มรางวัล (Prize Draw) ---
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
        if (!winRes.ok) { throw new Error((await winRes.json()).error || 'Failed to fetch draw data'); }
        if (!empRes.ok) { throw new Error((await empRes.json()).error || 'Failed to fetch employee data'); }
        allWinners = (await winRes.json()).data;
        allEmployees = (await empRes.json()).data;
        if (allEmployees.length === 0) { 
             throw new Error('ยังไม่มีข้อมูลพนักงานในระบบสำหรับใช้ในการสุ่ม');
        }
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
        updatePrizeDisplay(); 
        const winner = allWinners[currentWinnerIndex];
        await runSingleDrawAnimation(winner, time); 
        currentWinnerIndex++; 
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
drawElements.resetBtn.addEventListener('click', () => { showDrawPage(); });
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
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<span>${prize || 'รางวัลพิเศษ'}</span>: <span class="winner-name">${winner.first_name} ${winner.last_name}</span> (รหัส: ${winner.employee_id})`;
    drawElements.winnersList.appendChild(li);
    showWinnerPopup(winner, prize || 'รางวัลพิเศษ');
}
function updatePrizeDisplay() { const prizes = Array.from(drawElements.prizeList.querySelectorAll('li')); prizes.forEach(li => li.classList.remove('drawing-now')); if (currentWinnerIndex < prizes.length) { prizes[currentWinnerIndex].classList.add('drawing-now'); drawElements.currentPrize.innerText = prizes[currentWinnerIndex].innerText; } }
function showWinnerPopup(winner, prize) { drawElements.modalPrize.innerText = prize; drawElements.modalWinner.innerText = `${winner.first_name} ${winner.last_name}`; drawElements.modalId.innerText = `(รหัส: ${winner.employee_id})`; drawElements.modal.show(); }

// --- Logic จัดการรางวัล (Prize Management) ---
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
        if (!res.ok) throw new Error(result.error || 'Failed to load prizes');
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
        const prizeId = e.target.dataset.id;
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรางวัลนี้?")) {
            await deletePrize(prizeId);
        }
    }
    if (e.target.classList.contains('btn-edit-prize')) {
        const prizeId = e.target.dataset.id;
        const currentName = e.target.dataset.name;
        const newName = prompt("แก้ไขชื่อรางวัล:", currentName);
        if (newName && newName !== currentName) {
            if (confirm("ยืนยันการแก้ไขชื่อรางวัล?")) {
                await editPrize(prizeId, newName);
            }
        }
    }
});
addPrizeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newName = newPrizeNameInput.value.trim(); 
    if (!newName) { displayError("กรุณากรอกชื่อรางวัล"); return; }
    
    if (!confirm("ยืนยันการเพิ่มรางวัล?")) return;

    await addPrize(newName);
    newPrizeNameInput.value = '';
});
resetPrizesBtn.addEventListener('click', async () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรางวัลทั้งหมด และรีเซ็ตเป็นค่าเริ่มต้น?")) {
        try {
            const res = await fetch(`${API_BASE_URL}/prizes/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Failed to reset prizes');
            displaySuccess(result.message);
            await loadPrizesToManager();
        } catch (err) {
            displayError(err.message);
        }
    }
});
async function addPrize(name) {
    try {
        const res = await fetch(`${API_BASE_URL}/prizes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to add prize');
        displaySuccess(result.message);
        await loadPrizesToManager();
    } catch (err) {
        displayError(err.message);
    }
}
async function editPrize(id, name) {
    try {
        const res = await fetch(`${API_BASE_URL}/prizes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to edit prize');
        displaySuccess(result.message);
        await loadPrizesToManager();
    } catch (err) {
        displayError(err.message);
    }
}
async function deletePrize(id) {
     try {
        const res = await fetch(`${API_BASE_URL}/prizes/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to delete prize');
        displaySuccess(result.message);
        await loadPrizesToManager();
    } catch (err) {
        displayError(err.message);
    }
}

// --- Logic การโหวต (Vote) ---
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
    if (voteCountdownIntervalId) {
        clearInterval(voteCountdownIntervalId);
        voteCountdownIntervalId = null;
    }
    if (voteStatusPollIntervalId) {
        clearInterval(voteStatusPollIntervalId);
        voteStatusPollIntervalId = null;
    }
    if (voteCountdownContainer) { 
        voteCountdownContainer.classList.add('d-none');
        voteCountdownContainer.classList.remove('alert-danger');
        voteCountdownContainer.classList.add('alert-info');
    }
    const timeUpMsg = document.getElementById('vote-time-up-msg');
    if (timeUpMsg) {
        timeUpMsg.remove();
    }
    const voteForm = document.getElementById('voteForm');
    if (voteForm) {
        voteForm.classList.remove('d-none');
    }
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
    if (window.location.hash === '#vote') {
        backBtn.classList.add('d-none');
        if (voteStatusPollIntervalId) clearInterval(voteStatusPollIntervalId);
        try {
            const res = await fetch(`${API_BASE_URL}/vote-status`);
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to fetch status");
            if (!result.is_open) {
                const lang = localStorage.getItem('language') || 'th';
                voteElements.eligibilityMessage.innerText = translations[lang]['vote_status_closed']; 
                voteElements.eligibilityMessage.classList.remove('d-none'); 
                voteElements.eligibilityCheckDiv.classList.add('d-none'); 
                voteStatusPollIntervalId = setInterval(async () => {
                    console.log("Polling for vote status..."); 
                    try {
                        const pollRes = await fetch(`${API_BASE_URL}/vote-status`);
                        const pollResult = await pollRes.json();
                        if (pollResult.is_open) {
                            console.log("Voting is NOW OPEN!");
                            clearInterval(voteStatusPollIntervalId);
                            voteStatusPollIntervalId = null;
                            voteElements.eligibilityMessage.classList.add('d-none');
                            voteElements.eligibilityMessage.innerText = '';
                            voteElements.eligibilityCheckDiv.classList.remove('d-none');
                        }
                    } catch (pollErr) {
                        clearInterval(voteStatusPollIntervalId);
                        voteStatusPollIntervalId = null;
                    }
                }, 3000); 
            } else {
                voteElements.eligibilityMessage.classList.add('d-none'); 
                voteElements.eligibilityCheckDiv.classList.remove('d-none'); 
            }
        } catch (err) {
            voteElements.eligibilityMessage.innerText = `ไม่สามารถโหลดสถานะโหวตได้: ${err.message}`;
            voteElements.eligibilityMessage.classList.remove('d-none');
            voteElements.eligibilityCheckDiv.classList.add('d-none'); 
        }
    } else {
        backBtn.classList.remove('d-none');
        voteElements.eligibilityCheckDiv.classList.remove('d-none');
    }
}

voteElements.checkEligibilityBtn.addEventListener('click', async () => {
    const employeeId = voteElements.employeeIdInput.value.toUpperCase();
    if (!employeeId) {
        voteElements.eligibilityMessage.innerText = 'กรุณากรอกรหัสพนักงาน';
        return;
    }
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
            if (result.deadline) {
                startVoteCountdown(result.deadline); 
            }
        } else {
            voteElements.eligibilityMessage.innerText = result.message || `เกิดข้อผิดพลาด (${res.status})`;
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
        } else {
             throw new Error(result.error || 'Failed to load candidates')
        }
    } catch (err) {
        displayError(`ไม่สามารถโหลดรายชื่อผู้เข้าประกวด: ${err.message}`);
        resetVotePageUI(); 
    }
}

voteElements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const selected = document.querySelector('input[name="candidate"]:checked');
    if (!selected) {
        displayError('กรุณาเลือกผู้เข้าประกวด');
        return;
    }
    if (!currentVotingEmployeeId) {
         displayError('เกิดข้อผิดพลาด: ไม่พบรหัสพนักงานผู้โหวต กรุณาลองตรวจสอบสิทธิ์ใหม่');
         resetVotePageUI();
         return;
    }
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
             if(res.status !== 409) {
                resetVotePageUI();
             }
        }
    } catch (err) {
        displayError(`ไม่สามารถส่งผลโหวตได้: ${err.message}`);
        resetVotePageUI();
    } finally {
        submitButton.disabled = false;
        const buttonKey = submitButton.getAttribute('data-key');
        const currentLang = localStorage.getItem('language') || 'th';
        submitButton.innerText = (buttonKey && translations[currentLang][buttonKey]) ? translations[currentLang][buttonKey] : 'ส่งคะแนนโหวต';
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
        } else {
             throw new Error(result.error || 'Failed to load results');
        }
    } catch (err) {
        displayError(`ไม่สามารถโหลดผลโหวตได้: ${err.message}`);
         voteElements.resultsContainer.classList.add('d-none'); 
    }
}
// (ใหม่) --- Logic Countdown Timer ---
function startVoteCountdown(deadlineISO) {
    if (voteCountdownIntervalId) {
        clearInterval(voteCountdownIntervalId);
    }
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
            const voteForm = document.getElementById('voteForm');
            if (voteForm) {
                voteForm.classList.add('d-none'); 
            }
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

// (ใหม่) --- Admin Countdown Timer ---
function startAdminCountdown(deadlineISO) {
    if (adminVoteCountdownIntervalId) {
        clearInterval(adminVoteCountdownIntervalId);
    }
    const deadline = new Date(deadlineISO).getTime();
    const updateAdminTimer = () => {
        const now = new Date().getTime();
        const distance = deadline - now;
        if (distance <= 0) {
            clearInterval(adminVoteCountdownIntervalId);
            adminVoteCountdownIntervalId = null;
            if (adminVoteCountdown) {
                adminVoteCountdown.innerText = "00:00";
            }
            const lang = localStorage.getItem('language') || 'th';
            const alertMessage = translations[lang]['vote_time_up'] || "Voting time has expired!";
            alert(alertMessage); 
            const modalInstance = bootstrap.Modal.getInstance(manageVotePeriodModalEl);
            if (modalInstance && modalInstance._isShown) { 
                loadVoteStatus(); 
            }
        } else {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (adminVoteCountdown) {
                adminVoteCountdown.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }
        }
    };
    updateAdminTimer(); 
    adminVoteCountdownIntervalId = setInterval(updateAdminTimer, 1000); 
}

// --- Logic จัดการผู้เข้าประกวด (Candidate Management) ---
const candidateModalEl = document.getElementById('manageCandidatesModal');
const candidateModalInstance = bootstrap.Modal.getOrCreateInstance(candidateModalEl);
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
        if (!res.ok) throw new Error(result.error || 'Failed to load candidates');
        const sortedCandidates = result.data.sort((a, b) => a.name.localeCompare(b.name, 'th'));
        candidateListContainer.innerHTML = sortedCandidates.map(c => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <span class="fw-bold">${c.name}</span>
                    <small class="text-muted d-block">${c.department}</small>
                </div>
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
        const candidateId = e.target.dataset.id;
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้เข้าประกวดคนนี้? (คะแนนโหวตของพวกเขาจะหายไปด้วย)")) {
            await deleteCandidate(candidateId);
        }
    }
    if (e.target.classList.contains('btn-edit-candidate')) {
        const candidateId = e.target.dataset.id;
        const currentName = e.target.dataset.name;
        const currentDept = e.target.dataset.dept;
        const newName = prompt("แก้ไขชื่อผู้เข้าประกวด:", currentName);
        if (!newName) return;
        const newDept = prompt("แก้ไขฝ่าย:", currentDept);
        if (!newDept) return;
        if (newName.trim() !== currentName || newDept.trim() !== currentDept) {
            if (confirm("ยืนยันการแก้ไขผู้เข้าประกวด?")) {
                await editCandidate(candidateId, newName.trim(), newDept.trim());
            }
        }
    }
});
addCandidateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newName = newCandidateNameInput.value.trim();
    const newDept = newCandidateDeptInput.value.trim();
    if (!newName || !newDept) { displayError("กรุณากรอกชื่อและฝ่าย"); return; }
    
    if (!confirm("ยืนยันการเพิ่มผู้เข้าประกวด?")) return;

    await addCandidate(newName, newDept);
    newCandidateNameInput.value = '';
    newCandidateDeptInput.value = '';
});
resetCandidatesBtn.addEventListener('click', async () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้เข้าประกวดทั้งหมด และรีเซ็ตเป็นค่าเริ่มต้น? (การโหวตทั้งหมดจะถูกลบด้วย)")) {
        try {
            const res = await fetch(`${API_BASE_URL}/candidates/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Failed to reset candidates');
            displaySuccess(result.message);
            await loadCandidatesToManager();
        } catch (err) {
            displayError(err.message);
        }
    }
});
async function addCandidate(name, department) {
    try {
        const res = await fetch(`${API_BASE_URL}/candidates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, department})
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to add candidate');
        displaySuccess(result.message);
        await loadCandidatesToManager();
    } catch (err) {
        displayError(err.message);
    }
}
async function editCandidate(id, name, department) {
    try {
        const res = await fetch(`${API_BASE_URL}/candidates/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, department})
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to edit candidate');
        displaySuccess(result.message);
        await loadCandidatesToManager();
    } catch (err) {
        displayError(err.message);
    }
}
async function deleteCandidate(id) {
     try {
        const res = await fetch(`${API_BASE_URL}/candidates/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to delete candidate');
        displaySuccess(result.message);
        await loadCandidatesToManager();
    } catch (err) {
        displayError(err.message);
    }
}

// --- Logic แสดงผลโหวต Real-time ---
const realtimeContainer = document.getElementById('realtime-candidates-container');
const totalVotesSpan = document.getElementById('totalVotes');
function showRealtimeResultsPage() {
    navigateTo(realtimeResultsSection);
    fetchAndDisplayRealtimeResults(); // Initial load
    if (!realtimeIntervalId) {
        realtimeIntervalId = setInterval(fetchAndDisplayRealtimeResults, 3000); // Update every 3 seconds
    }
}
async function fetchAndDisplayRealtimeResults() {
    try {
        const res = await fetch(`${API_BASE_URL}/results`); // Using /results which is ordered by votes
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลผลโหวตได้');
        const result = await res.json();
        const candidates = result.data;
        const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
        totalVotesSpan.innerText = totalVotes;
        realtimeContainer.innerHTML = candidates.map(c => {
            const percentage = totalVotes === 0 ? 0 : ((c.votes / totalVotes) * 100).toFixed(1);
            return `
                <div class="candidate-result-item">
                    <div class="candidate-info">
                        <div>
                            <span class="candidate-name">${c.name}</span>
                            <span class="candidate-dept">(${c.department})</span>
                        </div>
                        <span class="candidate-votes">${c.votes} คะแนน</span>
                    </div>
                    <div class="progress" role="progressbar" aria-label="Vote percentage for ${c.name}" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">
                      <div class="progress-bar" style="width: ${percentage}%">${percentage}%</div>
                    </div>
                </div>
            `;
        }).join('') || '<p class="text-center text-muted">ยังไม่มีคะแนนโหวต</p>';
    } catch (err) {
        realtimeContainer.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
        if (realtimeIntervalId) { // Stop interval on error
            clearInterval(realtimeIntervalId);
            realtimeIntervalId = null;
        }
    }
}

// --- Export & Upload Logic ---
async function exportToExcel() {
    const btn = document.getElementById('confirm-export-btn');
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> กำลังเตรียมข้อมูล...`;
    const exportEmployees = document.getElementById('export-employees-check').checked;
    const exportWinners = document.getElementById('export-winners-check').checked;
    const exportVotes = document.getElementById('export-votes-check').checked;
    if (!exportEmployees && !exportWinners && !exportVotes) {
        alert("กรุณาเลือกอย่างน้อย 1 หัวข้อเพื่อ Export");
        btn.disabled = false;
        btn.innerText = 'ยืนยันการ Export';
        return;
    }
    try {
        const promises = [];
        if (exportEmployees) promises.push(fetch(`${API_BASE_URL}/employees`).then(res => res.json()));
        if (exportWinners) {
            promises.push(fetch(`${API_BASE_URL}/draw`).then(res => res.json().catch(() => ({ data: [] })))); // Handle potential draw error if no eligible winners
            promises.push(fetch(`${API_BASE_URL}/prizes`).then(res => res.json()));
        }
        if (exportVotes) promises.push(fetch(`${API_BASE_URL}/results`).then(res => res.json()));
        const results = await Promise.all(promises);
        const wb = XLSX.utils.book_new();
        let promiseIndex = 0;
        if (exportEmployees) {
            const employeesResult = results[promiseIndex++];
            if (employeesResult && employeesResult.data) {
                const sheetData = employeesResult.data.map(emp => ({ 'รหัสพนักงาน': emp.employee_id, 'ชื่อ': emp.first_name, 'นามสกุล': emp.last_name, 'ฝ่าย': emp.department, 'สถานะยืนยัน': emp.registration_time ? 'ยืนยันแล้ว' : 'ยังไม่ยืนยัน', 'เวลายืนยัน': emp.registration_time ? new Date(emp.registration_time).toLocaleString('th-TH') : '-', 'สถานะเช็คอิน': emp.checked_in ? 'เช็คอินแล้ว' : 'ยังไม่เช็คอิน', 'เวลาที่เช็คอิน': emp.checked_in ? new Date(emp.checkin_time).toLocaleString('th-TH') : '-' }));
                const sheet = XLSX.utils.json_to_sheet(sheetData);
                XLSX.utils.book_append_sheet(wb, sheet, "รายชื่อผู้ลงทะเบียน");
            }
        }
        if (exportWinners) {
            const winnersResult = results[promiseIndex++];
            const prizesResult = results[promiseIndex++];
             if (winnersResult && winnersResult.data && prizesResult && prizesResult.data) {
                const prizes = prizesResult.data.map(p => p.name);
                const sheetData = winnersResult.data.map((winner, index) => ({
                    'รางวัล': prizes[index] || `รางวัลที่ ${index + 1}`, // Match winner to prize by index
                    'ชื่อ': winner.first_name,
                    'นามสกุล': winner.last_name,
                    'ฝ่าย': winner.department,
                    'รหัสพนักงาน': winner.employee_id
                }));
                const sheet = XLSX.utils.json_to_sheet(sheetData);
                XLSX.utils.book_append_sheet(wb, sheet, "รายชื่อผู้โชคดี");
            }
        }
        if (exportVotes) {
            const votesResult = results[promiseIndex++];
             if (votesResult && votesResult.data) {
                const sheetData = votesResult.data.map(c => ({ 'ผู้เข้าประกวด': c.name, 'ฝ่าย': c.department, 'คะแนนโหวต': c.votes }));
                const sheet = XLSX.utils.json_to_sheet(sheetData);
                XLSX.utils.book_append_sheet(wb, sheet, "ผลโหวต");
            }
        }
        if (wb.SheetNames.length > 0) { // Only write if there's data
            XLSX.writeFile(wb, "Party_Event_Data.xlsx");
        } else {
             displayError("ไม่มีข้อมูลให้ Export");
        }
        const exportModalInstance = bootstrap.Modal.getInstance(document.getElementById('exportExcelModal'));
        if(exportModalInstance) exportModalInstance.hide(); // Hide modal on success

    } catch (err) {
        displayError(`เกิดข้อผิดพลาดในการ Export ข้อมูล: ${err.message}`);
    } finally {
        btn.disabled = false;
        btn.innerText = 'ยืนยันการ Export';
    }
}
document.getElementById('uploadEmployeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('employeeFile');
    const file = fileInput.files[0];
    if (!file) { displayError('กรุณาเลือกไฟล์ Excel'); return; }
    
    if (!confirm("ยืนยันการอัปโหลดไฟล์?")) return;

    const formData = new FormData();
    formData.append('employeeFile', file);
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> กำลังอัปโหลด...';
    try {
        const res = await fetch(`${API_BASE_URL}/upload-employees`, { method: 'POST', body: formData });
        const result = await res.json();
        if (res.ok) {
            displaySuccess(result.message);
            fileInput.value = '';
        } else {
            displayError(result.error || `Error ${res.status}`);
        }
    } catch (err) {
        displayError(`ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้: ${err.message}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'อัปโหลดข้อมูล';
    }
});

// (ใหม่) --- Logic การลงทะเบียนกีฬาสี ---
sportdayForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const employeeId = document.getElementById('sportdayEmployeeId').value.toUpperCase();
    if (!employeeId) return;

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> กำลังประมวลผล...';

    const container = document.getElementById('sportdayResultContainer');
    
    try {
        const response = await fetch(`${API_BASE_URL}/sportday-register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeId })
        });
        const result = await response.json();
        container.classList.remove('d-none');

        if (response.ok) {
            container.innerHTML = `<div class="alert alert-success">✔️ <strong>${result.message}</strong><br>ชื่อ: ${result.data.firstName} ${result.data.lastName} (ฝ่าย: ${result.data.department})</div>`;
            sportdayForm.reset();
        } else if (response.status === 409) {
            const regTime = new Date(result.data.reg_time).toLocaleString('th-TH');
            container.innerHTML = `<div class="alert alert-warning">⚠️ <strong>${result.error}</strong><br>(ลงทะเบียนไปเมื่อ: ${regTime})</div>`;
        } else {
            container.innerHTML = `<div class="alert alert-danger">❌ <strong>${result.error}</strong></div>`;
        }
    } catch (error) {
        container.classList.remove('d-none');
        container.innerHTML = `<div class="alert alert-danger">❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้</div>`;
    } finally {
        submitButton.disabled = false;
        const lang = localStorage.getItem('language') || 'th';
        submitButton.innerText = translations[lang]['sportday_register_button'] || 'Confirm Participation';
    }
});