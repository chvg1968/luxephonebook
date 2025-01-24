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
                id: 'Emergency Services',
                name: 'Emergency',
                icon: 'fa-kit-medical'
            },
            {
                id: 'Golf Cart Services',
                name: 'Golf Cart',
                icon: 'fa-car'
            },
            {
                id: 'Resort Venues',
                name: 'Resort Restaurants and Venues',
                icon: 'fa-hotel',
                subCategories: [
                    { id: 'Hotel Services', name: 'Hotel', icon: 'fa-hotel' },
                    { id: 'Spa Services', name: 'Spa', icon: 'fa-spa' },
                    { id: 'Wellness Services', name: 'Wellness Center', icon: 'fa-heart' },
                    { id: 'Bar Services', name: 'Bar', icon: 'fa-glass-martini-alt' },
                    { id: 'Restaurant Services', name: 'Restaurant', icon: 'fa-utensils' }
                ]
            },
            {
                id: 'Resort Activities',
                name: 'Resort Activities and Adventures',
                icon: 'fa-umbrella-beach',
                subCategories: [
                    { id: 'Scuba Services', name: 'Scuba Diving Tours', icon: 'fa-water' },
                    { id: 'Aqua Services', name: 'Aqua Tours', icon: 'fa-ship' },
                    { id: 'Tour Services', name: 'Tours', icon: 'fa-map-marked-alt' },
                    { id: 'Activity Reservations', name: 'Activities Reservations', icon: 'fa-calendar-check' },
                    { id: 'Tennis Services', name: 'Tennis Reservations', icon: 'fa-tennis-ball' },
                    { id: 'Wellness Services', name: 'Wellness Center', icon: 'fa-heart' },
                    { id: 'Concierge Services', name: 'Concierge', icon: 'fa-concierge-bell' }
                ]
            },
            {
                id: 'Transportation Services',
                name: 'Transportation/Transfer',
                icon: 'fa-car',
                subCategories: [
                    { id: 'Transportation Services', name: 'Transportation', icon: 'fa-car' }
                ]
            },
            {
                id: 'Special Services',
                name: 'Catering/Delivery/Special Services',
                icon: 'fa-concierge-bell',
                subCategories: [
                    { id: 'Nanny Services', name: 'Nanny Services', icon: 'fa-baby' },
                    { id: 'Photography Services', name: 'Professional Photography', icon: 'fa-camera' },
                    { id: 'Personal Care Services', name: 'Personal Care and Fitness', icon: 'fa-heart' },
                    { id: 'Kids Club Services', name: 'Kid\'s Club', icon: 'fa-child' },
                    { id: 'Chef Services', name: 'Personal Chefs', icon: 'fa-utensils' },
                    { id: 'Catering Services', name: 'Pre-Made Meals and Catering', icon: 'fa-hamburger' },
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
                    { id: 'Tour Services', name: 'Tours/Places to Visit', icon: 'fa-map-marked-alt' },
                    { id: 'Shopping Services', name: 'Shopping', icon: 'fa-shopping-bag' },
                    { id: 'Restaurant Services', name: 'Restaurants', icon: 'fa-utensils' }
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
