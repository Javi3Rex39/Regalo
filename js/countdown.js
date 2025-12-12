// ========================================
// COUNTDOWN Y SISTEMA DE DESBLOQUEO
// ========================================

// ========================================
// CONFIGURACIÓN DE FECHA
// ========================================

// 📅 FECHA REAL DEL CUMPLEAÑOS: 14 de diciembre de 2025 a las 00:00
// const birthdayDate = new Date('2025-12-14T00:00:00').getTime();

// 🧪 MODO DE PRUEBA: Desbloqueo en 1 minuto (para testing)
// Para activar pruebas rápidas, comenta la línea de arriba y descomenta esta:
const birthdayDate = new Date(Date.now() + 60000).getTime(); // 1 minuto desde ahora

let isUnlocked = false;

// ========================================
// FUNCIÓN PRINCIPAL DEL COUNTDOWN
// ========================================

function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    if (distance < 0 && !isUnlocked) {
        // Si ya pasó la fecha, mostrar botón de desbloqueo
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('countdownLabel').style.display = 'none';
        document.getElementById('birthdayMessage').classList.add('active');
        document.getElementById('unlockButton').classList.add('show');
        
        // Lanzar confeti automáticamente
        launchConfetti();
        return;
    }

    if (distance >= 0) {
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar el HTML con animación
        updateNumber('days', days);
        updateNumber('hours', hours);
        updateNumber('minutes', minutes);
        updateNumber('seconds', seconds);
    }
}

// ========================================
// ACTUALIZAR NÚMEROS CON ANIMACIÓN
// ========================================

function updateNumber(id, value) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const currentValue = element.textContent;
    const newValue = value.toString().padStart(2, '0');
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.textContent = newValue;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// ========================================
// LANZAR CONFETI
// ========================================

function launchConfetti() {
    const container = document.getElementById('confettiContainer');
    container.classList.add('active');
    
    const colors = ['#d4af37', '#c41e3a', '#ff1744', '#f50057'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(confetti);
            
            // Remover confeti después de que termine la animación
            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }
}

// ========================================
// LANZAR PÉTALOS
// ========================================

function launchPetals() {
    const container = document.getElementById('petalsContainer');
    container.classList.add('active');
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = (Math.random() * 4 + 3) + 's';
            petal.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(petal);
            
            // Remover pétalo después de que termine la animación
            setTimeout(() => petal.remove(), 7000);
        }, i * 30);
    }
}

// ========================================
// DESBLOQUEAR CONTENIDO
// ========================================

function unlockContent() {
    isUnlocked = true;
    const overlay = document.getElementById('lockOverlay');
    overlay.classList.add('hidden');
    
    // Lanzar pétalos al desbloquear
    setTimeout(() => {
        launchPetals();
    }, 500);
    
    // Activar animaciones del timeline
    setTimeout(() => {
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }, 1000);

    // Activar animaciones de deseos
    setTimeout(() => {
        document.querySelectorAll('.wish-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 150);
        });
    }, 2000);
    
    // Reproducir música si está disponible
    // SIN DELAY - El click del botón cuenta como interacción del usuario
    if (typeof startMusic === 'function') {
        startMusic();
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

// Botón de desbloqueo
document.getElementById('unlockButton').addEventListener('click', unlockContent);

// Iniciar countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// Observador para animaciones de scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && isUnlocked) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos los elementos animables
document.querySelectorAll('.timeline-item, .wish-item').forEach(item => {
    observer.observe(item);
});

// Transición suave a los números del countdown
document.querySelectorAll('.countdown-number').forEach(num => {
    num.style.transition = 'transform 0.2s ease';
});

// ========================================
// INFORMACIÓN EN CONSOLA
// ========================================

console.log('🎉 Countdown inicializado correctamente');

// Mostrar información según el modo
if (birthdayDate > Date.now() + 86400000) { // Si es más de 1 día
    const fechaObjetivo = new Date(birthdayDate);
    console.log('📅 MODO PRODUCCIÓN');
    console.log('🎂 Fecha objetivo: ' + fechaObjetivo.toLocaleString('es-ES'));
} else {
    console.log('🧪 MODO DE PRUEBA: El contador expirará pronto');
    console.log('💡 Para usar la fecha real, edita countdown.js líneas 7-12');
}