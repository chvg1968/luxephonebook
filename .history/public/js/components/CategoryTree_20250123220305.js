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
        const categoryList = [
            {
                id: 'Emergency',
                name: 'Emergency',
                icon: 'fa-kit-medical'
            },
            {
                id: 'Golf Cart',
                name: 'Golf Cart',
                icon: 'fa-car'
            },
            {
                id: 'Resort Venues',
                name: 'Resort Restaurants and Venues',
                icon: 'fa-hotel',
                subCategories: [
                    { id: 'Hotel', name: 'Hotel', icon: 'fa-hotel' },
                    { id: 'Spa', name: 'Spa', icon: 'fa-spa' },
                    { id: 'Wellness Center', name: 'Wellness Center', icon: 'fa-heart' },
                    { id: 'Bar', name: 'Bar', icon: 'fa-glass-martini-alt' },
                    { id: 'Restaurant', name: 'Restaurant', icon: 'fa-utensils' }
                ]
            },
            {
                id: 'Resort Activities',
                name: 'Resort Activities and Adventures',
                icon: 'fa-umbrella-beach',
                subCategories: [
                    { id: 'Scuba Diving Tours', name: 'Scuba Diving Tours', icon: 'fa-water' },
                    { id: 'Aqua Tours', name: 'Aqua Tours', icon: 'fa-ship' },
                    { id: 'Tours', name: 'Tours', icon: 'fa-map-marked-alt' },
                    { id: 'Activities Reservations', name: 'Activities Reservations', icon: 'fa-calendar-check' },
                    { id: 'Tennis Reservations', name: 'Tennis Reservations', icon: 'fa-tennis-ball' },
                    { id: 'Wellness Center', name: 'Wellness Center', icon: 'fa-heart' },
                    { id: 'Concierge', name: 'Concierge', icon: 'fa-concierge-bell' }
                ]
            },
            {
                id: 'Transportation',
                name: 'Transportation',
                icon: 'fa-car'
            },
            {
                id: 'Special Services',
                name: 'Special Services',
                icon: 'fa-concierge-bell',
                subCategories: [
                    { id: 'Nanny Services', name: 'Nanny Services', icon: 'fa-baby' },
                    { id: 'Professional Photography', name: 'Professional Photography', icon: 'fa-camera' },
                    { id: 'Personal Care and Fitness', name: 'Personal Care and Fitness', icon: 'fa-heart' },
                    { id: "Kid's Club", name: "Kid's Club", icon: 'fa-child' },
                    { id: 'Personal Chefs', name: 'Personal Chefs', icon: 'fa-utensils' },
                    { id: 'Pre-Made Meals and Catering', name: 'Pre-Made Meals and Catering', icon: 'fa-hamburger' },
                    { id: 'Delivery Services', name: 'Delivery Services', icon: 'fa-shopping-cart' },
                    { id: 'Butler Services', name: 'Butler Services', icon: 'fa-user-tie' },
                    { id: 'Concierge Services', name: 'Concierge Services', icon: 'fa-concierge-bell' }
                ]
            },
            {
                id: 'Off Property',
                name: 'Off Property',
                icon: 'fa-map-location-dot',
                subCategories: [
                    { id: 'Tours', name: 'Tours/Places to Visit', icon: 'fa-map-marked-alt' },
                    { id: 'Shopping', name: 'Shopping', icon: 'fa-shopping-bag' },
                    { id: 'Restaurant', name: 'Restaurants', icon: 'fa-utensils' }
                ]
            }
        ];

        const menuHTML = categoryList.map(category => {
            if (category.subCategories) {
                return `
                    <div class="category-item">
                        <div class="category-header" data-category="${category.id}">
                            <i class="fas ${category.icon}"></i>
                            <span>${category.name}</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="subcategories">
                            ${category.subCategories.map(sub => `
                                <div class="subcategory-item" data-category="${sub.id}">
                                    <i class="fas ${sub.icon}"></i>
                                    <span>${sub.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="category-item">
                        <div class="category-header" data-category="${category.id}">
                            <i class="fas ${category.icon}"></i>
                            <span>${category.name}</span>
                        </div>
                    </div>
                `;
            }
        }).join('');

        if (this.container) {
            this.container.innerHTML = menuHTML;
            this.setupEventListeners();
        } else {
            console.error("Category tree container not found");
        }
    }

    setupEventListeners() {
        // Manejar clicks en categorías principales
        const categoryHeaders = this.container.querySelectorAll('.category-header');
        categoryHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Toggle subcategorías
                const categoryItem = header.closest('.category-item');
                if (categoryItem) {
                    const subcategories = categoryItem.querySelector('.subcategories');
                    if (subcategories) {
                        const isExpanded = subcategories.classList.contains('expanded');
                        subcategories.classList.toggle('expanded');
                        header.querySelector('.fa-chevron-down')?.classList.toggle('rotated');
                    }
                }

                // Seleccionar categoría
                if (header.dataset.category) {
                    this.clearSelection();
                    header.classList.add('selected');
                    this.selectedCategory = header;
                    if (this.selectCallback) {
                        this.selectCallback(header.dataset.category);
                    }
                }
            });
        });

        // Manejar clicks en subcategorías
        const subcategoryItems = this.container.querySelectorAll('.subcategory-item');
        subcategoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.clearSelection();
                item.classList.add('selected');
                this.selectedCategory = item;
                if (this.selectCallback && item.dataset.category) {
                    this.selectCallback(item.dataset.category);
                }
            });
        });
    }
}
