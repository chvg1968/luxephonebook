import { contacts } from './data/contacts.js';
import { categories } from './data/categories.js';
import { CategoryTree } from './components/CategoryTree.js';
import { filterContacts } from './utils/filters.js';

// Crear una instancia de CategoryTree para obtener los iconos
const categoryTreeInstance = new CategoryTree('category-container');

// Hacer los contactos, categorías e iconos globalmente accesibles
window.contactsModule = { contacts };
window.categoriesModule = { categories };
window.categoryTreeModule = { icons: categoryTreeInstance.icons };
window.filtersModule = { filterContacts };

const properties = [
    {
        id: 'villaclara',
        name: 'Villa Clara',
        image: '/public/assets/images/properties/villaclara/Villa Clara.jpg',
        info: {
            wifi: {
                networkName: 'Villa_Clara',
                password: 'Bahia3325',
                lockboxCode: '3589'
            },
            parking: {
                spots: ['84', '85', '86'],
                golfCart: 'G-25',
                cartNumber: '119'
            }
        }
    },
    {
        id: 'villapaloma',
        name: 'Villa Paloma',
        image: '/public/assets/images/properties/villapaloma/Villa Paloma.jpeg',
        info: {
            // Add specific info for Villa Paloma
        }
    },
    {
        id: 'villatiffany',
        name: 'Villa Tiffany',
        image: '/public/assets/images/properties/villatiffany/Villa Tiffany.jpg',
        info: {
            // Add specific info for Villa Tiffany
        }
    }
];

class App {
    constructor() {
        this.accordionContainer = document.getElementById('propertiesAccordion');
        this.initializeAccordion();
    }

    initializeAccordion() {
        properties.forEach(property => {
            const accordionItem = this.createAccordionItem(property);
            this.accordionContainer.appendChild(accordionItem);
        });
    }

    createAccordionItem(property) {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        
        const header = document.createElement('div');
        header.className = 'accordion-header';
        header.innerHTML = `
            <img src="${property.image}" alt="${property.name}">
            <h2>${property.name}</h2>
        `;

        header.addEventListener('click', () => {
            // Store property data in localStorage for the next page
            localStorage.setItem('selectedProperty', JSON.stringify(property));
            // Navigate to the property page
            window.location.href = `/public/pages/${property.id}.html`;
        });

        item.appendChild(header);
        return item;
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});