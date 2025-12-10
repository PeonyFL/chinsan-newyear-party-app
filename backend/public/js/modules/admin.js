import { setIsAdminLoggedIn, navigateTo } from './navigation.js';

export function initAdmin() {
    const modal = new bootstrap.Modal(document.getElementById('adminPasswordModal'));
    const form = document.getElementById('adminPasswordForm');
    
    document.getElementById('select-admin-btn')?.addEventListener('click', () => {
        modal.show();
    });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = document.getElementById('admin-password-input').value;
        if (pwd === 'admin') {
            modal.hide();
            document.getElementById('admin-password-input').value = '';
            setIsAdminLoggedIn(true);
            showAdminView();
        } else {
            document.getElementById('admin-password-error').innerText = 'รหัสผ่านไม่ถูกต้อง';
        }
    });
}

function showAdminView() {
    document.getElementById('role-selection-section').classList.add('d-none');
    document.getElementById('app-sections').classList.remove('d-none');
    document.getElementById('admin-actions-container').classList.remove('d-none');
    document.getElementById('registrationForm').classList.add('d-none');
    navigateTo('registration-section');
}
