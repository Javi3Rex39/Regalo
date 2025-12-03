// ========================================
// SISTEMA DE MÚSICA DE FONDO
// ========================================

// CONFIGURACIÓN DE LA MÚSICA
// Cambia esta ruta por la de tu canción
const MUSIC_PATH = 'audio/cancion.mp3';  // ← AQUÍ PON TU CANCIÓN
const DEFAULT_VOLUME = 0.3;  // Volumen inicial (0.0 a 1.0)

let audioPlayer = null;
let isPlaying = false;
let musicButton = null;

// ========================================
// CREAR REPRODUCTOR DE AUDIO
// ========================================

function initMusicPlayer() {
    // Crear elemento de audio
    audioPlayer = new Audio(MUSIC_PATH);
    audioPlayer.loop = true;  // Repetir la canción
    audioPlayer.volume = DEFAULT_VOLUME;
    
    // Crear botón de control
    createMusicButton();
    
    console.log('🎵 Reproductor de música inicializado');
}

// ========================================
// CREAR BOTÓN DE CONTROL
// ========================================

function createMusicButton() {
    musicButton = document.createElement('button');
    musicButton.className = 'music-button';
    musicButton.innerHTML = '🎵';
    musicButton.title = 'Reproducir música';
    
    // Estilos del botón
    musicButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(45deg, var(--gold), var(--light-red));
        border: 3px solid var(--gold);
        font-size: 1.8rem;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulse 2s infinite;
    `;
    
    // Efecto hover
    musicButton.addEventListener('mouseenter', () => {
        musicButton.style.transform = 'scale(1.1)';
        musicButton.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.6)';
    });
    
    musicButton.addEventListener('mouseleave', () => {
        musicButton.style.transform = 'scale(1)';
        musicButton.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.4)';
    });
    
    // Click para reproducir/pausar
    musicButton.addEventListener('click', toggleMusic);
    
    // Agregar al body
    document.body.appendChild(musicButton);
}

// ========================================
// REPRODUCIR/PAUSAR MÚSICA
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
        musicButton.style.animation = 'rotate360 3s linear infinite';
        console.log('🎵 Música reproduciendo');
    }).catch(error => {
        console.error('Error al reproducir música:', error);
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
// FUNCIÓN PARA INICIAR MÚSICA (LLAMADA DESDE COUNTDOWN.JS)
// ========================================

function startMusic() {
    if (!audioPlayer) {
        initMusicPlayer();
    }
    
    // Pequeño delay para mejor experiencia
    setTimeout(() => {
        playMusic();
    }, 500);
}

// ========================================
// CONTROL DE VOLUMEN CON RUEDA DEL RATÓN (OPCIONAL)
// ========================================

if (musicButton) {
    musicButton.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (e.deltaY < 0) {
            // Subir volumen
            audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.1);
        } else {
            // Bajar volumen
            audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.1);
        }
        
        // Mostrar feedback visual
        showVolumeIndicator(Math.round(audioPlayer.volume * 100));
    });
}

// ========================================
// INDICADOR VISUAL DE VOLUMEN
// ========================================

function showVolumeIndicator(volume) {
    let indicator = document.getElementById('volume-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'volume-indicator';
        indicator.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: rgba(20, 0, 0, 0.9);
            border: 2px solid var(--gold);
            border-radius: 10px;
            padding: 10px 20px;
            color: var(--gold);
            font-size: 1rem;
            z-index: 10001;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(indicator);
    }
    
    indicator.textContent = `🔊 ${volume}%`;
    indicator.style.display = 'block';
    
    // Ocultar después de 2 segundos
    clearTimeout(indicator.timeout);
    indicator.timeout = setTimeout(() => {
        indicator.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            indicator.style.display = 'none';
            indicator.style.animation = 'fadeIn 0.3s ease';
        }, 300);
    }, 2000);
}

// ========================================
// INICIALIZAR AL CARGAR LA PÁGINA
// ========================================

// NO se inicializa automáticamente, se llama desde countdown.js
// cuando se desbloquea el contenido

// Si quieres que se inicie automáticamente al cargar la página,
// descomenta esta línea:
// document.addEventListener('DOMContentLoaded', initMusicPlayer);

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
// INSTRUCCIONES EN CONSOLA
// ========================================

console.log(`
╔════════════════════════════════════════╗
║   🎵 SISTEMA DE MÚSICA CONFIGURADO     ║
╚════════════════════════════════════════╝

📝 CÓMO AGREGAR TU CANCIÓN:

1. Sube tu archivo MP3 a la carpeta: audio/
2. Nómbralo: cancion.mp3
3. O cambia MUSIC_PATH en este archivo
4. Descomenta la línea en index.html:
   <script src="js/musica.js"></script>

🎵 La música se reproducirá automáticamente
   cuando se desbloquee el contenido.

💡 CONTROLES:
   - Click: Play/Pause
   - Rueda del ratón: Ajustar volumen
`);

console.log('🎵 Sistema de música listo');