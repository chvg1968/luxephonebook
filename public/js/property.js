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

    if (this.state.filters.section === 'Emergency' || this.state.filters.section === 'Golf') {
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

// Funciones para el modal del mapa
let currentScale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

window.openMapModal = function() {
  const modal = document.getElementById('mapModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setupMapInteractions();
  }
};

window.closeMapModal = function() {
  const modal = document.getElementById('mapModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetMap();
  }
};

window.zoomMap = function(factor) {
  const image = document.getElementById('mapImage');
  if (image) {
    currentScale *= factor;
    // Limitar el zoom entre 0.5 y 4
    currentScale = Math.min(Math.max(currentScale, 0.5), 4);
    updateMapTransform();
  }
};

window.resetMap = function() {
  currentScale = 1;
  translateX = 0;
  translateY = 0;
  updateMapTransform();
};

function updateMapTransform() {
  const image = document.getElementById('mapImage');
  if (image) {
    image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
  }
}

function setupMapInteractions() {
  const image = document.getElementById('mapImage');
  const wrapper = image.parentElement;

  // Manejar arrastre del mapa
  wrapper.addEventListener('mousedown', startDragging);
  wrapper.addEventListener('mousemove', drag);
  wrapper.addEventListener('mouseup', stopDragging);
  wrapper.addEventListener('mouseleave', stopDragging);

  // Eventos táctiles
  wrapper.addEventListener('touchstart', handleTouchStart);
  wrapper.addEventListener('touchmove', handleTouchMove);
  wrapper.addEventListener('touchend', handleTouchEnd);

  // Zoom con rueda del mouse
  wrapper.addEventListener('wheel', handleWheel);
}

function startDragging(e) {
  if (e.type === 'mousedown') {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  }
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  updateMapTransform();
}

function stopDragging() {
  isDragging = false;
}

function handleTouchStart(e) {
  if (e.touches.length === 1) {
    isDragging = true;
    startX = e.touches[0].clientX - translateX;
    startY = e.touches[0].clientY - translateY;
  }
}

function handleTouchMove(e) {
  if (!isDragging || e.touches.length !== 1) return;
  e.preventDefault();
  translateX = e.touches[0].clientX - startX;
  translateY = e.touches[0].clientY - startY;
  updateMapTransform();
}

function handleTouchEnd() {
  isDragging = false;
}

function handleWheel(e) {
  e.preventDefault();
  const delta = e.deltaY * -0.01;
  zoomMap(1 + delta);
}

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', function(event) {
  const modal = document.getElementById('mapModal');
  if (event.target === modal) {
    closeMapModal();
  }
});

// Initialize the page
new PropertyPage();
