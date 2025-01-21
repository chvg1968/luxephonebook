import { contacts } from './data/contacts.js';
import { Card } from './components/Card.js';
import { SearchBar } from './components/SearchBar.js';
import { CategoryTree } from './components/CategoryTree.js';
import { filterContacts } from './utils/filters.js';

class PropertyPage {
    constructor() {
        this.initializeState();
        this.initializeComponents();
        this.setupPropertyInfo();
        this.renderInitialState();
    }

    // Inicialización del estado
    initializeState() {
        this.state = {
            contacts: contacts,
            filters: {
                searchTerm: '',
                category: null
            },
            elements: {
                resultsContainer: document.getElementById('resultsContainer'),
                resultsCount: document.getElementById('resultsCount')
            }
        };
    }

    // Inicialización de componentes
    initializeComponents() {
        this.initializeSearchBar();
        this.initializeCategoryTree();
        this.initializeMobileMenu();
    }

    initializeSearchBar() {
        this.searchBar = new SearchBar(searchTerm => {
            this.updateFilters({ searchTerm });
            if (searchTerm) {
                this.categoryTree.clearSelection();
                this.updateFilters({ category: null });
            }
            this.updateResults();
        });
    }

    initializeCategoryTree() {
        this.categoryTree = new CategoryTree('categoryTree');
        this.categoryTree.onSelect(category => {
            this.handleCategorySelect(category);
        });
        this.categoryTree.render();
    }

    initializeMobileMenu() {
        const menuElements = {
            button: document.querySelector('.mobile-menu-toggle'),
            sidebar: document.querySelector('.sidebar'),
            overlay: document.querySelector('.mobile-overlay')
        };

        if (this.areElementsPresent(menuElements)) {
            this.setupMobileMenuListeners(menuElements);
        }
    }

    // Manejo de eventos
    handleCategorySelect(category) {
        this.updateFilters({ category: category.id });
        this.updateResults();
        this.scrollToResults();
    }

    // Actualización del estado y UI
    updateFilters(newFilters) {
        this.state.filters = {
            ...this.state.filters,
            ...newFilters
        };
    }

    updateResults() {
        const filteredContacts = this.getFilteredContacts();
        this.updateResultsCount(filteredContacts.length);
        this.renderResults(filteredContacts);
    }

    // Utilidades
    getFilteredContacts() {
        let filtered = [...this.state.contacts];

        const { searchTerm, category } = this.state.filters;

        if (searchTerm) {
            filtered = filterContacts(filtered, searchTerm);
        }

        if (category) {
            filtered = this.filterByCategory(filtered, category);
        }

        return filtered;
    }

    filterByCategory(contacts, category) {
        return contacts.filter(contact => {
            return contact.categories?.includes(category);
        });
    }

    renderResults(contacts) {
        if (!this.state.elements.resultsContainer) return;

        if (contacts.length === 0) {
            this.renderNoResults();
            return;
        }

        const cardsHTML = contacts
            .map(contact => new Card(contact).render())
            .join('');

        this.state.elements.resultsContainer.innerHTML = cardsHTML;
    }

    renderNoResults() {
        this.state.elements.resultsContainer.innerHTML = `
            <div class="no-results">
                <p>No se encontraron contactos</p>
            </div>
        `;
    }

    updateResultsCount(count) {
        if (this.state.elements.resultsCount) {
            this.state.elements.resultsCount.textContent = count;
        }
    }

    scrollToResults() {
        if (window.innerWidth <= 768) {
            this.toggleMobileMenu(false);
            setTimeout(() => {
                this.state.elements.resultsContainer?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 300);
        }
    }

    // Mobile Menu
    setupMobileMenuListeners(elements) {
        elements.button.addEventListener('click', () => this.toggleMobileMenu());
        elements.overlay.addEventListener('click', () => this.toggleMobileMenu(false));
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && elements.sidebar.classList.contains('active')) {
                this.toggleMobileMenu(false);
            }
        });
    }

    toggleMobileMenu(force) {
        const elements = {
            sidebar: document.querySelector('.sidebar'),
            overlay: document.querySelector('.mobile-overlay'),
            button: document.querySelector('.mobile-menu-toggle')
        };

        if (this.areElementsPresent(elements)) {
            const isActive = typeof force === 'boolean' ? force : !elements.sidebar.classList.contains('active');
            
            elements.sidebar.classList.toggle('active', isActive);
            elements.overlay.classList.toggle('active', isActive);
            elements.button.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            document.body.classList.toggle('menu-open', isActive);
            
            if (!isActive) {
                elements.sidebar.scrollTop = 0;
            }
        }
    }

    areElementsPresent(elements) {
        return Object.values(elements).every(element => element);
    }

    setupPropertyInfo() {
        const propertyInfo = document.querySelector('.property-info');
        if (!propertyInfo) return;

        propertyInfo.innerHTML = `
            <div class="info-section">
                <h3>Wifi Information</h3>
                <ul class="info-list">
                    <li>Entrance lockbox code: 3589 & lock</li>
                    <li>Villa Network Name: Villa_Clara</li>
                    <li>Villa Password: Bahia$325</li>
                    <li>Resort Network: Bahia Beach Resort</li>
                    <li>Resort Password: welcomeHome (Note: The H in Home is capitalized)</li>
                </ul>
            </div>

            <div class="info-section">
                <h3>Parking Spots</h3>
                <ul class="info-list">
                    <li>Parking spots: 84, 85, 86</li>
                    <li>Golf cart spot: G-25</li>
                    <li>Cart Number: 119</li>
                    <li>This cart doesn't require keys</li>
                </ul>
            </div>

            <div class="info-section">
                <h3>Miscellaneous</h3>
                <ul class="info-list">
                    <li>The trash disposal room is in the hall on the way to the elevator. It is the furthest closet away from the unit.</li>
                    <li class="warning">There are three A/C units in the villa. The THERMOSTATS to regulate the temperature are: The first right at the entrance behind the main door, the second in a closet to the right as soon as you enter the front door, the third in a closet at the master room</li>
                    <li>Please make sure to turn the gas off after using the grill</li>
                    <li>When you are not in the villa, it is suggested to close the main door. The door will occasionally open from the wind/airflow</li>
                </ul>
            </div>

            <div class="info-section warning">
                <p>PLEASE NOTE THAT FOR ALL RESIDENCES AT BAHIA BEACH RESORT, THE ST. REGIS POOL AREA IS UNAVAILABLE AND THE REST OF THE HOTEL RESTRICTS RESERVATIONS WHEN THE HOTEL HAS HIGH OCCUPANCY. YOU WILL STILL HAVE FULL ACCESS TO THREE OTHER BEAUTIFUL AND MORE EXCLUSIVE MEMBERS POOLS (TWO WITH FULL SERVICE), BEACHES AND RESTAURANTS ESPECIALLY DEDICATED FOR MEMBERS AND RESIDENTS.</p>
            </div>
        `;
    }

    renderInitialState() {
        this.updateResults();
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    new PropertyPage();
});
