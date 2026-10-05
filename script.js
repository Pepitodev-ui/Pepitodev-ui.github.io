const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const modalBackdrop = document.querySelector('.modal-backdrop');
const applySettings = document.getElementById('applySettings');
const resetSettings = document.getElementById('resetSettings');

const bgTypeSolid = document.querySelector('input[value="solid"]');
const bgTypeGradient = document.querySelector('input[value="gradient"]');
const solidSettings = document.getElementById('solidSettings');
const gradientSettings = document.getElementById('gradientSettings');

const primaryColor = document.getElementById('primaryColor');
const primaryColorValue = document.getElementById('primaryColorValue');
const gradStart = document.getElementById('gradStart');
const gradEnd = document.getElementById('gradEnd');
const gradStartValue = document.getElementById('gradStartValue');
const gradEndValue = document.getElementById('gradEndValue');
const gradDir = document.getElementById('gradDir');

const rootToggle = document.querySelector('[data-toggle="root"]');
const rootSection = document.getElementById('rootSection');

const rootMinimize = document.querySelector('[data-minimize="root"]');

const defaultSettings = {
    bgType: 'solid',
    primaryColor: '#4c00ff',
    gradStart: '#4c00ff',
    gradEnd: '#9d7cff',
    gradDir: 'to bottom'
};

function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function adjustBrightness(hex, percent) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    r = Math.min(255, Math.max(0, r + (r * percent / 100)));
    g = Math.min(255, Math.max(0, g + (g * percent / 100)));
    b = Math.min(255, Math.max(0, b + (b * percent / 100)));
    
    const rr = Math.round(r).toString(16).padStart(2, '0');
    const gg = Math.round(g).toString(16).padStart(2, '0');
    const bb = Math.round(b).toString(16).padStart(2, '0');
    
    return `#${rr}${gg}${bb}`;
}

function applyTheme(settings) {
    const root = document.documentElement;
    const body = document.body;
    
    if (settings.bgType === 'solid') {
        body.style.background = '#0f0f0f';
        root.style.setProperty('--bg-primary', '#0f0f0f');
        root.style.setProperty('--bg-secondary', '#1a1a1a');
        root.style.setProperty('--accent', settings.primaryColor);
        root.style.setProperty('--accent-hover', adjustBrightness(settings.primaryColor, 20));
        root.style.setProperty('--info', settings.primaryColor);
        root.style.setProperty('--info-bg', hexToRgba(settings.primaryColor, 0.1));
    } else if (settings.bgType === 'gradient') {
        const gradient = `linear-gradient(${settings.gradDir}, ${settings.gradStart}, ${settings.gradEnd})`;
        body.style.background = gradient;
        root.style.setProperty('--accent', settings.gradStart);
        root.style.setProperty('--accent-hover', adjustBrightness(settings.gradStart, 20));
        root.style.setProperty('--info', settings.gradStart);
        root.style.setProperty('--info-bg', hexToRgba(settings.gradStart, 0.1));
    }
    
    localStorage.setItem('moonygb-settings', JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem('moonygb-settings');
    const settings = saved && saved !== 'undefined' ? JSON.parse(saved) : { ...defaultSettings };
    
    if (settings.bgType === 'solid') {
        if (bgTypeSolid) bgTypeSolid.checked = true;
        if (solidSettings) solidSettings.classList.remove('hidden');
        if (gradientSettings) gradientSettings.classList.add('hidden');
    } else {
        if (bgTypeGradient) bgTypeGradient.checked = true;
        if (solidSettings) solidSettings.classList.add('hidden');
        if (gradientSettings) gradientSettings.classList.remove('hidden');
    }
    
    if (primaryColor) {
        primaryColor.value = settings.primaryColor;
        primaryColorValue.textContent = settings.primaryColor;
    }
    if (gradStart) {
        gradStart.value = settings.gradStart;
        gradStartValue.textContent = settings.gradStart;
    }
    if (gradEnd) {
        gradEnd.value = settings.gradEnd;
        gradEndValue.textContent = settings.gradEnd;
    }
    if (gradDir) gradDir.value = settings.gradDir;
    
    applyTheme(settings);
}

function toggleModal(show) {
    if (!settingsModal) return;
    if (show) {
        settingsModal.classList.add('active');
    } else {
        settingsModal.classList.remove('active');
    }
}

if (bgTypeSolid) {
    bgTypeSolid.addEventListener('change', () => {
        if (solidSettings) solidSettings.classList.remove('hidden');
        if (gradientSettings) gradientSettings.classList.add('hidden');
    });
}

if (bgTypeGradient) {
    bgTypeGradient.addEventListener('change', () => {
        if (solidSettings) solidSettings.classList.add('hidden');
        if (gradientSettings) gradientSettings.classList.remove('hidden');
    });
}

if (primaryColor) {
    primaryColor.addEventListener('input', () => {
        primaryColorValue.textContent = primaryColor.value;
    });
}

if (gradStart) {
    gradStart.addEventListener('input', () => {
        gradStartValue.textContent = gradStart.value;
    });
}

if (gradEnd) {
    gradEnd.addEventListener('input', () => {
        gradEndValue.textContent = gradEnd.value;
    });
}

if (settingsBtn) settingsBtn.addEventListener('click', () => toggleModal(true));
if (closeSettings) closeSettings.addEventListener('click', () => toggleModal(false));
if (modalBackdrop) modalBackdrop.addEventListener('click', () => toggleModal(false));

if (applySettings) {
    applySettings.addEventListener('click', () => {
        const settings = {
            bgType: bgTypeSolid && bgTypeSolid.checked ? 'solid' : 'gradient',
            primaryColor: primaryColor ? primaryColor.value : defaultSettings.primaryColor,
            gradStart: gradStart ? gradStart.value : defaultSettings.gradStart,
            gradEnd: gradEnd ? gradEnd.value : defaultSettings.gradEnd,
            gradDir: gradDir ? gradDir.value : defaultSettings.gradDir
        };
        applyTheme(settings);
        toggleModal(false);
    });
}

if (resetSettings) {
    resetSettings.addEventListener('click', () => {
        localStorage.setItem('moonygb-settings', JSON.stringify(defaultSettings));
        loadSettings();
        applyTheme(defaultSettings);
    });
}

if (rootToggle) {
    rootToggle.addEventListener('click', () => {
        rootSection.classList.toggle('collapsed');
    });
}

if (rootMinimize) {
    rootMinimize.addEventListener('click', (e) => {
        e.stopPropagation();
        rootSection.classList.toggle('minimized');
        rootSection.classList.add('collapsed');
    });
}

const rootApksToggle = document.querySelector('[data-toggle="rootapks"]');
const rootApksSection = document.getElementById('rootApksSection');
const rootApksMinimize = document.querySelector('[data-minimize="rootapks"]');

const nonRootApksToggle = document.querySelector('[data-toggle="nonrootapks"]');
const nonRootApksSection = document.getElementById('nonRootApksSection');
const nonRootApksMinimize = document.querySelector('[data-minimize="nonrootapks"]');

const fridaToggle = document.querySelector('[data-toggle="frida"]');
const fridaSection = document.getElementById('fridaSection');
const fridaMinimize = document.querySelector('[data-minimize="frida"]');

if (rootApksToggle) {
    rootApksToggle.addEventListener('click', () => {
        rootApksSection.classList.toggle('collapsed');
    });
}

if (rootApksMinimize) {
    rootApksMinimize.addEventListener('click', (e) => {
        e.stopPropagation();
        rootApksSection.classList.toggle('minimized');
        rootApksSection.classList.add('collapsed');
    });
}

if (nonRootApksToggle) {
    nonRootApksToggle.addEventListener('click', () => {
        nonRootApksSection.classList.toggle('collapsed');
    });
}

if (nonRootApksMinimize) {
    nonRootApksMinimize.addEventListener('click', (e) => {
        e.stopPropagation();
        nonRootApksSection.classList.toggle('minimized');
        nonRootApksSection.classList.add('collapsed');
    });
}

if (fridaToggle) {
    fridaToggle.addEventListener('click', () => {
        fridaSection.classList.toggle('collapsed');
    });
}

if (fridaMinimize) {
    fridaMinimize.addEventListener('click', (e) => {
        e.stopPropagation();
        fridaSection.classList.toggle('minimized');
        fridaSection.classList.add('collapsed');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
});

document.body.style.transition = 'background 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
