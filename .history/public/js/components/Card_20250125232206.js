// Card.js
import { Modal } from './Modal.js';

export class Card {
    constructor(data) {
        this.data = data;
        this.modal = new Modal('golf-cart-modal');
        this.kidsClubModal = new Modal('kids-club-modal');
        this.golfRatesModal = new Modal('golf-rates-modal');
        this.modalInstances = {};
        this.icons = {
            // Emergency
            "Emergency": "fa-kit-medical",
            "Doctor": "fa-user-doctor",
            "Hospital": "fa-hospital",
            "Security": "fa-shield",
            "Reception": "fa-bell-concierge",
            
            // Golf Cart
            "Golf Cart": "fa-golf-cart",
            "Golf": "fa-golf-ball-tee",
            
            // Golf Rates
            "Golf Schedule and Rates": "fa-golf-ball-tee",
            
            // Restaurants and venues
            "Restaurant": "fa-utensils",
            "Bar": "fa-martini-glass-citrus",
            "Hotel": "fa-hotel",
            "Spa": "fa-spa",
            "Wellness Center": "fa-heart-pulse",
            "Wellness center": "fa-heart-pulse",
            
            // Activities
            "Scuba Diving Tours": "fa-water",
            "Aqua Tours": "fa-ship",
            "Tennis Reservations": "fa-table-tennis-paddle-ball",
            "Activities Reservations": "fa-person-swimming",
            "Concierge": "fa-bell-concierge",
            "Concierge Services": "fa-bell-concierge",
            
            // Services
            "Personal Chefs": "👨‍🍳",
            "Personal Chefs and Catering": "👨‍🍳",
            "Pre-Made Meals and Catering": "fa-plate-wheat",
            "Butler Services": "fa-user-tie",
            "Shopping": "fa-shopping-bag",
            "Transportation": "fa-taxi",
            "Delivery Services": "fa-truck-fast",
            "Nanny Services": "fa-baby",
            "Professional Photography": "fa-camera",
            "Personal Care and Fitness": "fa-hand-sparkles",
            "Kid's Club": "fa-children",
            
            // Sections (como fallback)
            "Off property": "fa-map-location-dot",
            "Resort restaurants and venues": "fa-utensils",
            "Resort activities and adventures": "fa-umbrella-beach",
            "Transportation/transfer": "fa-taxi",
            "Catering/delivery/special services": "fa-concierge-bell"
        };
    }

    getIconClass(name, category) {
        const nameLower = name.toLowerCase();
        const categoryLower = category.toLowerCase();
        
        // Casos especiales para chefs
        if (categoryLower.includes('chef') || categoryLower.includes('catering')) {
            return "👨‍🍳";
        }
        
        const icon = this.icons[category];
        
        // Si es un emoji, devolverlo directamente
        if (icon && !icon.startsWith('fa-')) {
            return icon;
        }
        
        // Si no es un emoji, devolver la clase de Font Awesome
        return icon ? `fa-solid ${icon}` : 'fa-solid fa-circle-info';
    }

    openModal(modalLink) {
        // Prevent default modal behavior
        if (!modalLink) {
            console.error('No modal link provided');
            return;
        }

        // Create a unique modal ID based on the contact name
        const modalId = this.data.name.replace(/\s+/g, '-').toLowerCase() + '-modal';

        // Create or reuse modal instance
        let modal = this.modalInstances && this.modalInstances[modalId];
        if (!modal) {
            modal = new Modal({
                id: modalId,
                title: this.data.name
            });
            
            // Store modal instance to prevent multiple creations
            this.modalInstances = this.modalInstances || {};
            this.modalInstances[modalId] = modal;
        }

        // Construct full modal link
        // Use relative path from the current domain
        const fullModalLink = modalLink.startsWith('/') 
            ? `${window.location.origin}${modalLink}` 
            : `${window.location.origin}/public/pages/${modalLink}`;

        console.group('Modal Content Extraction Debug');
        console.log('Modal opening details:', {
            modalId: modalId,
            originalLink: modalLink,
            fullModalLink: fullModalLink,
            contactName: this.data.name,
            currentOrigin: window.location.origin
        });

        // Fetch modal content
        fetch(fullModalLink)
            .then(response => {
                console.log('Fetch response details:', {
                    status: response.status,
                    statusText: response.statusText,
                    contentType: response.headers.get('content-type')
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                // Log raw HTML content
                console.log('Raw HTML Content:', {
                    length: htmlContent.length,
                    firstChars: htmlContent.substring(0, 500)
                });

                // Use DOMParser to parse the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');

                // Extensive debugging of document structure
                console.log('Document Structure:', {
                    documentElement: doc.documentElement.outerHTML,
                    bodyChildren: Array.from(doc.body.children).map(el => el.tagName),
                    mainElements: Array.from(doc.querySelectorAll('main')).map(main => main.outerHTML)
                });

                // Multiple fallback strategies for content extraction
                const contentExtractors = [
                    () => doc.querySelector('main.container'),
                    () => doc.querySelector('main'),
                    () => doc.querySelector('body'),
                    () => {
                        const div = document.createElement('div');
                        div.innerHTML = htmlContent;
                        return div;
                    }
                ];

                let extractedContent = null;
                for (const extractor of contentExtractors) {
                    const content = extractor();
                    if (content) {
                        console.log('Content extracted by:', extractor.name);
                        extractedContent = content;
                        break;
                    }
                }

                if (!extractedContent) {
                    throw new Error('No content could be extracted from the page');
                }

                // Create a container for modal content
                const modalContentContainer = document.createElement('div');
                modalContentContainer.className = 'modal-full-content';

                // Deep clone the content to preserve all elements
                const clonedContent = extractedContent.cloneNode(true);

                // Remove potentially problematic elements
                clonedContent.querySelectorAll('script, style, link[rel="stylesheet"]').forEach(el => el.remove());

                // Remove inline styles and potentially conflicting attributes
                clonedContent.querySelectorAll('[style], [class^="modal"]').forEach(el => {
                    el.removeAttribute('style');
                    el.removeAttribute('class');
                });

                // Append cloned content to container
                modalContentContainer.appendChild(clonedContent);

                // Get innerHTML of the container
                const mainContent = modalContentContainer.innerHTML;

                console.log('Extracted Modal Content:', {
                    contentLength: mainContent.length,
                    firstChars: mainContent.substring(0, 500)
                });
                console.groupEnd();

                // Set and show modal content
                modal.setContent(mainContent);
                modal.show();
            })
            .catch(error => {
                console.error('Modal content loading error:', {
                    modalId: modalId,
                    error: error.message,
                    stack: error.stack,
                    fullModalLink: fullModalLink
                });
                console.groupEnd();
                
                // Fallback error content
                modal.setContent(`
                    <div class="modal-error">
                        <h2>Content Loading Error</h2>
                        <p>We apologize, but the requested content could not be loaded.</p>
                        <p>Error: ${error.message}</p>
                        <p>Requested URL: ${fullModalLink}</p>
                        <p>Current Origin: ${window.location.origin}</p>
                        <p>Possible Solutions:
                            <ul>
                                <li>Check file path</li>
                                <li>Verify server configuration</li>
                                <li>Ensure file exists</li>
                            </ul>
                        </p>
                    </div>
                `);
                modal.show();
            });
    }

    render() {
        const card = document.createElement('div');
        card.className = 'contact-card';
        
        const icon = this.getIconClass(this.data.name, this.data.category);
        const isEmoji = icon && !icon.startsWith('fa-');
        
        let descriptionHtml = '';
        if (this.data.description) {
            // Solo agregar enlace de información para tarjetas específicas
            if (this.data.name === 'Golf') {
                descriptionHtml = `
                    <p class="description">
                        ${this.data.description}
                        <a href="#" class="info-link">Important information about Golf Cart</a>
                    </p>`;
            } else if (this.data.name === "St Regis Kid's Club") {
                descriptionHtml = `
                    <p class="description">
                        ${this.data.description}
                        <a href="#" class="info-link">View Kids Club details</a>
                    </p>`;
            } else if (this.data.name === 'Golf Schedule and Rates') {
                descriptionHtml = `
                    <p class="description">
                        ${this.data.description}
                        <a href="#" class="info-link">See Golf Schedule and Rates</a>
                    </p>`;
            } else if (this.data.name === 'Golf Shop' || this.data.category === 'Golf Shop') {
                // Eliminar completamente el enlace de modal para Golf Shop
                descriptionHtml = `<p class="description">${this.data.description}</p>`;
            } else {
                // Para todas las demás tarjetas, solo mostrar descripción sin enlace
                descriptionHtml = `<p class="description">${this.data.description}</p>`;
            }
        }
        
        card.innerHTML = `
            <div class="card-header">
                ${isEmoji ? 
                    `<span class="emoji-icon">${icon}</span>` : 
                    `<i class="${icon}"></i>`
                }
                <h3>${this.data.name}</h3>
            </div>
            <div class="card-body">
                <p class="phone">${this.data.phone || 'No phone number available'}</p>
                ${descriptionHtml}
            </div>
        `;

        // Agregar eventos para modales solo para tarjetas específicas
        if (this.data.name === 'Golf Schedule and Rates') {
            const infoLink = card.querySelector('.info-link');
            if (infoLink) {
                infoLink.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        console.log('Golf Rates modal: Loading content...');
                        const content = await this.loadModalContent('golfrates.html');
                        console.log('Golf Rates modal: Content loaded, setting modal...');
                        this.golfRatesModal.setContent(content);
                        console.log('Golf Rates modal: Showing modal...');
                        this.golfRatesModal.show();
                    } catch (error) {
                        console.error('Error in Golf Rates modal:', error);
                        this.golfRatesModal.setContent(`
                            <div class="property-content">
                                <h2>Error Loading Golf Rates</h2>
                                <p>We apologize, but the golf rates could not be loaded.</p>
                                <p>Error: ${error.message}</p>
                            </div>
                        `);
                        this.golfRatesModal.show();
                    }
                });
            }
        }

        if (this.data.category === 'Golf Cart') {
            const infoLink = card.querySelector('.info-link');
            if (infoLink) {
                infoLink.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        console.log('Golf Cart modal: Loading content...');
                        const content = await this.loadModalContent('golfcart.html');
                        console.log('Golf Cart modal: Content loaded, setting modal...');
                        this.modal.setContent(content);
                        console.log('Golf Cart modal: Showing modal...');
                        this.modal.show();
                    } catch (error) {
                        console.error('Error in Golf Cart modal:', error);
                        this.modal.setContent(`
                            <div class="property-content">
                                <h2>Error Loading Golf Cart Information</h2>
                                <p>We apologize, but the golf cart information could not be loaded.</p>
                                <p>Error: ${error.message}</p>
                            </div>
                        `);
                        this.modal.show();
                    }
                });
            }
        } else if (this.data.name === "St Regis Kid's Club") {
            const infoLink = card.querySelector('.info-link');
            if (infoLink) {
                infoLink.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        console.log('Kids Club modal: Loading content...');
                        const content = await this.loadModalContent('tortuga.html');
                        console.log('Kids Club modal: Content loaded, setting modal...');
                        this.kidsClubModal.setContent(content);
                        console.log('Kids Club modal: Showing modal...');
                        this.kidsClubModal.show();
                    } catch (error) {
                        console.error('Error in Kids Club modal:', error);
                        this.kidsClubModal.setContent(`
                            <div class="property-content">
                                <h2>Error Loading Kids Club Information</h2>
                                <p>We apologize, but the Kids Club information could not be loaded.</p>
                                <p>Error: ${error.message}</p>
                            </div>
                        `);
                        this.kidsClubModal.show();
                    }
                });
            }
        }

        return card;
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

    async loadModalContent(filename) {
        try {
            // Usar URL absoluta con método de respaldo
            const baseUrl = this._getBaseUrl();
            const fullPath = `${baseUrl}/public/pages/${filename}`;
            console.log(`🔍 Attempting to load modal content from: ${fullPath}`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout
            
            const response = await fetch(fullPath, { 
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                console.error(`❌ Fetch failed with status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const content = await response.text();
            console.log('✅ Loaded modal content:', content.substring(0, 500) + '...');
            
            // Verificar si el contenido está vacío o contiene solo etiquetas HTML vacías
            const trimmedContent = content.replace(/\s|<[^>]*>/g, '');
            if (!content || trimmedContent === '') {
                console.error(`❌ No meaningful content found in file: ${filename}`);
                return `
                    <div class="property-content error-content">
                        <h2>Content Not Available</h2>
                        <p>We apologize, but the content for ${filename} could not be loaded.</p>
                        <p>The file appears to be empty or contains no readable content.</p>
                    </div>
                `;
            }
            
            return content;
        } catch (error) {
            console.error(`❌ Error loading modal content from ${filename}:`, error);
            
            // Fallback content con detalles del error
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
}

// SearchBar.js
export class SearchBar {
    constructor(onSearch) {
        this.searchInput = document.getElementById('searchInput');
        this.onSearch = onSearch;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', () => {
            this.onSearch(this.searchInput.value);
        });
    }

    getValue() {
        return this.searchInput.value.toLowerCase();
    }
}

// CategoryFilter.js
export class CategoryFilter {
    constructor(categories, onFilter) {
        this.select = document.getElementById('categorySelect');
        this.onFilter = onFilter;
        this.populateCategories(categories);
        this.setupEventListeners();
    }

    populateCategories(categories) {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            this.select.appendChild(option);
        });
    }

    setupEventListeners() {
        this.select.addEventListener('change', () => {
            this.onFilter(this.select.value);
        });
    }

    getValue() {
        return this.select.value;
    }
}