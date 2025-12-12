// ========================================
// SISTEMA DE MÚSICA DE FONDO - VERSIÓN MÓVIL OPTIMIZADA
// ========================================

// CONFIGURACIÓN DE LA MÚSICA
const MUSIC_PATH = 'audio/cancion.mp3';  // ← AQUÍ PON TU CANCIÓN
const DEFAULT_VOLUME = 0.5;  // Volumen inicial (0.0 a 1.0)

let audioPlayer = null;
let isPlaying = false;
let musicButton = null;
const isMobileMusic = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// ========================================
// CREAR REPRODUCTOR DE AUDIO
// ========================================

function initMusicPlayer() {
    // Crear elemento de audio
    audioPlayer = new Audio(MUSIC_PATH);
    audioPlayer.loop = true;  // Repetir la canción infinitamente
    audioPlayer.volume = DEFAULT_VOLUME;
    
    // IMPORTANTE: Pre-cargar el audio
    audioPlayer.load();
    
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
        bottom: ${isMobileMusic ? '25px' : '30px'};
        right: ${isMobileMusic ? '50%' : '30px'};
        transform: ${isMobileMusic ? 'translateX(50%)' : 'none'};
        width: ${isMobileMusic ? '70px' : '60px'};
        height: ${isMobileMusic ? '70px' : '60px'};
        border-radius: 50%;
        background: linear-gradient(45deg, var(--gold), var(--light-red));
        border: 3px solid var(--gold);
        font-size: ${isMobileMusic ? '2rem' : '1.8rem'};
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.5);
        transition: all 0.3s ease;
        display: none;
        align-items: center;
        justify-content: center;
        animation: pulse 2s infinite;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        opacity: 0;
    `;
    
    // Efecto hover solo en desktop
    if (!isMobileMusic) {
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
    if (isMobileMusic) {
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
    if (!audioPlayer) {
        console.error('❌ audioPlayer no inicializado');
        return;
    }
    
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    if (!audioPlayer) {
        console.error('❌ audioPlayer no existe');
        return;
    }
    
    // Intentar reproducir
    const playPromise = audioPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            musicButton.innerHTML = '⏸️';
            musicButton.title = 'Pausar música';
            musicButton.style.animation = 'rotate360 4s linear infinite';
            console.log('🎵 Música reproduciendo');
        }).catch(error => {
            console.error('❌ Error al reproducir música:', error);
            console.log('💡 La música necesita interacción del usuario');
            
            // Mostrar mensaje al usuario
            showMusicError();
        });
    }
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
// MOSTRAR ERROR SI LA MÚSICA NO SE REPRODUCE
// ========================================

function showMusicError() {
    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = `
        position: fixed;
        bottom: ${isMobileMusic ? '110px' : '100px'};
        right: ${isMobileMusic ? '50%' : '30px'};
        transform: ${isMobileMusic ? 'translateX(50%)' : 'none'};
        background: rgba(0, 0, 0, 0.9);
        color: var(--gold);
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 0.9rem;
        z-index: 9999;
        text-align: center;
        max-width: 250px;
        animation: fadeIn 0.3s ease;
    `;
    errorMsg.textContent = '👆 Toca el botón de música para reproducir';
    
    document.body.appendChild(errorMsg);
    
    setTimeout(() => {
        errorMsg.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => errorMsg.remove(), 300);
    }, 3000);
}

// ========================================
// INICIAR MÚSICA AL DESBLOQUEAR
// ========================================

function startMusic() {
    console.log('🎵 Intentando iniciar música...');
    
    if (!audioPlayer) {
        console.log('🎵 Inicializando reproductor...');
        initMusicPlayer();
    }
    
    // Mostrar el botón de música con animación
    if (musicButton) {
        musicButton.style.display = 'flex';
        setTimeout(() => {
            musicButton.style.opacity = '1';
        }, 100);
    }
    
    // Intentar reproducir INMEDIATAMENTE (sin delay)
    // Esto es crucial porque el click en el botón cuenta como interacción del usuario
    playMusic();
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
                transform: ${isMobileMusic ? 'translateX(50%) rotate(0deg)' : 'rotate(0deg)'};
            }
            to {
                transform: ${isMobileMusic ? 'translateX(50%) rotate(360deg)' : 'rotate(360deg)'};
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
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
        
        // Mostrar mensaje de error
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(196, 30, 58, 0.9);
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            z-index: 99999;
            font-size: 0.9rem;
        `;
        errorMsg.textContent = '❌ No se pudo cargar la música. Verifica el archivo.';
        document.body.appendChild(errorMsg);
        
        setTimeout(() => errorMsg.remove(), 5000);
        
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
// INICIALIZAR EN CUANTO SE CARGA LA PÁGINA
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el reproductor desde el principio
    initMusicPlayer();
    console.log('🎵 Sistema de música pre-cargado y listo');
});

// ========================================
// INSTRUCCIONES EN CONSOLA
// ========================================

console.log(`
╔════════════════════════════════════════╗
║   🎵 SISTEMA DE MÚSICA MEJORADO        ║
╚════════════════════════════════════════╝

📝 MEJORAS IMPLEMENTADAS:

1. ✅ Pre-carga del audio al cargar la página
2. ✅ Reproducción INMEDIATA al hacer click
3. ✅ Mejor manejo de errores
4. ✅ Mensajes de ayuda si falla
5. ✅ Detección de archivo inexistente

📁 VERIFICAR:

1. El archivo debe estar en: audio/cancion.mp3
2. Debe ser formato MP3 válido
3. El archivo debe existir y ser accesible

🎵 Modo: ${isMobileMusic ? 'Móvil 📱' : 'Desktop 💻'}
`);