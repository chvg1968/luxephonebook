import { Card } from "./components/Card.js";
import { SearchBar } from "./components/SearchBar.js";
import { CategoryTree } from "./components/CategoryTree.js";
import { ScrollToTop } from "./components/ScrollToTop.js";
import { filterContacts } from "./utils/filters.js";

class PropertyPage {
  constructor() {
    this.initializeState();
    this.initializeComponents();
    this.setupPropertyInfo();
    this.renderInitialState();
  }

  async initializeState() {
    try {
      const response = await fetch("/public/data/contacts.json");
      this.state = {
        contacts: await response.json(),
        filters: {
          searchTerm: "",
          category: "",
        },
        elements: {
          resultsContainer: document.getElementById("resultsContainer"),
          resultsCount: document.getElementById("stats"),
          searchInput: document.getElementById("searchInput"),
          propertyInfo: document.querySelector(".property-info"),
        },
      };
    } catch (error) {
      console.error("Error loading contacts:", error);
      this.state = {
        contacts: [],
        filters: { searchTerm: "", category: "" },
        elements: {
          resultsContainer: document.getElementById("resultsContainer"),
          resultsCount: document.getElementById("stats"),
          searchInput: document.getElementById("searchInput"),
          propertyInfo: document.querySelector(".property-info"),
        },
      };
    }
  }

  initializeComponents() {
    this.initializeSearchBar();
    this.initializeCategoryTree();
    this.initializeScrollToTop();
  }

  initializeSearchBar() {
    if (this.state.elements.searchInput) {
      this.searchBar = new SearchBar((searchTerm) => {
        this.state.filters.searchTerm = searchTerm;
        this.updateResults();
      });
    }
  }

  initializeCategoryTree() {
    const categoryTreeElement = document.getElementById("categoryTree");
    if (categoryTreeElement) {
      this.categoryTree = new CategoryTree("categoryTree");
      this.categoryTree.onSelect((category) => {
        console.log("Category selected:", category); // Para debugging
        this.state.filters.category = category;
        this.updateResults();
      });
      this.categoryTree.render();
    }
  }

  initializeScrollToTop() {
    new ScrollToTop();
  }

  updateResults() {
    console.log("Filtering with:", this.state.filters); // Para debugging
    const filteredContacts = filterContacts(this.state.contacts, {
      searchTerm: this.state.filters.searchTerm,
      category: this.state.filters.category
    });

    console.log("Filtered contacts:", filteredContacts); // Para debugging

    // Actualizar el contador de resultados
    if (this.state.elements.resultsCount) {
      const statsText = filteredContacts.length === 1
        ? "1 contact found"
        : `${filteredContacts.length} contacts found`;
      this.state.elements.resultsCount.textContent = statsText;
    }

    // Limpiar y renderizar los resultados
    if (this.state.elements.resultsContainer) {
      this.state.elements.resultsContainer.innerHTML = "";
      filteredContacts.forEach(contact => {
        const card = new Card(contact);
        this.state.elements.resultsContainer.appendChild(card.render());
      });
    }
  }

  renderInitialState() {
    this.updateResults();
  }

  setupPropertyInfo() {
    if (this.state.elements.propertyInfo) {
      this.state.elements.propertyInfo.innerHTML = `
        <div class="info-section">
            <h2>Property Information</h2>
            <div class="info-group">
                <h3>WiFi Information</h3>
                <p><strong>Network:</strong> Villa_Clara</p>
                <p><strong>Password:</strong> Bahia3325</p>
                <p><strong>Lockbox Code:</strong> 3589</p>
            </div>
            
            <div class="info-group">
                <h3>Parking Information</h3>
                <p><strong>Parking Spots:</strong> 84, 85, 86</p>
                <p><strong>Golf Cart:</strong> G-25</p>
                <p><strong>Cart Number:</strong> 119</p>
            </div>

            <div class="info-group">
                <h3>Important Notice</h3>
                <p>Due to the current renovation of the main pool area, the main pool will be closed until further notice.</p>
                <p>YOU WILL STILL HAVE FULL ACCESS TO THREE OTHER BEAUTIFUL AND MORE EXCLUSIVE MEMBERS' POOLS (TWO WITH FULL SERVICE), BEACHES AND RESTAURANTS ESPECIALLY DEDICATED FOR MEMBERS AND RESIDENTS.</p>
            </div>
        </div>
      `;
    }
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  new PropertyPage();
});
