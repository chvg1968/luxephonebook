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
        });

        // Prevenir el envío del formulario
        this.searchInput.form?.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    getValue() {
        return this.searchInput.value.trim();
    }

    clear() {
        this.searchInput.value = '';
        this.onSearch('');
    }
}