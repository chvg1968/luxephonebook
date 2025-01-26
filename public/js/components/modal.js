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
        console.log('🔍 Extracting content from HTML:', htmlContent ? 'Content received' : 'No content');
        
        // Verificar si el contenido HTML está vacío o es undefined
        if (!htmlContent) {
            console.error('❌ HTML content is empty or undefined');
            return 'No content available';
        }

        const div = document.createElement('div');
        div.innerHTML = htmlContent;

        // Remover elementos innecesarios
        const elementsToRemove = div.querySelectorAll('head, script, link, style, a.back-to-home, #propertyTitle');
        elementsToRemove.forEach(el => el.remove());

        // Intentar varios selectores para encontrar contenido, con prioridad
        const contentSelectors = [
            // Selectores específicos de Golf Rates
            '#golf-rates-table',
            '.golf-rates-content',
            
            // Selectores generales
            '.property-content',
            'main',
            'article',
            'section',
            'table',
            'body > div',
            'body',
            'div',
            'html'
        ];

        let content = null;
        for (const selector of contentSelectors) {
            content = div.querySelector(selector);
            if (content) {
                console.log(`✅ Content found using selector: ${selector}`);
                break;
            } else {
                console.log(`❌ No content found with selector: ${selector}`);
            }
        }

        // Si no encuentra contenido, usar todo el HTML
        const extractedContent = content ? content.innerHTML : div.innerHTML;
        
        // Limpiar contenido de scripts y estilos adicionales
        const cleanedContent = extractedContent
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        
        console.log('📊 Extracted content details:', {
            length: cleanedContent.length,
            firstChars: cleanedContent.substring(0, 500)
        });
        
        return cleanedContent || 'No content available';
    }

    setContent(content) {
        console.log('Setting modal content (raw):', content);
        
        // Verificar si el contenido es undefined o null
        if (content === undefined || content === null) {
            console.error('Attempted to set undefined or null content');
            content = 'No content available';
        }

        const modalBody = this.container.querySelector('.modal-body');
        const cleanContent = this.extractContent(content);
        
        console.log('Clean content:', cleanContent);
        
        // Establecer contenido HTML con mejoras de legibilidad y scroll
        modalBody.innerHTML = `
            <div class="modal-content-wrapper">
                ${cleanContent}
            </div>
        `;

        // Establecer título basado en el ID del modal
        let title = '';
        switch(this.id) {
            case 'golf-cart-modal':
                title = 'Golf Cart Information';
                break;
            case 'kids-club-modal':
                title = "Kid's Club Information";
                break;
            case 'golf-rates-modal':
                title = 'Golf Rates and Schedule';
                break;
            default:
                title = 'Information';
        }
        
        this.container.querySelector('.modal-title').textContent = title;

        // Mejoras de estilo para legibilidad y scroll
        modalBody.style.textAlign = 'left';
        modalBody.style.padding = '1rem';
        modalBody.style.maxWidth = '100%';
        modalBody.style.margin = '0 auto';
        modalBody.style.overflowX = 'auto';
        modalBody.style.WebkitOverflowScrolling = 'touch';

        // Añadir estilos para mejorar legibilidad
        const styleTag = document.createElement('style');
        styleTag.textContent = `
            .modal-content-wrapper {
                font-size: 16px;
                line-height: 1.6;
                color: #333;
                max-width: 900px;
                margin: 0 auto;
            }
            .modal-content-wrapper table {
                width: 100%;
                min-width: 800px;
                border-collapse: collapse;
                overflow-x: auto;
                display: block;
            }
            .modal-content-wrapper table th,
            .modal-content-wrapper table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: center;
                white-space: nowrap;
            }
            .modal-content-wrapper img {
                max-width: 100%;
                height: auto;
            }
            .modal-content-wrapper .info-section {
                margin-bottom: 1rem;
            }
        `;
        modalBody.appendChild(styleTag);

        console.log('Modal content set successfully');
    }

    show() {
        console.log('Modal show method called');
        console.log('Container:', this.container);
        console.log('Overlay:', this.overlay);

        // Forzar visibilidad
        this.container.style.display = 'block';
        this.container.style.opacity = '1';
        this.container.style.visibility = 'visible';
        this.container.style.zIndex = '9999';

        // Asegurar que el overlay también sea visible
        this.overlay.style.display = 'block';
        this.overlay.style.opacity = '1';
        this.overlay.style.visibility = 'visible';
        this.overlay.style.zIndex = '9998';

        // Ocultar scroll del body
        document.body.style.overflow = 'hidden';

        // Agregar clases para animación
        this.overlay.classList.add('show');
        this.container.classList.add('show');
        
        // Forzar un reflow para asegurar que las transiciones funcionen
        void this.container.offsetHeight;

        console.log('Modal show method finished');
    }

    hide() {
        console.log('Modal hide method called');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';

        // Remover clases de animación
        this.overlay.classList.remove('show');
        this.container.classList.remove('show');
        
        // Ocultar modal y overlay
        this.container.style.display = 'none';
        this.container.style.opacity = '0';
        this.container.style.visibility = 'hidden';
        this.container.style.zIndex = '-1';

        this.overlay.style.display = 'none';
        this.overlay.style.opacity = '0';
        this.overlay.style.visibility = 'hidden';
        this.overlay.style.zIndex = '-1';

        console.log('Modal hide method finished');
    }
}