// ========================================
// SISTEMA DE MÚSICA DE FONDO - VERSIÓN MÓVIL OPTIMIZADA
// ========================================

// CONFIGURACIÓN DE LA MÚSICA
const MUSIC_PATH = 'audio/cancion.mp3';  // ← AQUÍ PON TU CANCIÓN
const DEFAULT_VOLUME = 0.5;  // Volumen inicial (0.0 a 1.0)

let audioPlayer = null;
let isPlaying = false;
let musicButton = null;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// ========================================
// CREAR REPRODUCTOR DE AUDIO
// ========================================

function initMusicPlayer() {
    // Crear elemento de audio
    audioPlayer = new Audio(MUSIC_PATH);
    audioPlayer.loop = true;  // Repetir la canción infinitamente
    audioPlayer.volume = DEFAULT_VOLUME;
    
    // Crear botón de control
    createMusicButton();
    
    console.log('🎵 Reproductor de música inicializado');
}

// ========================================
// CREAR BOTÓN DE CONTROL SIMPLE
// ========================================

function createMusicButton() {
    musicButton = document.createElement('button');
    musicButton.className = 'music-button';
    musicButton.innerHTML = '🎵';
    musicButton.title = 'Música';
    
    // Estilos del botón - OPTIMIZADO PARA MÓVIL
    musicButton.style.cssText = `
        position: fixed;
        bottom: ${isMobile ? '25px' : '30px'};
        right: ${isMobile ? '50%' : '30px'};
        transform: ${isMobile ? 'translateX(50%)' : 'none'};
        width: ${isMobile ? '70px' : '60px'};
        height: ${isMobile ? '70px' : '60px'};
        border-radius: 50%;
        background: linear-gradient(45deg, var(--gold), var(--light-red));
        border: 3px solid var(--gold);
        font-size: ${isMobile ? '2rem' : '1.8rem'};
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.5);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulse 2s infinite;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
    `;
    
    // Efecto hover solo en desktop
    if (!isMobile) {
        musicButton.addEventListener('mouseenter', () => {
            musicButton.style.transform = 'scale(1.1)';
            musicButton.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.6)';
        });
        
        musicButton.addEventListener('mouseleave', () => {
            musicButton.style.transform = 'scale(1)';
            musicButton.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.5)';
        });
    }
    
    // Efecto al tocar en móvil
    if (isMobile) {
        musicButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            musicButton.style.transform = 'translateX(50%) scale(0.95)';
        });
        
        musicButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            musicButton.style.transform = 'translateX(50%) scale(1)';
            toggleMusic();
        });
    } else {
        // Click normal en desktop
        musicButton.addEventListener('click', toggleMusic);
    }
    
    // Agregar al body
    document.body.appendChild(musicButton);
}

// ========================================
// REPRODUCIR/PAUSAR MÚSICA (SIMPLE)
// ========================================

function toggleMusic() {
    if (!audioPlayer) return;
    
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    if (!audioPlayer) return;
    
    audioPlayer.play().then(() => {
        isPlaying = true;
        musicButton.innerHTML = '⏸️';
        musicButton.title = 'Pausar música';
        musicButton.style.animation = 'rotate360 4s linear infinite';
        console.log('🎵 Música reproduciendo');
    }).catch(error => {
        console.error('Error al reproducir música:', error);
        console.log('💡 Tip: La música necesita interacción del usuario para reproducirse');
    });
}

function pauseMusic() {
    if (!audioPlayer) return;
    
    audioPlayer.pause();
    isPlaying = false;
    musicButton.innerHTML = '🎵';
    musicButton.title = 'Reproducir música';
    musicButton.style.animation = 'pulse 2s infinite';
    console.log('⏸️ Música pausada');
}

// ========================================
// INICIAR MÚSICA AL DESBLOQUEAR
// ========================================

function startMusic() {
    if (!audioPlayer) {
        initMusicPlayer();
    }
    
    // Pequeño delay para mejor experiencia
    setTimeout(() => {
        playMusic();
    }, 800);
}

// ========================================
// ANIMACIONES
// ========================================

// Agregar estilos de animación si no existen
if (!document.getElementById('music-animations')) {
    const style = document.createElement('style');
    style.id = 'music-animations';
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 10px 30px rgba(212, 175, 55, 0.5);
            }
            50% {
                box-shadow: 0 15px 40px rgba(212, 175, 55, 0.7);
            }
        }
        
        @keyframes rotate360 {
            from {
                transform: ${isMobile ? 'translateX(50%) rotate(0deg)' : 'rotate(0deg)'};
            }
            to {
                transform: ${isMobile ? 'translateX(50%) rotate(360deg)' : 'rotate(360deg)'};
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// MANEJO DE ERRORES
// ========================================

window.addEventListener('error', (e) => {
    if (e.target.tagName === 'AUDIO') {
        console.error('❌ Error al cargar la música');
        console.error('Verifica que el archivo existe en:', MUSIC_PATH);
        
        // Ocultar botón si hay error
        if (musicButton) {
            musicButton.style.display = 'none';
        }
    }
});

// ========================================
// PREVENIR QUE SE PAUSE CON CAMBIO DE PESTAÑA
// ========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // No hacer nada cuando cambia de pestaña
        // La música sigue sonando
    }
});

// ========================================
// INSTRUCCIONES EN CONSOLA
// ========================================

console.log(`
╔════════════════════════════════════════╗
║   🎵 SISTEMA DE MÚSICA SIMPLE          ║
╚════════════════════════════════════════╝

📝 CÓMO FUNCIONA:

1. La música se reproduce automáticamente
   cuando ella toque "Abrir mi regalo"
   
2. Loop infinito activado ♾️

3. Control simple:
   - Un toque = Play/Pause
   - El volumen del teléfono controla todo
   
4. Sin complicaciones, como cualquier sitio web

📁 PARA AGREGAR TU CANCIÓN:

1. Sube tu archivo MP3 a: audio/cancion.mp3
2. Descomenta en index.html:
   <script src="js/musica.js"></script>
3. ¡Listo!

🎵 Modo: ${isMobile ? 'Móvil 📱' : 'Desktop 💻'}
`);

console.log('🎵 Sistema de música listo y optimizado');