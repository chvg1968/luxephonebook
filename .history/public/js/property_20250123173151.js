import { Card } from './components/Card.js';
import { SearchBar } from './components/SearchBar.js';
import { CategoryTree } from './components/CategoryTree.js';
import { ScrollToTop } from './components/ScrollToTop.js';
import { filterContacts } from './utils/filters.js';

class PropertyPage {
    constructor() {
        this.initializeState();
        this.initializeComponents();
        this.setupPropertyInfo();
        this.renderInitialState();
    }

    async initializeState() {
        try {
            const response = await fetch('/public/data/contacts.json');
            this.state = {
                contacts: await response.json(),
                filters: {
                    searchTerm: '',
                    category: null,
                    section: null
                },
                elements: {
                    resultsContainer: document.getElementById('resultsContainer'),
                    resultsCount: document.getElementById('stats')
                }
            };
        } catch (error) {
            console.error('Error loading contacts:', error);
            this.state = {
                contacts: [],
                filters: { searchTerm: '', category: null, section: null },
                elements: {
                    resultsContainer: document.getElementById('resultsContainer'),
                    resultsCount: document.getElementById('stats')
                }
            };
        }
    }

    initializeComponents() {
        this.initializeSearchBar();
        this.initializeCategoryTree();
        this.initializeScrollToTop();
        this.setupEventListeners();
    }

    initializeSearchBar() {
        this.searchBar = new SearchBar(searchTerm => {
            this.updateFilters({ searchTerm });
            if (searchTerm) {
                this.categoryTree.clearSelection();
                this.updateFilters({ category: null, section: null });
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

    initializeScrollToTop() {
        this.scrollToTop = new ScrollToTop();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const categoryLink = e.target.closest('.menu-button, .sub-menu-button');
            if (categoryLink) {
                e.preventDefault();
                const category = categoryLink.dataset.category;
                const sectionId = this.getSectionId(category);
                this.scrollToSection(sectionId);
            }
        });
    }

    getSectionId(category) {
        return `section-${category.toLowerCase().replace(/\s+/g, '-')}`;
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    handleCategorySelect(category) {
        if (['Emergency Services', 'Resort Venues', 'Off Property'].includes(category.id)) {
            this.updateFilters({ section: category.id, category: null });
        } else {
            this.updateFilters({ category: category.id, section: null });
        }
        this.updateResults();
        
        // Scroll a la sección después de actualizar los resultados
        const sectionId = this.getSectionId(category.id);
        setTimeout(() => this.scrollToSection(sectionId), 100);
    }

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

    getFilteredContacts() {
        let filtered = [...this.state.contacts];
        const { searchTerm, category, section } = this.state.filters;

        if (searchTerm) {
            filtered = filterContacts(filtered, searchTerm);
        }

        if (section === 'Off Property') {
            // Si es Off Property, mostrar todos los contactos de esa sección
            filtered = filtered.filter(contact => contact.section === section);
            
            // Si además hay una categoría seleccionada, filtrar por ella
            if (category) {
                filtered = filtered.filter(contact => 
                    contact.category === category || 
                    contact.category === category + ' Services' || // Para casos como "Nanny Services"
                    contact.category.replace(' Services', '') === category // Para manejar ambos casos
                );
            }
        } else if (section) {
            // Para otras secciones principales
            filtered = filtered.filter(contact => contact.section === section);
        } else if (category) {
            // Para subcategorías específicas
            filtered = filtered.filter(contact => 
                contact.category === category ||
                contact.category === category + ' Services' ||
                contact.category.replace(' Services', '') === category
            );
        }

        return filtered;
    }

    groupContactsByCategory(contacts) {
        return contacts.reduce((groups, contact) => {
            // Normalizar el nombre de la categoría (remover ' Services' si existe)
            const category = (contact.category || contact.section)
                .replace(' Services', '');
            
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(contact);
            return groups;
        }, {});
    }

    renderResults(contacts) {
        if (!this.state.elements.resultsContainer) return;

        if (contacts.length === 0) {
            this.renderNoResults();
            return;
        }

        // Agrupar contactos por categoría
        const groupedContacts = this.groupContactsByCategory(contacts);
        
        // Generar HTML para cada sección
        const sectionsHTML = Object.entries(groupedContacts)
            .map(([category, categoryContacts]) => {
                const sectionId = this.getSectionId(category);
                const cardsHTML = categoryContacts
                    .map(contact => new Card(contact).render())
                    .join('');

                return `
                    <section id="${sectionId}" class="category-section">
                        <h2>${category}</h2>
                        <div class="cards-container">
                            ${cardsHTML}
                        </div>
                    </section>
                `;
            })
            .join('');

        this.state.elements.resultsContainer.innerHTML = sectionsHTML;
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
            this.state.elements.resultsCount.innerHTML = `
                <span class="results-count">
                    Found <strong>${count}</strong> contact${count !== 1 ? 's' : ''}
                </span>
            `;
        }
    }

    setupPropertyInfo() {
        const propertyInfo = document.querySelector('.property-info');
        if (!propertyInfo) return;

        propertyInfo.innerHTML = `
            <div class="info-section">
                <h3>Wifi Information</h3>
                <ul class="info-list">
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
                <h3>Important Villa Information</h3>
                <ul class="info-list">
                   <li>Trash disposal room is the furthest closet away from the unit after the elevator</li>
                     <li class="warning">The THERMOSTATS to regulate the 3 A/C units' temperature: 
                        <li>At the entrance behind the main door</li>
                        <li>Closet on the right hall after foyer</li>
                        <li>Closet inside the laundry room </li>
                    </li>
                    <li>Turn the gas off after using the grill</li>
                    <li>Lock the terrace door when not at the villa. The door can occasionally open from the airflow</li>
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    new PropertyPage();
});
