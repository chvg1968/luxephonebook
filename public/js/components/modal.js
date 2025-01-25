// Modal.js
export class Modal {
    constructor(id = null) {
        this.id = id;
        this.overlay = null;
        this.container = null;
        this.createModal();
    }

    createModal() {
        // Limpiar modal existente si existe
        if (this.id) {
            const existingOverlay = document.getElementById(`${this.id}-overlay`);
            const existingContainer = document.getElementById(`${this.id}-container`);
            if (existingOverlay) existingOverlay.remove();
            if (existingContainer) existingContainer.remove();
        }

        // Crear overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        if (this.id) this.overlay.id = `${this.id}-overlay`;

        // Crear contenedor
        this.container = document.createElement('div');
        this.container.className = 'modal-container';
        if (this.id) this.container.id = `${this.id}-container`;
        
        this.container.innerHTML = `
            <div class="modal-header">
                <button type="button" class="modal-close" aria-label="Close">&times;</button>
            </div>
            <h3 class="modal-title"></h3>
            <div class="modal-content">
                <div class="modal-body"></div>
            </div>
        `;

        // Agregar al DOM
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.container);

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Cerrar con el botón
        const closeBtn = this.container.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.hide());

        // Cerrar al hacer clic en el overlay
        this.overlay.addEventListener('click', (e) => {
            // Solo cerrar si se hizo clic directamente en el overlay
            if (e.target === this.overlay) {
                this.hide();
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('show')) {
                this.hide();
            }
        });
    }

    extractContent(htmlContent) {
        const div = document.createElement('div');
        div.innerHTML = htmlContent;

        // Remover elementos innecesarios
        const elementsToRemove = div.querySelectorAll('head, script, link, a.back-to-home, #propertyTitle');
        elementsToRemove.forEach(el => el.remove());

        // Obtener el contenido relevante
        const propertyContent = div.querySelector('.property-content');
        return propertyContent ? propertyContent.innerHTML : div.innerHTML;
    }

    setContent(content) {
        const modalBody = this.container.querySelector('.modal-body');
        const cleanContent = this.extractContent(content);
        modalBody.innerHTML = cleanContent;

        // Establecer título basado en el ID del modal
        let title = '';
        if (this.id === 'golf-cart-modal') {
            title = 'Golf Cart Information';
            // Eliminar el título dentro del contenido para Golf Cart
            const contentTitle = modalBody.querySelector('h1');
            if (contentTitle) {
                contentTitle.remove();
            }
        } else if (this.id === 'kids-club-modal') {
            title = "Kid's Club Information";
        }
        
        this.container.querySelector('.modal-title').textContent = title;

        // Centrar contenido
        modalBody.style.textAlign = 'center';
        modalBody.style.padding = '2rem';
    }

    show() {
        document.body.style.overflow = 'hidden';
        this.overlay.classList.add('show');
        this.container.classList.add('show');
        
        // Asegurar que el contenedor esté visible
        this.container.style.display = 'block';
        
        // Forzar un reflow para asegurar que las transiciones funcionen
        void this.container.offsetHeight;
    }

    hide() {
        document.body.style.overflow = '';
        this.overlay.classList.remove('show');
        this.container.classList.remove('show');
        
        // Ocultar después de una pequeña transición
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 200);
    }
}