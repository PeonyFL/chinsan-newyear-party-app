import { getLang } from './utils/helpers.js';

let isAdminLoggedIn = false;

export function setIsAdminLoggedIn(val) {
    isAdminLoggedIn = val;
}

export function getIsAdminLoggedIn() {
    return isAdminLoggedIn;
}

const allSections = [
    'registration-section', 'find-section', 'employee-list-section', 
    'draw-section', 'checkin-section', 'vote-section', 'result', 
    'realtime-results-section', 'sportday-section'
];
const fullScreenSections = ['employee-list-section', 'draw-section', 'vote-section', 'realtime-results-section'];

export function navigateTo(sectionId, context = {}) {
    // Hide all
    allSections.forEach(id => document.getElementById(id)?.classList.add('d-none'));
    
    // Show target
    const target = document.getElementById(sectionId);
    if(target) target.classList.remove('d-none');

    const mainHeader = document.getElementById('main-header-container');
    const mainCard = document.getElementById('main-card');

    if(mainHeader) {
        mainHeader.classList.toggle('d-none', sectionId !== 'registration-section' && sectionId !== 'find-section');
    }
    
    if(fullScreenSections.includes(sectionId)) {
        mainCard.classList.add('fullscreen');
    } else {
        mainCard.classList.remove('fullscreen');
    }

    // Specific Logic
    if (sectionId === 'find-section') {
        const btn = document.getElementById('backFromFindBtn');
        if(btn) btn.classList.toggle('d-none', !isAdminLoggedIn && !btn.classList.contains('always-show'));
    }

    if (sectionId === 'registration-section') {
        const form = document.getElementById('registrationForm');
        const adminActions = document.getElementById('admin-actions-container');
        if(form) form.classList.toggle('d-none', isAdminLoggedIn);
        if(adminActions) adminActions.classList.toggle('d-none', !isAdminLoggedIn);
    }
}

export function setupNavigation() {
    window.addEventListener('hashchange', handleHashChange);
    // document.getElementById('backFromListBtn').addEventListener('click', () => navigateTo('registration-section'));
    // Add other common nav listeners here or in respective modules
}

export async function handleHashChange() {
    const hash = window.location.hash;
    if (hash === '#vote') {
        // await showVotePage(); // Circular dependency if not careful. 
        // Better to expose functions or use event bus. 
        // For simplicity, we might just load default for now or fix later.
    } 
}
