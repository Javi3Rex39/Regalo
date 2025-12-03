// ========================================
// LAS 15 RAZONES POR LAS QUE TE AMO
// ========================================

// PUEDES EDITAR ESTAS RAZONES FÁCILMENTE
const razones = [
    "Tu sonrisa ilumina cada uno de mis días",
    "Tu forma de ser auténtica y genuina",
    "Como me haces reír incluso en momentos difíciles",
    "Tu corazón noble y generoso",
    "La forma en que me entiendes sin necesidad de palabras",
    "Tu belleza tanto interior como exterior",
    "Como me apoyas en todo lo que hago",
    "Tu dulzura y ternura conmigo",
    "Los momentos especiales que creamos juntos",
    "Como haces que cada día sea mejor",
    "Tu inteligencia y forma de ver el mundo",
    "La paz que siento cuando estoy contigo",
    "Como me inspiras a ser mejor persona",
    "Tus detalles y gestos de amor",
    "Porque eres tú, simplemente tú"
];

// ========================================
// GENERAR LAS TARJETAS DE RAZONES
// ========================================

function cargarRazones() {
    const reasonsGrid = document.getElementById('reasonsGrid');
    
    if (!reasonsGrid) {
        console.error('No se encontró el elemento reasonsGrid');
        return;
    }
    
    // Limpiar contenido previo
    reasonsGrid.innerHTML = '';
    
    // Crear una tarjeta por cada razón
    razones.forEach((razon, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        
        const number = document.createElement('div');
        number.className = 'reason-number';
        number.textContent = index + 1;
        
        const text = document.createElement('div');
        text.className = 'reason-text';
        text.textContent = razon;
        
        card.appendChild(number);
        card.appendChild(text);
        
        // Agregar evento de click para efecto especial
        card.addEventListener('click', () => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'scaleUp 0.4s ease';
            }, 10);
        });
        
        reasonsGrid.appendChild(card);
    });
    
    console.log(`💕 ${razones.length} razones cargadas correctamente`);
}

// ========================================
// ANIMACIÓN DE APARICIÓN AL HACER SCROLL
// ========================================

const razonesobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, {
    threshold: 0.2
});

// ========================================
// INICIALIZAR AL CARGAR LA PÁGINA
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    cargarRazones();
    
    // Observar las tarjetas para animarlas
    setTimeout(() => {
        document.querySelectorAll('.reason-card').forEach(card => {
            razonesObserver.observe(card);
        });
    }, 100);
});

// ========================================
// FUNCIÓN PARA AGREGAR UNA RAZÓN (OPCIONAL)
// ========================================

function agregarRazon(nuevaRazon) {
    razones.push(nuevaRazon);
    cargarRazones();
    console.log('➕ Nueva razón agregada:', nuevaRazon);
}

// ========================================
// FUNCIÓN PARA EDITAR UNA RAZÓN (OPCIONAL)
// ========================================

function editarRazon(indice, nuevaRazon) {
    if (indice >= 0 && indice < razones.length) {
        razones[indice] = nuevaRazon;
        cargarRazones();
        console.log(`✏️ Razón ${indice + 1} editada:`, nuevaRazon);
    } else {
        console.error('Índice fuera de rango');
    }
}

console.log('💕 Sistema de razones inicializado');