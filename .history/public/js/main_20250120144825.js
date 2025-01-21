import { contacts } from './data/contacts.js';
import { Card } from './components/Card.js';
import { SearchBar } from './components/SearchBar.js';
import { CategoryFilter } from './components/CategoryFilter.js';
import { filterContacts } from './utils/filters.js';
import { getUniqueCategories, updateStats, showNoResults } from './utils/domUtils.js';

class App {
    constructor() {
        this.contacts = contacts;
        this.resultsContainer = document.getElementById('resultsContainer');
        this.initializeComponents();
        this.updateResults(); // Show initial results
    }

    initializeComponents() {
        const categories = getUniqueCategories(this.contacts);
        
        this.searchBar = new SearchBar(() => this.updateResults());
        this.categoryFilter = new CategoryFilter({
            onFilter: () => this.updateResults(),
            initialCategories: categories
        });
    }

    updateResults() {
        const searchTerm = this.searchBar.getValue();
        const category = this.categoryFilter.getValue();
        const filteredContacts = filterContacts(this.contacts, searchTerm, category);
        
        this.renderResults(filteredContacts);
    }

    renderResults(filteredContacts) {
        if (filteredContacts.length === 0) {
            showNoResults(this.resultsContainer);
            updateStats(0);
            return;
        }

        updateStats(filteredContacts.length);
        this.resultsContainer.innerHTML = filteredContacts
            .map(contact => new Card(contact).render())
            .join('');
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});