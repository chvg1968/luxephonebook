// Card.js
export class Card {
    constructor(contact) {
        this.contact = contact;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'card';

        const header = document.createElement('div');
        header.className = 'card-header';
        
        const title = document.createElement('h3');
        title.textContent = this.contact.name;
        header.appendChild(title);

        const body = document.createElement('div');
        body.className = 'card-body';

        // Agregar información de contacto
        if (this.contact.phone) {
            const phoneInfo = document.createElement('div');
            phoneInfo.className = 'contact-info';
            
            const phoneIcon = document.createElement('i');
            phoneIcon.className = 'fas fa-phone';
            
            const phoneLink = document.createElement('a');
            phoneLink.href = `tel:${this.contact.phone}`;
            phoneLink.textContent = this.contact.phone;
            
            phoneInfo.appendChild(phoneIcon);
            phoneInfo.appendChild(phoneLink);
            body.appendChild(phoneInfo);
        }

        // Agregar email si existe
        if (this.contact.email) {
            const emailInfo = document.createElement('div');
            emailInfo.className = 'contact-info';
            
            const emailIcon = document.createElement('i');
            emailIcon.className = 'fas fa-envelope';
            
            const emailLink = document.createElement('a');
            emailLink.href = `mailto:${this.contact.email}`;
            emailLink.textContent = this.contact.email;
            
            emailInfo.appendChild(emailIcon);
            emailInfo.appendChild(emailLink);
            body.appendChild(emailInfo);
        }

        // Agregar website si existe
        if (this.contact.website) {
            const websiteInfo = document.createElement('div');
            websiteInfo.className = 'contact-info';
            
            const websiteIcon = document.createElement('i');
            websiteIcon.className = 'fas fa-globe';
            
            const websiteLink = document.createElement('a');
            websiteLink.href = this.contact.website;
            websiteLink.textContent = 'Website';
            websiteLink.target = '_blank';
            
            websiteInfo.appendChild(websiteIcon);
            websiteInfo.appendChild(websiteLink);
            body.appendChild(websiteInfo);
        }

        // Agregar descripción si existe
        if (this.contact.description) {
            const description = document.createElement('div');
            description.className = 'description';
            description.textContent = this.contact.description;
            body.appendChild(description);
        }

        card.appendChild(header);
        card.appendChild(body);
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