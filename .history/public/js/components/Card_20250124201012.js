// Card.js
import { Modal } from './Modal.js';

export class Card {
    constructor(data) {
        this.data = data;
        this.modal = new Modal();
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
            "Tours": "fa-map-location-dot",
            "Scuba Diving Tours": "fa-water",
            "Aqua Tours": "fa-ship",
            "Tennis Reservations": "fa-table-tennis-paddle-ball",
            "Activities Reservations": "fa-person-swimming",
            "Concierge": "fa-concierge-bell",
            
            // Services
            "Personal Chefs": "fa-hat-chef",
            "Personal Chefs and Catering": "fa-hat-chef",
            "Pre-Made Meals and Catering": "fa-plate-wheat",
            "Butler Services": "fa-user-tie",
            "Shopping": "fa-shopping-bag",
            "Transportation": "fa-taxi",
            "Delivery Services and Personal Grocery Shopping": "fa-truck-fast",
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

    getIcon(contact) {
        // Primero intentar por el nombre exacto de la categoría
        if (this.icons[contact.category]) {
            return this.icons[contact.category];
        }

        // Luego por palabras clave en el nombre
        const nameLower = contact.name.toLowerCase();
        if (nameLower.includes('dr.') || nameLower.includes('doctor')) {
            return this.icons["Doctor"];
        }
        if (nameLower.includes('hospital')) {
            return this.icons["Hospital"];
        }
        if (nameLower.includes('security')) {
            return this.icons["Security"];
        }
        if (nameLower.includes('chef')) {
            return this.icons["Personal Chefs"];
        }
        if (nameLower.includes('wellness')) {
            return this.icons["Wellness Center"];
        }
        if (nameLower.includes('tennis')) {
            return this.icons["Tennis Reservations"];
        }
        if (nameLower.includes('butler')) {
            return this.icons["Butler Services"];
        }
        if (nameLower.includes('nanny')) {
            return this.icons["Nanny Services"];
        }
        if (nameLower.includes('photo')) {
            return this.icons["Professional Photography"];
        }
        if (nameLower.includes('catering')) {
            return this.icons["Pre-Made Meals and Catering"];
        }
        if (nameLower.includes('delivery')) {
            return this.icons["Delivery Services and Personal Grocery Shopping"];
        }
        if (nameLower.includes('scuba') || nameLower.includes('diving')) {
            return this.icons["Scuba Diving Tours"];
        }
        
        // Si no hay match, usar la sección como fallback
        return this.icons[contact.section] || 'fa-circle';
    }

    render() {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Contenido principal
        const content = document.createElement('div');
        content.className = 'card-content';
        
        // Icono y nombre en la misma línea
        const header = document.createElement('div');
        header.className = 'card-header';
        
        // Icono
        const icon = document.createElement('i');
        icon.className = `fas ${this.getIcon(this.data)}`;
        header.appendChild(icon);
        
        // Nombre
        if (this.data.name) {
            const name = document.createElement('h3');
            name.className = 'card-title';
            name.textContent = this.data.name;
            header.appendChild(name);
        }
        
        content.appendChild(header);

        // Teléfono
        if (this.data.phone) {
            const phone = document.createElement('p');
            phone.className = 'card-phone';
            const phoneLink = document.createElement('a');
            phoneLink.href = `tel:${this.data.phone}`;
            phoneLink.textContent = this.data.phone;
            phone.appendChild(phoneLink);
            content.appendChild(phone);
        }

        // Descripción
        if (this.data.description) {
            const description = document.createElement('p');
            description.className = 'card-description';
            
            if (this.data.category === 'Golf Cart') {
                description.innerHTML = `${this.data.description} <a href="#" class="info-link">Important information about Golf Cart</a>`;
                description.querySelector('.info-link').addEventListener('click', (e) => {
                    e.preventDefault();
                    this.modal.show();
                });
            } else {
                description.textContent = this.data.description;
            }
            content.appendChild(description);
        }

        card.appendChild(content);
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