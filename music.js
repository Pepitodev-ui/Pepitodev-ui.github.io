document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('60. OOBE.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    
    const musicToggle = document.getElementById('musicToggle');
    const muteIcon = document.getElementById('muteIcon');
    const unmuteIcon = document.getElementById('unmuteIcon');
    const musicText = document.getElementById('musicText');
    
    const savedState = localStorage.getItem('moonygb-music');
    let isPlaying = savedState === 'true';
    
    function updateUI() {
        if (isPlaying) {
            muteIcon.classList.add('hidden');
            unmuteIcon.classList.remove('hidden');
            musicText.textContent = 'Music: On';
        } else {
            muteIcon.classList.remove('hidden');
            unmuteIcon.classList.add('hidden');
            musicText.textContent = 'Music: Off';
        }
    }
    
    function playMusic() {
        audio.play().catch(err => {
            console.log('Autoplay blocked:', err);
        });
    }
    
    if (isPlaying) {
        playMusic();
    }
    updateUI();
    
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                playMusic();
                audio.volume = 0.5;
            } else {
                audio.pause();
            }
            localStorage.setItem('moonygb-music', isPlaying);
            updateUI();
        });
    }
    
    // Resume on first user interaction if autoplay blocked
    document.addEventListener('click', () => {
        if (isPlaying && audio.paused) {
            playMusic();
        }
    }, { once: true });
});