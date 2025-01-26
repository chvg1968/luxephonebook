export class CategoryTree {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedCategory = null;
        this.activeSection = null;
        this.selectCallback = null;
        
        // Mapeo de iconos para cada categoría y sección
        this.icons = {
            // Secciones principales
            "Emergency": "fa-kit-medical",
            "Resort restaurants and venues": "fa-utensils",
            "Resort activities and adventures": "fa-umbrella-beach",
            "Transportation/Transfer": "fa-taxi",
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
            "Concierge Services": "fa-bell-concierge",
            "Transportation": "fa-taxi",
            "Nanny Services": "fa-baby",
            "Professional Photography": "fa-camera",
            "Personal Care and Fitness": "fa-hand-sparkles",
            "Kid's Club": "fa-children",
            "Personal Chefs": "fa-hat-chef",
            "Pre-Made Meals and Catering": "fa-plate-wheat",
            "Delivery Services and Personal Grocery Shopping": "fa-shopping-cart",
            "Butler Services": "fa-user-tie",
            "Shopping": "fa-shopping-bag",
            "Golf Cart": "fa-car"
        };
    }

    onSelect(callback) {
        this.selectCallback = callback;
    }

    clearSelection() {
        const selected = this.container.querySelectorAll('.selected');
        selected.forEach(el => el.classList.remove('selected'));
        this.selectedCategory = null;
        this.activeSection = null;
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
            "Resort restaurants and venues": {
                isSpecial: false,
                categories: [
                    "Restaurant", 
                    "Bar",
                    "Hotel",
                    "Spa",
                    "Wellness Center"
                ]
            },
            "Resort activities and adventures": {
                isSpecial: false,
                categories: [
                    "Golf",
                    "Scuba Diving Tours",   
                    "Aqua Tours",
                    "Tours",
                    "Activities Reservations",
                    "Tennis Reservations",
                    "Wellness Center",
                    "Concierge"
                ]
            },"Transportation/Transfer": {
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
                    "Personal Chefs and Catering",
                    "Butler Services",
                    "Concierge Services",
                    "Delivery Services"
                ]
            },       
            "Off property": {
                isSpecial: false,
                categories: [
                    "Restaurant",
                    "Shopping"
                ]
            }
        };

        // Renderizar el árbol
        Object.entries(sections).forEach(([section, config]) => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'category-section';
            sectionEl.dataset.special = config.isSpecial;

            // Crear encabezado de sección
            const header = document.createElement('div');
            header.className = 'category-header';
            header.dataset.isSpecial = config.isSpecial;
            
            // Agregar icono de la sección
            const sectionIcon = document.createElement('i');
            sectionIcon.className = `fas ${this.getIcon(section)}`;
            header.appendChild(sectionIcon);
            
            const title = document.createElement('span');
            title.textContent = section;
            header.appendChild(title);

            sectionEl.appendChild(header);

            // Crear lista de categorías
            if (config.categories.length > 0) {
                const list = document.createElement('div');
                list.className = 'category-list collapsed';

                config.categories.forEach(category => {
                    const item = document.createElement('div');
                    item.className = 'category-item';
                    
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
            const section = header.parentElement;
            const isSpecial = header.dataset.isSpecial === 'true';
            
            header.addEventListener('click', () => {
                if (isSpecial) {
                    // Para Emergency
                    const sectionName = header.querySelector('span').textContent;
                    
                    this.clearSelection();
                    header.classList.add('selected');
                    
                    if (this.selectCallback) {
                        this.selectCallback({
                            category: sectionName,
                            section: sectionName
                        });
                    }
                    this.scrollToResults();
                } else {
                    // Para las demás secciones, toggle de la lista
                    // Cerrar otras secciones expandidas
                    const otherExpandedSections = this.container.querySelectorAll('.category-section.expanded');
                    otherExpandedSections.forEach(otherSection => {
                        if (otherSection !== section) {
                            otherSection.classList.remove('expanded');
                            otherSection.querySelector('.category-header').classList.remove('expanded');
                        }
                    });
                    
                    section.classList.toggle('expanded');
                    header.classList.toggle('expanded');
                }
            });
        });

        // Event listeners para los items de categoría
        const items = this.container.querySelectorAll('.category-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const categoryName = item.querySelector('span').textContent;
                const section = item.closest('.category-section');
                const sectionName = section.querySelector('.category-header span').textContent;

                this.clearSelection();
                item.classList.add('selected');
                
                if (this.selectCallback) {
                    this.selectCallback({
                        category: categoryName,
                        section: sectionName
                    });
                }
                this.scrollToResults();
            });
        });
    }

    scrollToResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    collapseAll() {
        if (this.container) {
            // Ocultar el árbol
            this.container.style.display = 'none';
        }
    }

    expandAll() {
        if (this.container) {
            // Mostrar el árbol
            this.container.style.display = 'block';
        }
    }
}
