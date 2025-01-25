import { categories } from '../data/categories.js';

export class CategoryTree {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedCategory = null;
        this.selectCallback = null;
        this.mainSections = [
            "Resort activities and adventures",
            "Resort services",
            "Personal services"
        ];
        
        // Mapeo de iconos para cada categoría
        this.icons = {
            "Emergency": "fa-kit-medical",
            "Golf Cart": "fa-car",
            "Resort activities and adventures": "fa-umbrella-beach",
            "Resort services": "fa-hotel",
            "Personal services": "fa-concierge-bell",
            // Subcategorías
            "Aqua Tours": "fa-ship",
            "Tour": "fa-map-marked-alt",
            "Activity": "fa-calendar-check",
            "Tennis": "fa-table-tennis",
            "Scuba Diving Tours": "fa-water",
            "Hotel": "fa-hotel",
            "Spa": "fa-spa",
            "Wellness": "fa-heart-pulse",
            "Bar": "fa-martini-glass",
            "Restaurant": "fa-utensils",
            "Concierge": "fa-bell-concierge",
            "Transportation": "fa-taxi",
            "Nanny": "fa-baby",
            "Photography": "fa-camera",
            "Personal Care": "fa-hand-sparkles",
            "Kids Club": "fa-children",
            "Chef": "fa-hat-chef",
            "Catering": "fa-plate-wheat",
            "Butler": "fa-user-tie",
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

        // Crear secciones principales
        const sections = {
            "Emergency": [],
            "Golf Cart": [],
            "Resort activities and adventures": [
                "Aqua Tours",
                "Tour",
                "Activity",
                "Tennis",
                "Scuba Diving Tours"
            ],
            "Resort services": [
                "Hotel",
                "Spa",
                "Wellness",
                "Bar",
                "Restaurant",
                "Concierge",
                "Transportation"
            ],
            "Personal services": [
                "Nanny",
                "Photography",
                "Personal Care",
                "Kids Club",
                "Chef",
                "Catering",
                "Butler",
                "Shopping"
            ]
        };

        // Renderizar el árbol
        Object.entries(sections).forEach(([section, categories]) => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'category-section';

            // Crear encabezado de sección
            const header = document.createElement('div');
            header.className = 'category-header';
            header.dataset.category = section;
            
            // Agregar icono de la sección
            const sectionIcon = document.createElement('i');
            sectionIcon.className = `fas ${this.getIcon(section)}`;
            header.appendChild(sectionIcon);
            
            const title = document.createElement('span');
            title.textContent = section;
            header.appendChild(title);

            if (categories.length > 0) {
                const toggleIcon = document.createElement('i');
                toggleIcon.className = 'fas fa-chevron-down toggle-icon';
                header.appendChild(toggleIcon);
            }

            sectionEl.appendChild(header);

            // Crear lista de categorías
            if (categories.length > 0) {
                const list = document.createElement('div');
                list.className = 'category-list collapsed';

                categories.forEach(category => {
                    const item = document.createElement('div');
                    item.className = 'category-item';
                    
                    // Agregar icono de la subcategoría
                    const icon = document.createElement('i');
                    icon.className = `fas ${this.getIcon(category)}`;
                    item.appendChild(icon);
                    
                    const text = document.createElement('span');
                    text.textContent = category;
                    item.appendChild(text);
                    
                    item.dataset.category = category;
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
                
                if (list) {
                    // Si tiene subcategorías, solo expandir/colapsar
                    list.classList.toggle('collapsed');
                    if (icon) {
                        icon.classList.toggle('fa-chevron-down');
                        icon.classList.toggle('fa-chevron-up');
                    }
                } else {
                    // Si no tiene subcategorías (Emergency o Golf Cart), seleccionar
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
