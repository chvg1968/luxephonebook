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
                id: 'Resort restaurants and venues',
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
                id: 'Resort activities and adventures',
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
                id: 'Transportation/transfer',
                name: 'Transportation/Transfer',
                icon: 'fa-car',
                subCategories: [
                    { id: 'Transportation', name: 'Transportation', icon: 'fa-car' }
                ]
            },
            {
                id: 'Catering/delivery/special services',
                name: 'Catering/Delivery/Special Services',
                icon: 'fa-concierge-bell',
                subCategories: [
                    { id: 'Nanny Services', name: 'Nanny Services', icon: 'fa-baby' },
                    { id: 'Professional Photography', name: 'Professional Photography', icon: 'fa-camera' },
                    { id: 'Personal Care and Fitness', name: 'Personal Care and Fitness', icon: 'fa-heart' },
                    { id: 'Kid\'s Club', name: 'Kid\'s Club', icon: 'fa-child' },
                    { id: 'Personal Chefs', name: 'Personal Chefs', icon: 'fa-utensils' },
                    { id: 'Pre-Made Meals and Catering', name: 'Pre-Made Meals and Catering', icon: 'fa-hamburger' },
                    { id: 'Delivery Services and Personal Grocery Shopping', name: 'Delivery Services', icon: 'fa-shopping-cart' },
                    { id: 'Butler Services', name: 'Butler Services', icon: 'fa-user-tie' },
                    { id: 'Concierge Services', name: 'Concierge Services', icon: 'fa-concierge-bell' }
                ]
            },
            {
                id: 'Off property',
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
                        <div class="category-header">
                            <i class="fas ${category.icon}"></i>
                            <span>${category.name}</span>
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
                    <div class="category-item" data-category="${category.id}">
                        <div class="category-header">
                            <i class="fas ${category.icon}"></i>
                            <span>${category.name}</span>
                        </div>
                    </div>
                `;
            }
        }).join('');

        this.container.innerHTML = menuHTML;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const items = this.container.querySelectorAll('[data-category]');
        items.forEach(item => {
            item.addEventListener('click', () => {
                this.clearSelection();
                item.classList.add('selected');
                this.selectedCategory = item;
                if (this.selectCallback) {
                    this.selectCallback(item.dataset.category);
                }
            });
        });
    }
}
