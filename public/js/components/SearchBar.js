export class SearchBar {
    constructor(onSearch) {
        this.searchInput = document.getElementById('searchInput');
        this.onSearch = onSearch;
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            if (this.onSearch) {
                this.onSearch(searchTerm);
            }
        });

        // Agregar evento de enter para scroll automático
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = this.searchInput.value.trim();
                if (searchTerm) {
                    // Scroll automático a resultados
                    const resultsContainer = document.getElementById('resultsContainer');
                    if (resultsContainer) {
                        resultsContainer.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }
            }
        });
    }

    getValue() {
        return this.searchInput ? this.searchInput.value.trim() : '';
    }

    clear() {
        if (this.searchInput) {
            this.searchInput.value = '';
            if (this.onSearch) {
                this.onSearch('');
            }
        }
    }
}