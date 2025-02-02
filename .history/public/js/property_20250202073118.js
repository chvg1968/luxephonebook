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
        section: null,
        parentCategory: null
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
      this.categoryTree.onSelect((selection) => {
        this.handleMenuSelection(selection);
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

  handleMenuSelection(selection) {
    // Limpiar resultados anteriores
    this.clearResults();

    // Actualizar estado de filtros
    this.state.filters = {
      searchTerm: '',
      category: selection.category,
      section: selection.section
    };

    // Filtrar contactos
    const filteredContacts = this.filterContacts();

    // Renderizar resultados
    this.renderResults(filteredContacts);
  }

  filterContacts() {
    const { contacts, filters } = this.state;

    // Mapeo de subcategorías a categorías padre para todas las secciones
    const subcategoryMapping = {
      // Off Property
      "Near Casual": "Restaurant",
      "Near and casual": "Restaurant",
      "30 min West (Carolina)": "Restaurant", 
      "30 min East (Fajardo)": "Restaurant", 
      "45 min West (San Juan)": "Restaurant",
      "On the way from the airport (more variety)": "Shopping",
      "Near Bahia Beach": "Shopping",
      "Specialty Food, Wine and Liquors Stores": "Shopping",
      "Shopping Malls": "Shopping",
      
      // Otras secciones pueden agregarse aquí si es necesario
    };

    return contacts.filter(contact => {
      // Filtrar por sección
      if (filters.section && contact.section !== filters.section) {
        return false;
      }

      // Filtrar por categoría o subcategoría
      if (filters.category) {
        // Verificar si la categoría seleccionada coincide con la categoría del contacto
        const isExactCategoryMatch = contact.category === filters.category;
        
        // Verificar si la categoría seleccionada es una subcategoría del contacto
        const isSubcategoryMatch = contact.subcategories === filters.category;
        
        // Verificar si la categoría seleccionada es un padre de la subcategoría del contacto
        const isCategoryParentOfSubcategory = 
          subcategoryMapping[filters.category] && 
          contact.subcategories && 
          subcategoryMapping[filters.category] === contact.category;

        // Condición especial para categorías generales en "Off property"
        const isOffPropertyGeneralCategory = 
          contact.section === "Off property" && 
          (filters.category === "Restaurant" || filters.category === "Shopping");

        // Condición especial para "Places to Visit" en "Off property"
        const isPlacesToVisit = 
          contact.section === "Off property" && 
          filters.category === "Places to Visit" &&
          contact.name === "Places to Visit";

        // Para Off Property, solo mostrar subcategorías o categorías especiales
        if (contact.section === "Off property") {
          return isSubcategoryMatch || 
                 !isOffPropertyGeneralCategory && isExactCategoryMatch || 
                 isPlacesToVisit;
        }

        // Para otras secciones, mostrar categorías y subcategorías
        return isExactCategoryMatch || isSubcategoryMatch || isCategoryParentOfSubcategory;
      }

      return true;
    });
  }

  renderResults(contacts) {
    const resultsContainer = this.elements.resultsContainer;
    const resultsCount = this.elements.resultsCount;

    // Limpiar resultados anteriores
    resultsContainer.innerHTML = '';

    if (contacts.length === 0) {
      resultsContainer.innerHTML = '<p class="no-results">Don`t find results for this category</p>';
    } else {
      contacts.forEach(contact => {
        const card = new Card(contact);
        const cardElement = card.render();
        resultsContainer.appendChild(cardElement);
      });
    }

    // Actualizar contador de resultados
    resultsCount.textContent = `${contacts.length} resultado${contacts.length !== 1 ? 's' : ''}`;
  }

  displayResults(results) {
    this.elements.resultsContainer.innerHTML = '';

    if (results.length === 0) {
      this.elements.resultsContainer.innerHTML = '<p class="no-results">Don`t find results</p>';
    } else {
      results.forEach(contact => {
        const card = new Card(contact);
        this.elements.resultsContainer.appendChild(card.render());
      });
    }

    if (this.elements.resultsCount) {
      if (results.length > 0) {
        this.elements.resultsCount.textContent = `${results.length} results finded`;
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
