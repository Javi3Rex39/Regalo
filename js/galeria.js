// ========================================
// FUNCIONALIDAD DE LA GALERÍA
// ========================================

// Detectar si es móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
// EFECTO DE CLICK EN LAS IMÁGENES
// ========================================

document.querySelectorAll('.galeria-item').forEach(item => {
    // En móvil usar 'touchend', en desktop 'click'
    const eventType = isMobile ? 'touchend' : 'click';
    
    item.addEventListener(eventType, function(e) {
        e.preventDefault();
        const imagen = this.querySelector('.galeria-imagen');
        const texto = this.querySelector('.galeria-text').textContent;
        
        // Crear lightbox optimizado para móvil
        createLightbox(imagen.src, texto);
    });
});

// ========================================
// LIGHTBOX OPTIMIZADO PARA MÓVIL
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
        padding: ${isMobile ? '20px' : '40px'};
        overflow: auto;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: ${isMobile ? '95%' : '90%'};
        max-height: ${isMobile ? '75vh' : '80vh'};
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        animation: scaleUp 0.4s ease;
        object-fit: contain;
    `;
    
    const captionElement = document.createElement('p');
    captionElement.textContent = caption;
    captionElement.style.cssText = `
        color: var(--gold);
        font-size: ${isMobile ? '1.2rem' : '1.5rem'};
        margin-top: 20px;
        font-family: 'Playfair Display', serif;
        text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        text-align: center;
        padding: 0 20px;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: ${isMobile ? '15px' : '20px'};
        right: ${isMobile ? '15px' : '20px'};
        background: var(--gold);
        color: var(--black);
        border: none;
        width: ${isMobile ? '45px' : '50px'};
        height: ${isMobile ? '45px' : '50px'};
        border-radius: 50%;
        font-size: ${isMobile ? '1.3rem' : '1.5rem'};
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 100001;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    if (!isMobile) {
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.transform = 'scale(1.1)';
            closeBtn.style.background = 'var(--light-red)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.transform = 'scale(1)';
            closeBtn.style.background = 'var(--gold)';
        });
    }
    
    // Función para cerrar lightbox
    const closeLightbox = () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(lightbox);
            // Restaurar scroll en móvil
            document.body.style.overflow = '';
        }, 300);
    };
    
    // Event listeners
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });
    
    // Cerrar con tecla ESC (desktop)
    if (!isMobile) {
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    // Prevenir scroll en móvil cuando lightbox está abierto
    if (isMobile) {
        document.body.style.overflow = 'hidden';
    }
    
    // Agregar elementos al lightbox
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(img);
    lightbox.appendChild(captionElement);
    
    // Agregar lightbox al body
    document.body.appendChild(lightbox);
}

// ========================================
// GESTOS TÁCTILES PARA MÓVIL
// ========================================

if (isMobile) {
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (!e.target.closest('.lightbox')) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Swipe down para cerrar
        if (Math.abs(diffY) > 100 && diffY < 0) {
            const lightbox = document.querySelector('.lightbox');
            if (lightbox) {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (lightbox.parentNode) {
                        lightbox.parentNode.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }
                }, 300);
            }
        }
    }, { passive: true });
}

// ========================================
// EFECTO DE PARALLAX (SOLO DESKTOP)
// ========================================

if (!isMobile) {
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
}

console.log('🖼️ Galería inicializada correctamente');
console.log(`📱 Modo: ${isMobile ? 'Móvil' : 'Desktop'}`);
console.log('📸 Total de fotos: 9');