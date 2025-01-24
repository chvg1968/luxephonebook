export class SearchBar {
    constructor(onSearch) {
        this.searchInput = document.getElementById('searchInput');
        this.onSearch = onSearch;
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (!this.searchInput) return;

        // Escuchar eventos de input para búsqueda en tiempo real
        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            if (this.onSearch) {
                this.onSearch(searchTerm);
            }
            
            // Scroll al inicio de la lista de resultados
            this.scrollToResults();
        });

        // Prevenir el envío del formulario
        this.searchInput.form?.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    scrollToResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            // Obtener la posición del contenedor de resultados
            const rect = resultsContainer.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Scroll suave a la posición del contenedor
            window.scrollTo({
                top: rect.top + scrollTop - 20, // 20px de margen superior
                behavior: 'smooth'
            });
        }
    }

    getValue() {
        return this.searchInput.value.trim();
    }

    // Método para limpiar la búsqueda
    clear() {
        if (this.searchInput) {
            this.searchInput.value = '';
            if (this.onSearch) {
                this.onSearch('');
            }
        }
    }
}