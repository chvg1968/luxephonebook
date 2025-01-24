import { Card } from "./components/Card.js";
import { SearchBar } from "./components/SearchBar.js";
import { CategoryTree } from "./components/CategoryTree.js";
import { ScrollToTop } from "./components/ScrollToTop.js";
import { filterContacts } from "./utils/filters.js";

class PropertyPage {
  constructor() {
    this.state = {
      contacts: [],
      filters: {
        searchTerm: "",
        category: "",
      },
      elements: null
    };
  }

  async init() {
    try {
      // 1. Cargar contactos
      const response = await fetch("/public/data/contacts.json");
      this.state.contacts = await response.json();

      // 2. Inicializar elementos del DOM
      this.state.elements = {
        resultsContainer: document.getElementById("resultsContainer"),
        resultsCount: document.getElementById("stats"),
        searchInput: document.getElementById("searchInput"),
        propertyInfo: document.querySelector(".property-info"),
        categoryTree: document.getElementById("categoryTree")
      };

      // 3. Inicializar componentes
      this.initializeComponents();
      
      // 4. Configurar la información de la propiedad
      this.setupPropertyInfo();
      
      // 5. Renderizar estado inicial
      this.renderInitialState();
    } catch (error) {
      console.error("Error initializing page:", error);
    }
  }

  initializeComponents() {
    if (this.state.elements.searchInput) {
      this.searchBar = new SearchBar((searchTerm) => {
        this.state.filters.searchTerm = searchTerm;
        this.updateResults();
      });
    }

    if (this.state.elements.categoryTree) {
      this.categoryTree = new CategoryTree("categoryTree");
      this.categoryTree.onSelect((category) => {
        console.log("Category selected:", category);
        this.state.filters.category = category;
        this.updateResults();
      });
      this.categoryTree.render();
    }

    new ScrollToTop();
  }

  updateResults() {
    if (!this.state.elements) return;

    const filteredContacts = filterContacts(this.state.contacts, {
      searchTerm: this.state.filters.searchTerm,
      category: this.state.filters.category
    });

    if (this.state.elements.resultsCount) {
      const statsText = filteredContacts.length === 1
        ? "1 contact found"
        : `${filteredContacts.length} contacts found`;
      this.state.elements.resultsCount.textContent = statsText;
    }

    if (this.state.elements.resultsContainer) {
      this.state.elements.resultsContainer.innerHTML = "";
      filteredContacts.forEach(contact => {
        const card = new Card(contact);
        this.state.elements.resultsContainer.appendChild(card.render());
      });
    }
  }

  setupPropertyInfo() {
    if (this.state.elements.propertyInfo) {
      this.state.elements.propertyInfo.innerHTML = `
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
                        <ul>
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

  renderInitialState() {
    this.updateResults();
  }
}

// Inicializar la página cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const page = new PropertyPage();
  page.init();
});
