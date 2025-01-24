import { categories } from '../data/categories.js';

export class CategoryTree {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedCategory = null;
        this.selectCallback = null;
    }

    onSelect(callback) {
        this.selectCallback = callback;
    }

    clearSelection() {
        if (this.selectedCategory) {
            this.selectedCategory.classList.remove('selected');
            this.selectedCategory = null;
        }
    }

    render() {
        const categories = [
            {
                id: 'Emergency Services',
                name: 'Emergency Services',
                icon: 'fa-kit-medical'
            },
            {
                id: 'Resort Venues',
                name: 'Resort Venues',
                icon: 'fa-umbrella-beach'
            },
            {
                id: 'Off Property',
                name: 'Off Property',
                icon: 'fa-map-location-dot',
                subCategories: [
                    { id: 'Personal Chef', name: 'Personal Chef', icon: 'fa-utensils' },
                    { id: 'Photography', name: 'Photography', icon: 'fa-camera' },
                    { id: 'Beauty', name: 'Beauty', icon: 'fa-spa' },
                    { id: 'Massage', name: 'Massage', icon: 'fa-hands' },
                    { id: 'Fitness', name: 'Fitness', icon: 'fa-dumbbell' },
                    { id: 'Childcare', name: 'Childcare', icon: 'fa-baby' },
                    { id: 'Transportation', name: 'Transportation', icon: 'fa-car' },
                    { id: 'Grocery', name: 'Grocery', icon: 'fa-cart-shopping' }
                ]
            }
        ];

        const menuHTML = categories.map(category => {
            if (category.subCategories) {
                const subCategoriesHTML = category.subCategories.map(subCategory => `
                    <button class="sub-menu-button" data-category="${subCategory.id}">
                        <i class="fas ${subCategory.icon}"></i>
                        ${subCategory.name}
                    </button>
                `).join('');

                return `
                    <div class="menu-item has-submenu">
                        <button class="menu-button" data-category="${category.id}">
                            <i class="fas ${category.icon}"></i>
                            ${category.name}
                        </button>
                        <div class="sub-menu">
                            ${subCategoriesHTML}
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="menu-item">
                        <button class="menu-button" data-category="${category.id}">
                            <i class="fas ${category.icon}"></i>
                            ${category.name}
                        </button>
                    </div>
                `;
            }
        }).join('');

        this.container.innerHTML = menuHTML;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const button = e.target.closest('.menu-button, .sub-menu-button');
            if (!button) return;

            if (this.selectedCategory) {
                this.selectedCategory.classList.remove('selected');
            }

            button.classList.add('selected');
            this.selectedCategory = button;

            const category = {
                id: button.dataset.category,
                name: button.textContent.trim()
            };

            if (this.selectCallback) {
                this.selectCallback(category);
            }
        });
    }
}
