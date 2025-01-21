/**
 * DOM Utility functions for the directory application
 */

/**
 * Extract unique categories from contacts array
 * @param {Array} contacts - Array of contact objects
 * @returns {Array} Sorted array of unique categories
 */
export function getUniqueCategories(contacts) {
    const categories = new Set(contacts.map(contact => contact.category));
    return Array.from(categories).sort((a, b) => a.localeCompare(b));
}

/**
 * Update the statistics display
 * @param {number} count - Number of results to display
 * @param {string} containerId - ID of the stats container element
 */
export function updateStats(count, containerId = 'stats') {
    const statsContainer = document.getElementById(containerId);
    if (statsContainer) {
        statsContainer.textContent = `Showing ${count} ${count === 1 ? 'contact' : 'contacts'}`;
    }
}

/**
 * Display a message when no results are found
 * @param {HTMLElement} container - Container element to show the message
 * @param {Object} options - Configuration options for the message
 */
export function showNoResults(container, options = {}) {
    const {
        title = 'No results found',
        message = 'Try different search terms or category',
        className = 'no-results'
    } = options;

    container.innerHTML = `
        <div class="${className}">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;
}

/**
 * Create an HTML element with attributes and properties
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - HTML attributes to set
 * @param {string|HTMLElement} content - Inner content or child element
 * @returns {HTMLElement} Created HTML element
 */
export function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else {
            element.setAttribute(key, value);
        }
    });

    // Set content
    if (content instanceof HTMLElement) {
        element.appendChild(content);
    } else {
        element.innerHTML = content;
    }

    return element;
}

/**
 * Clear the contents of an element
 * @param {HTMLElement} element - Element to clear
 */
export function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Display a loading spinner
 * @param {HTMLElement} container - Container for the loading spinner
 * @param {string} message - Loading message to display
 */
export function showLoading(container, message = 'Loading...') {
    container.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

/**
 * Show error message in the container
 * @param {HTMLElement} container - Container for the error message
 * @param {string} message - Error message to display
 */
export function showError(container, message = 'An error occurred. Please try again.') {
    container.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}

/**
 * Format phone number to a consistent display format
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export function formatPhoneNumber(phone) {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as XXX-XXX-XXXX
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    // Return original if not 10 digits
    return phone;
}

/**
 * Truncate text to a specific length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length before truncating
 * @returns {string} Truncated text
 */
export function truncateText(text, length = 100) {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}

/**
 * Add event listener with automatic cleanup
 * @param {HTMLElement} element - Element to attach listener to
 * @param {string} event - Event name
 * @param {Function} handler - Event handler function
 * @returns {Function} Cleanup function
 */
export function addEventListenerWithCleanup(element, event, handler) {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler);
}

/**
 * Add or remove a class based on condition
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class to toggle
 * @param {boolean} condition - Condition to determine if class should be added
 */
export function toggleClass(element, className, condition) {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

/**
 * Debounce a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}