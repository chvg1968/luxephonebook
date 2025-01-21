// Card.js
export class Card {
    constructor(contact) {
        this.contact = contact;
    }

    render() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3>${this.contact.name}</h3>
                </div>
                <div class="card-body">
                    ${this.renderContactInfo()}
                    ${this.renderDescription()}
                </div>
            </div>
        `;
    }

    renderContactInfo() {
        let info = '';
        
        if (this.contact.phone) {
            info += `
                <div class="contact-info">
                    <i class="fas fa-phone"></i>
                    <a href="tel:${this.contact.phone}">${this.contact.phone}</a>
                </div>
            `;
        }
        
        if (this.contact.email) {
            info += `
                <div class="contact-info">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:${this.contact.email}">${this.contact.email}</a>
                </div>
            `;
        }

        if (this.contact.website) {
            info += `
                <div class="contact-info">
                    <i class="fas fa-globe"></i>
                    <a href="${this.contact.website}" target="_blank">Website</a>
                </div>
            `;
        }

        return info;
    }

    renderDescription() {
        return this.contact.description ? `
            <div class="description">
                <p>${this.contact.description}</p>
            </div>
        ` : '';
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