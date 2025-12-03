// ========================================
// MIS DESEOS PARA TI
// ========================================

// PUEDES EDITAR ESTOS DESEOS FÁCILMENTE
const deseos = [
    "Que este nuevo año de vida esté lleno de aventuras increíbles",
    "Que todos tus sueños más grandes se hagan realidad",
    "Que la felicidad te acompañe en cada paso que des",
    "Que encuentres éxito en todo lo que te propongas",
    "Que tu corazón siempre esté lleno de amor y alegría",
    "Que cada día sea mejor que el anterior",
    "Que tengas la fuerza para superar cualquier obstáculo",
    "Que tu sonrisa nunca se apague"
];

// Iconos para cada deseo
const iconos = ['✨', '🌟', '💫', '⭐', '🌠', '💝', '🎊', '🎉'];

// ========================================
// GENERAR LOS DESEOS
// ========================================

function cargarDeseos() {
    const wishesContainer = document.getElementById('wishesContainer');
    
    if (!wishesContainer) {
        console.error('No se encontró el elemento wishesContainer');
        return;
    }
    
    // Limpiar contenido previo
    wishesContainer.innerHTML = '';
    
    // Crear un item por cada deseo
    deseos.forEach((deseo, index) => {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        
        const icon = document.createElement('span');
        icon.className = 'wish-icon';
        icon.textContent = iconos[index % iconos.length];
        
        const text = document.createElement('span');
        text.className = 'wish-text';
        text.textContent = deseo;
        
        wishItem.appendChild(icon);
        wishItem.appendChild(text);
        
        // Agregar efecto de hover especial
        wishItem.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.3) rotate(360deg)';
            icon.style.transition = 'all 0.5s ease';
        });
        
        wishItem.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
        
        wishesContainer.appendChild(wishItem);
    });
    
    console.log(`🌟 ${deseos.length} deseos cargados correctamente`);
}

// ========================================
// ANIMACIÓN DE APARICIÓN AL HACER SCROLL
// ========================================

const deseosObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, {
    threshold: 0.3
});

// ========================================
// INICIALIZAR AL CARGAR LA PÁGINA
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    cargarDeseos();
    
    // Observar los deseos para animarlos
    setTimeout(() => {
        document.querySelectorAll('.wish-item').forEach(wish => {
            deseosObserver.observe(wish);
        });
    }, 100);
});

// ========================================
// FUNCIONES ÚTILES (OPCIONAL)
// ========================================

function agregarDeseo(nuevoDeseo, icono = '✨') {
    deseos.push(nuevoDeseo);
    iconos.push(icono);
    cargarDeseos();
    console.log('➕ Nuevo deseo agregado:', nuevoDeseo);
}

function editarDeseo(indice, nuevoDeseo) {
    if (indice >= 0 && indice < deseos.length) {
        deseos[indice] = nuevoDeseo;
        cargarDeseos();
        console.log(`✏️ Deseo ${indice + 1} editado:`, nuevoDeseo);
    } else {
        console.error('Índice fuera de rango');
    }
}

console.log('🌟 Sistema de deseos inicializado');