import { Card } from "./components/Card.js";
import { SearchBar } from "./components/SearchBar.js";
import { CategoryTree } from "./components/CategoryTree.js";
import { ScrollToTop } from "./components/ScrollToTop.js";
import { filterContacts } from "./utils/filters.js";
import { contacts } from "./data/contacts.js";

class PropertyPage {
  constructor() {
    // Inicializar elementos del DOM
    this.elements = {
      resultsContainer: document.getElementById("resultsContainer"),
      resultsCount: document.getElementById("stats"),
      searchInput: document.getElementById("searchInput"),
      propertyInfo: document.querySelector(".property-info"),
      categoryTree: document.getElementById("categoryTree")
    };

    // Estado de la aplicación
    this.state = {
      contacts: contacts,
      filteredContacts: contacts,
      filters: {
        category: null,
        section: null
      }
    };

    // Inicializar componentes
    this.initializeComponents();
    
    // Configurar la página
    this.setupPropertyInfo();
    this.updateResults();
  }

  initializeComponents() {
    // Inicializar barra de búsqueda
    if (this.elements.searchInput) {
      this.searchBar = new SearchBar((searchTerm) => {
        this.state.filters.searchTerm = searchTerm;
        this.updateSearchResults();
      });
    }

    // Inicializar árbol de categorías
    if (this.elements.categoryTree) {
      this.categoryTree = new CategoryTree("categoryTree");
      this.categoryTree.onSelect(({ category, section }) => {
        console.log("Selection:", { category, section });
        this.state.filters.category = category;
        this.state.filters.section = section;
        this.updateResults();
      });
      this.categoryTree.render();
    }

    // Inicializar scroll to top
    new ScrollToTop();
  }

  updateSearchResults() {
    // Limpiar la categoría seleccionada cuando se busca
    this.state.filters.category = null;
    if (this.categoryTree) {
      this.categoryTree.clearSelection();
    }
    
    // Filtrar por término de búsqueda en todos los contactos
    this.state.filteredContacts = filterContacts(this.state.contacts, {
      searchTerm: this.state.filters.searchTerm
    });

    this.renderResults();
  }

  updateResults() {
    // Aplicar filtros
    this.state.filteredContacts = filterContacts(this.state.contacts, {
      category: this.state.filters.category,
      section: this.state.filters.section
    });

    // Limpiar el contenedor de resultados
    this.elements.resultsContainer.innerHTML = '';

    // Mostrar resultados
    if (this.state.filteredContacts.length === 0) {
      this.elements.resultsContainer.innerHTML = '<p class="no-results">No se encontraron resultados</p>';
    } else {
      this.state.filteredContacts.forEach(contact => {
        const card = new Card(contact);
        this.elements.resultsContainer.appendChild(card.render());
      });
    }

    // Actualizar contador
    if (this.elements.resultsCount) {
      this.elements.resultsCount.textContent = `${this.state.filteredContacts.length} resultados encontrados`;
    }
  }

  renderResults() {
    let resultsToShow = [];

    // Si hay término de búsqueda, mostrar resultados de búsqueda
    if (this.state.filters.searchTerm) {
      resultsToShow = this.state.filteredContacts;
    } 
    // Si hay categoría seleccionada, mostrar resultados de categoría
    else if (this.state.filters.category) {
      resultsToShow = this.state.filteredContacts;
    }
    // Si no hay filtros, mostrar todos los contactos
    else {
      resultsToShow = this.state.contacts;
    }

    // Actualizar contador
    if (this.elements.resultsCount) {
      const statsText = resultsToShow.length === 1
        ? "1 contact found"
        : `${resultsToShow.length} contacts found`;
      this.elements.resultsCount.textContent = statsText;
    }

    // Mostrar resultados
    if (this.elements.resultsContainer) {
      this.elements.resultsContainer.innerHTML = "";
      resultsToShow.forEach(contact => {
        const card = new Card(contact);
        this.elements.resultsContainer.appendChild(card.render());
      });
    }
  }

  setupPropertyInfo() {
    if (this.elements.propertyInfo) {
      this.elements.propertyInfo.innerHTML = `
        <div class="info-section">
            <h2>Property Information</h2>
            <div class="info-group">
                <h3>Wifi Information</h3>
                <ul class="info-list">
                    <li>Villa Network Name: Villa_Clara</li>
                    <li>Villa Password: Bahia$325</li>
                    <li>Resort Network: Bahia Beach Resort</li>
                    <li>Resort Password: welcomeHome (Note: The H in Home is capitalized)</li>
                </ul>
            </div>
            
            <div class="info-group">
                <h3>Parking Information</h3>
                <ul class="info-list">
                    <li>Parking spots: 84, 85, 86</li>
                    <li>Golf cart spot: G-25</li>
                    <li>Cart Number: 119</li>
                    <li>This cart doesn't require keys</li>
                </ul>
            </div>

            <div class="info-group">
                <h3>Important Villa Information</h3>
                <ul class="info-list">
                    <li>Trash disposal room is the furthest closet away from the unit after the elevator</li>
                    <li>The THERMOSTATS to regulate the 3 A/C units' temperature: 
                        <ul style="list-style-type: none;">
                            <li>At the entrance behind the main door</li>
                            <li>Closet on the right hall after foyer</li>
                            <li>Closet inside the laundry room</li>
                        </ul>
                    </li>
                    <li>Turn the gas off after using the grill</li>
                    <li>Lock the terrace door when not at the villa. The door can occasionally open from the airflow</li>
                </ul>
            </div>

            <div class="info-group warning">
                <h3>St. Regis Hotel Note</h3>
                <p>PLEASE NOTE THAT FOR ALL RESIDENCES AT BAHIA BEACH RESORT, THE ST. REGIS' POOL AREA IS UNAVAILABLE AND THE RESTAURANT RESTRICTS RESERVATIONS WHEN THE HOTEL HAS HIGH OCCUPANCY.</p>
                <p>YOU WILL STILL HAVE FULL ACCESS TO THREE OTHER BEAUTIFUL AND MORE EXCLUSIVE MEMBERS' POOLS (TWO WITH FULL SERVICE), BEACHES AND RESTAURANTS ESPECIALLY DEDICATED FOR MEMBERS AND RESIDENTS.</p>
            </div>
        </div>
      `;
    }
  }
}

// Initialize the page
new PropertyPage();
