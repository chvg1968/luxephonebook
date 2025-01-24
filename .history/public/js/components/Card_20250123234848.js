// Card.js
import { Modal } from './Modal.js';

export class Card {
    constructor(data) {
        this.data = data;
        this.modal = new Modal();
    }

    render() {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Contenido principal
        const content = document.createElement('div');
        content.className = 'card-content';
        
        // Nombre
        if (this.data.name) {
            const name = document.createElement('h3');
            name.className = 'card-title';
            name.textContent = this.data.name;
            content.appendChild(name);
        }

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
            
            // Si es la card de Golf Cart, agregar el enlace para la modal
            if (this.data.category === 'Golf Cart') {
                description.innerHTML = `${this.data.description} <a href="#" class="info-link">Important information about Golf Cart</a>`;
                
                // Agregar evento click al enlace
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