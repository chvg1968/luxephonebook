import { Card } from "./components/Card.js";
import { SearchBar } from "./components/SearchBar.js";
import { CategoryTree } from "./components/CategoryTree.js";
import { ScrollToTop } from "./components/ScrollToTop.js";
import { contacts } from "./data/contacts.js";

class PropertyPage {
  constructor() {
    this.elements = {
      resultsContainer: document.getElementById("resultsContainer"),
      resultsCount: document.getElementById("stats"),
      searchInput: document.getElementById("searchInput"),
      propertyInfo: document.querySelector(".property-info"),
      categoryTree: document.getElementById("categoryTree")
    };

    this.state = {
      contacts: contacts,
      menuResults: [],
      searchResults: [],
      filters: {
        searchTerm: '',
        category: null,
        section: null
      }
    };

    this.initializeComponents();
    this.setupPropertyInfo();
    this.clearResults();
  }

  initializeComponents() {
    if (this.elements.searchInput) {
      this.searchBar = new SearchBar((searchTerm) => {
        this.state.filters.searchTerm = searchTerm;
        this.handleSearch();
      });
    }

    if (this.elements.categoryTree) {
      this.categoryTree = new CategoryTree("categoryTree");
      this.categoryTree.onSelect(({ category, section }) => {
        this.state.filters.category = category;
        this.state.filters.section = section;
        this.handleMenuSelection();
      });
      this.categoryTree.render();
    }

    new ScrollToTop();
  }

  clearResults() {
    this.state.menuResults = [];
    this.state.searchResults = [];
    this.elements.resultsContainer.innerHTML = '<p class="no-results">Selecciona una categoría para ver los contactos</p>';
    if (this.elements.resultsCount) {
      this.elements.resultsCount.textContent = '';
    }
  }

  handleSearch() {
    if (!this.state.filters.searchTerm) {
      this.state.searchResults = [];
      // Si no hay búsqueda, mostrar resultados del menú si hay alguno
      if (this.state.menuResults.length > 0) {
        this.displayResults(this.state.menuResults);
      } else {
        this.clearResults();
      }
      return;
    }

    const searchTerm = this.state.filters.searchTerm.toLowerCase();
    this.state.searchResults = this.state.contacts.filter(contact => {
      const name = contact.name.toLowerCase();
      const category = contact.category.toLowerCase();
      const description = (contact.description || '').toLowerCase();
      
      return name.includes(searchTerm) || 
             category.includes(searchTerm) || 
             description.includes(searchTerm);
    });

    this.displayResults(this.state.searchResults);
  }

  handleMenuSelection() {
    if (!this.state.filters.category && !this.state.filters.section) {
      this.state.menuResults = [];
      // Si no hay selección de menú, mostrar resultados de búsqueda si hay alguno
      if (this.state.searchResults.length > 0) {
        this.displayResults(this.state.searchResults);
      } else {
        this.clearResults();
      }
      return;
    }

    if (this.state.filters.section === 'Emergency' || this.state.filters.section === 'Golf Cart') {
      this.state.menuResults = this.state.contacts.filter(contact => 
        contact.section === this.state.filters.section
      );
    } else if (this.state.filters.category && this.state.filters.section) {
      this.state.menuResults = this.state.contacts.filter(contact => 
        contact.category === this.state.filters.category && 
        contact.section === this.state.filters.section
      );
    }

    this.displayResults(this.state.menuResults);
  }

  displayResults(results) {
    this.elements.resultsContainer.innerHTML = '';

    if (results.length === 0) {
      this.elements.resultsContainer.innerHTML = '<p class="no-results">No se encontraron resultados</p>';
    } else {
      results.forEach(contact => {
        const card = new Card(contact);
        this.elements.resultsContainer.appendChild(card.render());
      });
    }

    if (this.elements.resultsCount) {
      if (results.length > 0) {
        this.elements.resultsCount.textContent = `${results.length} resultados encontrados`;
      } else {
        this.elements.resultsCount.textContent = '';
      }
    }
  }

  setupPropertyInfo() {
    if (this.elements.propertyInfo) {
      // Configurar información específica de la propiedad si es necesario
    }
  }
}

// Initialize the page
new PropertyPage();
