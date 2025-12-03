// ========================================
// EFECTOS VISUALES Y ANIMACIONES
// ========================================

// ========================================
// SCROLL SUAVE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// EFECTO PARALLAX SUAVE EN SCROLL
// ========================================

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Efecto parallax en partículas
    const particles = document.querySelector('.particles');
    if (particles) {
        particles.style.transform = `translateY(${scrollTop * 0.3}px)`;
    }
    
    // Actualizar decoraciones de esquina
    const corners = document.querySelectorAll('.corner-decoration');
    corners.forEach(corner => {
        corner.style.opacity = Math.max(0.2, 0.5 - scrollTop / 1000);
    });
    
    lastScrollTop = scrollTop;
});

// ========================================
// OBSERVADOR DE INTERSECCIÓN GENERAL
// ========================================

const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Agregar clase de animación específica según el elemento
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            } else if (entry.target.classList.contains('galeria-item')) {
                entry.target.style.animation = 'scaleUp 0.6s ease forwards';
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observar todos los elementos animables cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = document.querySelectorAll(
        '.timeline-item, .galeria-item, .reason-card, .wish-item'
    );
    
    animatableElements.forEach(el => {
        generalObserver.observe(el);
    });
});

// ========================================
// EFECTO DE CURSOR PERSONALIZADO (OPCIONAL)
// ========================================

let cursorDot, cursorOutline;

function initCustomCursor() {
    // Crear elementos del cursor
    cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transition: transform 0.2s ease;
    `;
    
    cursorOutline = document.createElement('div');
    cursorOutline.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid var(--gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99998;
        transition: all 0.2s ease;
    `;
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    // Seguir el cursor
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursorOutline.style.left = (e.clientX - 15) + 'px';
        cursorOutline.style.top = (e.clientY - 15) + 'px';
    });
    
    // Efecto en elementos clickeables
    const clickables = document.querySelectorAll('button, a, .galeria-item, .reason-card');
    
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// Activar cursor personalizado solo en desktop
if (window.innerWidth > 768) {
    initCustomCursor();
}

// ========================================
// EFECTO DE ESTRELLAS FUGACES (BONUS)
// ========================================

function createShootingStar() {
    const star = document.createElement('div');
    star.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: white;
        box-shadow: 0 0 10px white, 0 0 20px white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: shootingStar 2s linear forwards;
    `;
    
    // Posición aleatoria
    star.style.top = Math.random() * 30 + '%';
    star.style.left = Math.random() * 100 + '%';
    
    document.body.appendChild(star);
    
    // Remover después de la animación
    setTimeout(() => {
        star.remove();
    }, 2000);
}

// Crear estrella fugaz cada 5 segundos
setInterval(createShootingStar, 5000);

// Añadir animación de estrella fugaz si no existe
if (!document.getElementById('shootingStar-style')) {
    const style = document.createElement('style');
    style.id = 'shootingStar-style';
    style.textContent = `
        @keyframes shootingStar {
            from {
                transform: translateX(0) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-200px) translateY(200px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// EFECTO DE BRILLOS ALEATORIOS
// ========================================

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 5px;
        height: 5px;
        background: var(--gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAnim 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Añadir animación de brillo
if (!document.getElementById('sparkle-style')) {
    const style = document.createElement('style');
    style.id = 'sparkle-style';
    style.textContent = `
        @keyframes sparkleAnim {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Crear brillos en elementos importantes
document.querySelectorAll('.timeline-dot, .reason-number').forEach(el => {
    el.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createSparkle(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                );
            }, i * 100);
        }
    });
});

// ========================================
// MENSAJE EN CONSOLA
// ========================================

console.log('%c🎉 ¡Felices 15 Años Vale! 🎉', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cCon amor, siempre ❤️', 'font-size: 14px; color: #c41e3a; font-style: italic;');

console.log('✨ Sistema de animaciones inicializado');