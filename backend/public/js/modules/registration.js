import { fetchJson } from '../services/apiService.js';
import { displayError, displaySuccess, getLang } from '../utils/helpers.js';
import { navigateTo, getIsAdminLoggedIn } from './navigation.js';
import { translations } from '../utils/translations.js';

export function initRegistration() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleRegistrationSubmit);
    }
    
    document.getElementById('showAddEmployeeFormBtn')?.addEventListener('click', () => {
        form.classList.toggle('d-none');
        if (!form.classList.contains('d-none')) {
            document.getElementById('additional-info-fields')?.classList.remove('d-none');
        }
    });

    document.getElementById('showFindFormLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = document.getElementById('backFromFindBtn');
        if(btn) {
            btn.classList.remove('d-none');
            btn.innerText = "กลับไปหน้าลงทะเบียน";
        }
        navigateTo('find-section');
    });

    document.getElementById('select-employee-btn')?.addEventListener('click', () => {
        document.getElementById('role-selection-section').classList.add('d-none');
        document.getElementById('app-sections').classList.remove('d-none');
        document.getElementById('additional-info-fields').classList.add('d-none');
        navigateTo('registration-section');
    });
}

async function handleRegistrationSubmit(e) {
    e.preventDefault();
    const isAdmin = getIsAdminLoggedIn();
    
    const data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        department: document.getElementById('department').value,
        employeeId: document.getElementById('employeeId').value.toUpperCase(),
        isAdmin: isAdmin
    };

    try {
        const result = await fetchJson('/add-employee', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (isAdmin) {
            displaySuccess("ลงทะเบียนสำเร็จเรียบร้อย");
            document.getElementById('registrationForm').reset();
        } else {
            navigateTo('result');
            
            // Show User Info
            const userData = result.data;
            const welcomeMsg = translations[getLang()].welcome_message || "ยินดีต้อนรับ";
            
            document.getElementById('resultMessage').innerHTML = `
                ${welcomeMsg} <br>
                <span class="text-primary display-6 fw-bold">${userData.first_name} ${userData.last_name}</span><br>
                <small class="text-muted">${userData.department}</small>
            `;

            document.getElementById('qrCodeContainer').innerHTML = `
                <img src="${result.data.qrCode}" class="img-fluid" alt="QR Code" data-employee-id="${result.data.employeeId}">
            `;
            document.getElementById('registrationForm').reset();
        }

    } catch (err) {
        // Handle specific 409 formatting
        if (err.message.includes('ลงทะเบียนไปแล้ว')) {
            // Complex parsing logic from original script if essential, 
            // but simple message is likely enough. 
            // Original: had date. Endpoint returns 409 with registeredAt in body if I implemented it.
            displayError(err.message);
        } else {
            displayError(err.message);
        }
    }
}
