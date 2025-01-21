// Card.js
export class Card {
    constructor(contact) {
        this.contact = contact;
    }

    formatPhoneNumber(phone) {
        // Mantener el formato original del número de teléfono
        return phone;
    }

    render() {
        const { name, phone, category, description, section } = this.contact;
        return `
            <div class="card">
                <span class="category-tag">${category}</span>
                <h3>${name}</h3>
                <a href="tel:${phone}" class="phone">${this.formatPhoneNumber(phone)}</a>
                <p class="description">${description}</p>
                <p class="section">${section}</p>
            </div>
        `;
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