export class SearchBar {
    constructor(onSearch) {
        this.searchInput = document.getElementById('searchInput');
        this.onSearch = onSearch;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Usar debounce para evitar demasiadas búsquedas mientras se escribe
        let debounceTimeout;
        
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const searchTerm = e.target.value.trim();
                this.onSearch(searchTerm);
            }, 300); // Esperar 300ms después de que el usuario deje de escribir
        });

        // Manejar la tecla Enter
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(debounceTimeout);
                const searchTerm = e.target.value.trim();
                this.onSearch(searchTerm);
            }
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