/**
 * CategoryFilter class handles the category filtering functionality
 * of the directory application.
 */
export class CategoryFilter {
    /**
     * @param {Object} config - Configuration object
     * @param {Function} config.onFilter - Callback function when filter changes
     * @param {Array} config.initialCategories - Initial list of categories
     */
    constructor({ onFilter, initialCategories = [] }) {
        this.select = document.getElementById('categorySelect');
        this.onFilter = onFilter;
        this.categories = new Set(initialCategories);
        this.activeCategory = '';
        
        this.init(initialCategories);
        this.setupEventListeners();
    }

    /**
     * Initialize the category filter with options
     * @param {Array} categories - List of categories to populate the filter
     */
    init(categories) {
        // Clear existing options except the first one (All categories)
        while (this.select.options.length > 1) {
            this.select.remove(1);
        }

        // Add new options
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            this.select.appendChild(option);
        });
    }

    /**
     * Set up event listeners for the category filter
     */
    setupEventListeners() {
        this.select.addEventListener('change', () => {
            this.activeCategory = this.select.value;
            this.onFilter(this.activeCategory);
        });
    }

    /**
     * Get the currently selected category
     * @returns {string} Selected category or empty string for "All categories"
     */
    getValue() {
        return this.select.value;
    }
}

// Usage example:
/*
const categoryFilter = new CategoryFilter({
    onFilter: (category) => {
        console.log('Selected category:', category);
        // Handle filtering logic here
    },
    initialCategories: ['Restaurant', 'Sports', 'Medical', 'Transportation']
});

// Get current selection
const activeCategory = categoryFilter.getValue();
*/