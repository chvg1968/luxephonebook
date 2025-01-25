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