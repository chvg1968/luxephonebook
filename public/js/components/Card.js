// Card.js
import { Modal } from './Modal.js';

export class Card {
    constructor(data) {
        this.data = data;
        this.modal = new Modal('golf-cart-modal');
        this.kidsClubModal = new Modal('kids-club-modal');
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

    async loadModalContent(path) {
        try {
            const response = await fetch(`/public/pages/${path}`);
            const html = await response.text();
            return html;
        } catch (error) {
            console.error('Error loading modal content:', error);
            return '<p>Error loading content. Please try again later.</p>';
        }
    }

    render() {
        const card = document.createElement('div');
        card.className = 'contact-card';
        
        const icon = this.getIconClass(this.data.name, this.data.category);
        const isEmoji = icon && !icon.startsWith('fa-');
        
        let descriptionHtml = '';
        if (this.data.description) {
            if (this.data.category === 'Golf Cart') {
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
            } else {
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

        // Agregar event listeners para los modales
        if (this.data.category === 'Golf Cart') {
            const infoLink = card.querySelector('.info-link');
            if (infoLink) {
                infoLink.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const content = await this.loadModalContent('golfcart.html');
                    this.modal.setContent(content);
                    this.modal.show();
                });
            }
        } else if (this.data.name === "St Regis Kid's Club") {
            const infoLink = card.querySelector('.info-link');
            if (infoLink) {
                infoLink.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const content = await this.loadModalContent('tortuga.html');
                    this.kidsClubModal.setContent(content);
                    this.kidsClubModal.show();
                });
            }
        }

        return card;
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