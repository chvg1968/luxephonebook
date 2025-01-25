export class CategoryTree {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedCategory = null;
        this.selectCallback = null;
        
        // Mapeo de iconos para cada categoría y sección
        this.icons = {
            // Secciones principales
            "Emergency": "fa-kit-medical",
            "Golf Cart": "fa-car",
            "Resort restaurants and venues": "fa-utensils",
            "Resort activities and adventures": "fa-umbrella-beach",
            "Transportation/transfer": "fa-taxi",
            "Catering/delivery/special services": "fa-concierge-bell",
            "Off property": "fa-map-location-dot",
            
            // Categorías
            "Hotel": "fa-hotel",
            "Spa": "fa-spa",
            "Wellness center": "fa-heart-pulse",
            "Bar": "fa-martini-glass",
            "Resort Restaurant": "fa-utensils",
            "Off Property Restaurant": "fa-store",
            "Scuba Diving Tours": "fa-water",
            "Aqua Tours": "fa-ship",
            "Tours": "fa-map-marked-alt",
            "Activities Reservations": "fa-calendar-check",
            "Tennis Reservations": "fa-table-tennis",
            "Wellness Center": "fa-heart-pulse",
            "Concierge": "fa-bell-concierge",
            "Transportation": "fa-taxi",
            "Nanny Services": "fa-baby",
            "Professional Photography": "fa-camera",
            "Personal Care and Fitness": "fa-hand-sparkles",
            "Kid's Club": "fa-children",
            "Personal Chefs": "fa-hat-chef",
            "Pre-Made Meals and Catering": "fa-plate-wheat",
            "Delivery Services and Personal Grocery Shopping": "fa-shopping-cart",
            "Butler Services": "fa-user-tie",
            "Concierge Services": "fa-bell-concierge",
            "Shopping": "fa-shopping-bag"
        };
    }

    onSelect(callback) {
        this.selectCallback = callback;
    }

    clearSelection() {
        const selected = this.container.querySelectorAll('.selected');
        selected.forEach(el => el.classList.remove('selected'));
        this.selectedCategory = null;
    }

    getIcon(category) {
        return this.icons[category] || 'fa-circle';
    }

    render() {
        const tree = document.createElement('div');
        tree.className = 'category-tree';

        // Estructura completa del árbol
        const sections = {
            "Emergency": {
                isSpecial: true,
                categories: []
            },
            "Golf Cart": {
                isSpecial: true,
                categories: []
            },
            "Resort restaurants and venues": {
                isSpecial: false,
                categories: [
                    "Hotel",
                    "Spa",
                    "Wellness center",
                    "Bar",
                    "Restaurant"
                ]
            },
            "Resort activities and adventures": {
                isSpecial: false,
                categories: [
                    "Scuba Diving Tours",
                    "Aqua Tours",
                    "Tours",
                    "Activities Reservations",
                    "Tennis Reservations",
                    "Wellness Center",
                    "Concierge"
                ]
            },
            "Transportation/transfer": {
                isSpecial: false,
                categories: ["Transportation"]
            },
            "Catering/delivery/special services": {
                isSpecial: false,
                categories: [
                    "Nanny Services",
                    "Professional Photography",
                    "Personal Care and Fitness",
                    "Kid's Club",
                    "Personal Chefs",
                    "Pre-Made Meals and Catering",
                    "Delivery Services and Personal Grocery Shopping",
                    "Butler Services",
                    "Concierge Services"
                ]
            },
            "Off property": {
                isSpecial: false,
                categories: [
                    "Restaurant",
                    "Shopping",
                    "Tours"
                ]
            }
        };

        // Renderizar el árbol
        Object.entries(sections).forEach(([section, config]) => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'category-section';

            // Crear encabezado de sección
            const header = document.createElement('div');
            header.className = 'category-header';
            header.dataset.category = config.isSpecial ? section : '';
            header.dataset.isSpecial = config.isSpecial;
            
            // Agregar icono de la sección
            const sectionIcon = document.createElement('i');
            sectionIcon.className = `fas ${this.getIcon(section)}`;
            header.appendChild(sectionIcon);
            
            const title = document.createElement('span');
            title.textContent = section;
            header.appendChild(title);

            if (!config.isSpecial && config.categories.length > 0) {
                const toggleIcon = document.createElement('i');
                toggleIcon.className = 'fas fa-chevron-down toggle-icon';
                header.appendChild(toggleIcon);
            }

            sectionEl.appendChild(header);

            // Crear lista de categorías si no es una sección especial
            if (!config.isSpecial && config.categories.length > 0) {
                const list = document.createElement('div');
                list.className = 'category-list collapsed';

                config.categories.forEach(category => {
                    const item = document.createElement('div');
                    item.className = 'category-item';
                    item.dataset.category = category;
                    
                    // Agregar icono de la categoría
                    const icon = document.createElement('i');
                    icon.className = `fas ${this.getIcon(category)}`;
                    item.appendChild(icon);
                    
                    const text = document.createElement('span');
                    text.textContent = category;
                    item.appendChild(text);
                    
                    list.appendChild(item);
                });

                sectionEl.appendChild(list);
            }

            tree.appendChild(sectionEl);
        });

        this.container.appendChild(tree);
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Event listeners para los encabezados
        const headers = this.container.querySelectorAll('.category-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const section = header.parentElement;
                const list = section.querySelector('.category-list');
                const icon = header.querySelector('.toggle-icon');
                const isSpecial = header.dataset.isSpecial === 'true';
                
                if (list && !isSpecial) {
                    // Si tiene subcategorías y no es especial, solo expandir/colapsar
                    list.classList.toggle('collapsed');
                    if (icon) {
                        icon.classList.toggle('fa-chevron-down');
                        icon.classList.toggle('fa-chevron-up');
                    }
                } else if (isSpecial) {
                    // Si es Emergency o Golf Cart, seleccionar y mostrar cards
                    this.clearSelection();
                    header.classList.add('selected');
                    if (this.selectCallback) {
                        this.selectCallback(header.dataset.category);
                    }
                    this.scrollToResults();
                }
            });
        });

        // Event listeners para los items de categoría
        const items = this.container.querySelectorAll('.category-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                this.clearSelection();
                item.classList.add('selected');
                if (this.selectCallback && item.dataset.category) {
                    this.selectCallback(item.dataset.category);
                }
                this.scrollToResults();
            });
        });
    }

    scrollToResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            const rect = resultsContainer.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({
                top: rect.top + scrollTop - 20,
                behavior: 'smooth'
            });
        }
    }
}
