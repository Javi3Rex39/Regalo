// ========================================
// FUNCIONALIDAD DE LA GALERÍA
// ========================================

// Observador para animaciones de entrada
const galeriaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Animar items de la galería cuando sean visibles
document.addEventListener('DOMContentLoaded', () => {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    // Aplicar estado inicial
    galeriaItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        galeriaObserver.observe(item);
    });
});

// ========================================
// EFECTO DE CLICK EN LAS IMÁGENES (OPCIONAL)
// ========================================

// Puedes agregar funcionalidad de lightbox aquí si quieres
// Por ejemplo, mostrar la imagen en grande al hacer click

document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('click', function() {
        const imagen = this.querySelector('.galeria-imagen');
        const texto = this.querySelector('.galeria-text').textContent;
        
        // Crear overlay para lightbox
        createLightbox(imagen.src, texto);
    });
});

// ========================================
// LIGHTBOX (MOSTRAR IMAGEN EN GRANDE)
// ========================================

function createLightbox(imageSrc, caption) {
    // Crear elementos del lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 100000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        animation: scaleUp 0.4s ease;
    `;
    
    const captionElement = document.createElement('p');
    captionElement.textContent = caption;
    captionElement.style.cssText = `
        color: var(--gold);
        font-size: 1.5rem;
        margin-top: 20px;
        font-family: 'Playfair Display', serif;
        text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: var(--gold);
        color: var(--black);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.1)';
        closeBtn.style.background = 'var(--light-red)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1)';
        closeBtn.style.background = 'var(--gold)';
    });
    
    // Función para cerrar lightbox
    const closeLightbox = () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    };
    
    // Event listeners
    lightbox.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    // Agregar elementos al lightbox
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(img);
    lightbox.appendChild(captionElement);
    
    // Agregar lightbox al body
    document.body.appendChild(lightbox);
}

// ========================================
// EFECTO DE PARALLAX SUAVE (OPCIONAL)
// ========================================

window.addEventListener('scroll', () => {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const scrolled = window.pageYOffset;
    
    galeriaItems.forEach((item, index) => {
        const speed = 0.05;
        const offset = index % 2 === 0 ? scrolled * speed : -scrolled * speed;
        
        if (item.getBoundingClientRect().top < window.innerHeight) {
            item.style.transform = `translateY(${offset}px)`;
        }
    });
});

console.log('🖼️ Galería inicializada correctamente');