// Modal.js
// En CategoryTree.js y Modal.js
import { icons, modalSectionMap } from './config.js';
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
            // Selectores específicos de Golf Rates y Golf Cart
            '#golf-rates-table',
            '.golf-rates-content',
            '.golf-cart-content',
            
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
        
        return cleanedContent;
    }

    generateContactsSection(selectedCategory = null) {
        try {
            // Importar dinámicamente los contactos
            const { contacts } = window.contactsModule || { contacts: [] };
            const { filterContacts } = window.filtersModule || { filterContacts: () => [] };
            
            // Mapeo de modales a secciones y categorías
            const modalSectionMap = {
                'golf-cart-modal': {
                    section: 'Golf',
                    category: 'Golf Cart'
                },
                'golf-rates-modal': {
                    section: 'Golf',
                    category: 'Golf Schedule and Rates'
                },
                'emergency-modal': {
                    section: 'Emergency',
                    category: null
                },
                'restaurant-modal': {
                    section: 'Resort restaurants and venues',
                    category: selectedCategory || 'Restaurants'
                },
                'kids-club-modal': {
                    section: 'Resort activities and adventures',
                    category: "Kid's Club"
                },
                'tennis-modal': {
                    section: 'Resort activities and adventures',
                    category: 'Tennis Reservations'
                },
                'catering-modal': {
                    section: 'Catering/delivery/special services',
                    category: selectedCategory || null
                },
                'off-property-modal': {
                    section: 'Off property',
                    category: selectedCategory || null
                }
            };
            
            // Obtener la sección y categoría para este modal
            const modalConfig = modalSectionMap[this.id] || {};
            const section = modalConfig.section;
            const category = modalConfig.category || selectedCategory;
            
            console.log('Generating contacts for modal:', {
                modalId: this.id,
                section: section,
                category: category
            });
            
            // Preparar filtros para filterContacts
            const filters = {
                section: section,
                category: category
            };
            
            // Filtrar contactos usando filterContacts
            const relevantContacts = filterContacts(contacts, filters);
            
            console.log('Relevant contacts:', relevantContacts);
            
            // Generar HTML para contactos
            if (relevantContacts.length > 0) {
                const contactsHTML = relevantContacts.map(contact => {
                    // Obtener el icono para la categoría o sección del contacto
                    const icons = window.cardModule?.icons || {};
                    const iconClass = icons[contact.category] || 
                                      icons[contact.section] || 
                                      'fa-phone';
                    
                    return `
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas ${iconClass}"></i>
                            </div>
                            <div class="contact-details">
                                <div class="contact-name">${contact.name}</div>
                                <div class="contact-phone">${contact.phone || 'N/A'}</div>
                                <div class="contact-description">${contact.description || ''}</div>
                            </div>
                        </div>
                    `;
                }).join('');
                
                return `
                    <div class="contacts-section">
                        <h4>Contactos Relacionados</h4>
                        <div class="contacts-container">
                            ${contactsHTML}
                        </div>
                    </div>
                `;
            }
            
            return '';
        } catch (error) {
            console.error('Error generating contacts section:', error);
            return '';
        }
    }

    setContent(content, selectedCategory = null) {
        console.log('Setting modal content (raw):', content);
        
        // Verificar si el contenido es undefined o null
        if (content === undefined || content === null) {
            console.error('Attempted to set undefined or null content');
            content = 'No content available';
        }

        const modalBody = this.container.querySelector('.modal-body');
        const cleanContent = this.extractContent(content);
        
        console.log('Clean content:', cleanContent);
        
        // Generar sección de contactos
        const contactsHTML = this.generateContactsSection(selectedCategory);
        
        // Establecer contenido HTML con mejoras de legibilidad y scroll
        modalBody.innerHTML = `
            <div class="modal-content-wrapper">
                ${cleanContent}
                ${contactsHTML}
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
            case 'tennis-modal':
                title = 'Tennis Information';
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
            .contacts-section {
                margin-top: 1rem;
                border-top: 1px solid #eee;
                padding-top: 1rem;
            }
            .contacts-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
            }
            .contact-item {
                display: flex;
                align-items: center;
                background-color: #f9f9f9;
                border-radius: 8px;
                padding: 0.75rem;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .contact-icon {
                margin-right: 1rem;
                font-size: 1.5rem;
                color: #007bff;
            }
            .contact-details {
                flex-grow: 1;
            }
            .contact-name {
                font-weight: bold;
                margin-bottom: 0.25rem;
            }
            .contact-phone, .contact-description {
                color: #666;
                font-size: 0.9rem;
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

    async loadContent(filename) {
        try {
            // Construir la ruta completa al archivo
            const baseUrl = this._getBaseUrl();
            const fullPath = `${baseUrl}/public/pages/${filename}`;
            
            console.log(`🔍 Attempting to load modal content from: ${fullPath}`);
            
            const response = await fetch(fullPath, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const content = await response.text();
            
            // Verificar si el contenido está vacío
            if (!content || content.trim() === '') {
                console.error(`❌ No content found in file: ${filename}`);
                return `
                    <div class="property-content error-content">
                        <h2>Content Not Available</h2>
                        <p>We apologize, but the content for ${filename} could not be loaded.</p>
                    </div>
                `;
            }
            
            console.log('✅ Loaded modal content successfully');
            return content;
        } catch (error) {
            console.error(`❌ Error loading modal content from ${filename}:`, error);
            
            return `
                <div class="property-content error-content">
                    <h2>Content Loading Error</h2>
                    <p>We apologize, but the requested content could not be loaded.</p>
                    <p>Error details: ${error.message}</p>
                    <p>Filename: ${filename}</p>
                </div>
            `;
        }
    }

    _getBaseUrl() {
        // Primero intentar window.location.origin
        if (window.location.origin) {
            return window.location.origin;
        }
        
        // Fallback: construir manualmente
        const port = window.location.port ? `:${window.location.port}` : '';
        return `${window.location.protocol}//${window.location.hostname}${port}`;
    }

    open() {
        console.log('Modal open method called');
        console.log('Container:', this.container);
        console.log('Overlay:', this.overlay);
        
        try {
            // Añadir clases para mostrar el modal
            if (this.container) {
                this.container.classList.add('show');
                this.container.style.display = 'block';
            }
            
            if (this.overlay) {
                this.overlay.classList.add('show');
                this.overlay.style.display = 'block';
            }
            
            // Centrar el modal
            if (this.container) {
                this.container.style.position = 'fixed';
                this.container.style.top = '50%';
                this.container.style.left = '50%';
                this.container.style.transform = 'translate(-50%, -50%)';
                this.container.style.zIndex = '1000';
            }
            
            // Añadir evento de cierre con Escape
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    this.hide();
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
            
            console.log('Modal opened successfully');
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    }

    show() {
        console.log('Modal show method called');
        console.log('Container:', this.container);
        
        // Alias para open(), mantener por compatibilidad
        this.open();
    }

    hide() {
        console.log('Modal hide method called');
        
        try {
            // Remover clases para ocultar el modal
            if (this.container) {
                this.container.classList.remove('show');
                this.container.style.display = 'none';
            }
            
            if (this.overlay) {
                this.overlay.classList.remove('show');
                this.overlay.style.display = 'none';
            }
            
            console.log('Modal hidden successfully');
        } catch (error) {
            console.error('Error hiding modal:', error);
        }
    }
}