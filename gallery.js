document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const lightboxClose = document.getElementById('lightboxClose');
    
    const images = [
        '1.png',
        '1 (2).png',
        '1 (3).png',
        '1 (4).png',
        '1 (5).png',
        '1 (6).png',
        '1 (7).png',
        '1 (8).png',
        '1 (9).png',
        '1 (10).png',
        '1 (11).png',
        '1 (12).png',
        '1 (13).png'
    ];
    
    images.forEach(filename => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item smooth';
        
        const img = document.createElement('img');
        img.src = `ICONS/${filename}`;
        img.alt = 'Rooting tutorial screenshot';
        img.loading = 'lazy';
        img.className = 'gallery-image';
        
        img.onerror = () => {
            imgContainer.style.display = 'none';
        };
        
        imgContainer.addEventListener('click', () => {
            lightboxImage.src = `ICONS/${filename}`;
            lightboxImage.alt = filename;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        imgContainer.appendChild(img);
        gallery.appendChild(imgContainer);
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    }
    
    lightboxBackdrop.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});