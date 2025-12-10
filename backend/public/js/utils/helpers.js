import { translations } from './translations.js';

export function getLang() {
    return localStorage.getItem('language') || 'th';
}

export function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    updateUIText(lang);
}

export function updateUIText(lang) {
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            if (elem.hasAttribute('placeholder') && translations[lang][key]) {
                 elem.placeholder = translations[lang][key];
            } else {
                 // Avoid overwriting children if not needed, but textContent is typically what we want
                 // Some elements might have icons.
                 if(elem.children.length === 0) {
                     elem.innerText = translations[lang][key];
                 } else {
                    // Complex elements: Try to find text node? 
                    // Or simpler: just replace text content except for known icons
                    // For this app, simply replacing innerText works for most.
                    // But buttons with icons might be an issue.
                    // Let's keep original logic: innerText = translation
                 }
                 // Re-implementation of original simple logic provided it works for buttons with icons if they are set correctly or handled separately
                 // The original code was: elem.innerText = translations[lang][key]; 
                 // Which *removes* icons if they are inside the button.
                 // We should fix this if possible, or stick to what was there.
                 // Current code in script.js overwrites icons. 
                 // Wait, script.js innerText overwrites everything.
                 // So we replicate that behavior for consistency, unless we want to improve it.
                 // Improvement: Use a span for text inside buttons.
                 
                 // For now, let's stick to safe behavior: innerText
                 elem.innerText = translations[lang][key];
            }
        }
    });
    
    document.getElementById('lang-th-btn')?.classList.toggle('active', lang === 'th');
    document.getElementById('lang-en-btn')?.classList.toggle('active', lang === 'en');
}

export function displayError(message) { 
    const el = document.getElementById('errorMessage');
    const toastEl = document.getElementById('errorToast');
    if(el && toastEl) {
        el.innerText = message || 'Error';
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}

export function displaySuccess(message) { 
    const el = document.getElementById('successMessage');
    const toastEl = document.getElementById('successToast');
    if(el && toastEl) {
        el.innerText = message || 'Success';
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}
