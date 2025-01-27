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
            "Golf": "fa-golf-ball",
            "Resort restaurants and venues": "fa-utensils",
            "Resort activities and adventures": "fa-umbrella-beach",
            "Transportation/Transfer": "fa-taxi",
            "Catering/delivery/special services": "fa-concierge-bell",
            "Off property": "fa-map-location-dot",
            
            // Categorías
            "Hotel": "fa-hotel",
            "Spa": "fa-spa",
            "Pool":"fa-person-swimming",
            "Beach": "fa-umbrella-beach",
            "Wellness center": "fa-heart-pulse",
            "Bar": "fa-martini-glass",
            "Resort Restaurant": "fa-utensils",
            "Off Property Restaurant": "fa-store",
            "Scuba Diving Tours": "fa-water",
            "Aqua Tours": "fa-ship",
            "Tours": "fa-route",
            "Activities Reservations": "fa-calendar-check",
            "Tennis": "fa-table-tennis",
            "Wellness Center": "fa-heart-pulse",
            "Concierge": "fa-bell-concierge",
            "Concierge Services": "fa-bell-concierge",
            "Transportation": "fa-taxi",
            "Nanny Services": "fa-baby",
            "Professional Photography": "fa-camera",
            "Personal Care and Fitness": "fa-hand-sparkles",
            "Kid's Club": "fa-child",
            "Personal Chefs": "fa-hat-chef",
            "Pre-Made Meals and Catering": "fa-plate-wheat",
            "Delivery Services and Personal Grocery Shopping": "fa-shopping-cart",
            "Butler Services": "fa-user-tie",
            "Shopping": "fa-shopping-bag",
            
            // Subcategorías de Restaurant en Off Property
            "Near Casual": "fa-coffee",
            "30 min West (Carolina)": "fa-map-marker-alt",
            "30 min East (Fajardo)": "fa-map-marker-alt", 
            "45 min West (San Juan)": "fa-map-marker-alt",
            "On the way from the airport (more variety)": "fa-road",
            "Near Bahia Beach": "fa-umbrella-beach",
            "Specialty Food": "fa-shopping-basket",
            "Wine and Liquors Stores": "fa-wine-glass-alt", 
            "Shopping Malls": "fa-store"
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
        // Limpiar cualquier contenido previo
        this.container.innerHTML = '';

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
                    "Pool", 
                    "Beach",
                    "Spa",
                    "Wellness Center"
                ]
            },
            "Resort activities and adventures": {
                isSpecial: false,
                categories: [
                    "Golf",
                    "Nature and Wildlife",
                    "Tennis",
                    "Water Park and Water Sports",  
                    "Wellness Center"
                ]
            },
            "Off Property Transportation and Airport Transfers": {
                isSpecial: false,
                categories: [
                    "Scuba Diving Tours",
                    "Aqua Tours",
                    "Tours", 
                    "Transportation"
                ]
            },
            "Catering/delivery/special services": {
                isSpecial: false,
                categories: [
                    "Nanny Services",
                    "Professional Photography",
                    "Personal Care and Fitness",
                    "Kid's Club",
                    "Personal Chefs, Catering and Pre-Made Meals",
                    "Butler Services",
                    "Concierge Services",
                    "Delivery Services"
                ]
            },
            "Off property": {
                isSpecial: false,
                categories: [
                    {
                        name: "Places to Visit",
                        subcategories: []
                    },
                    {
                        name: "Restaurant",
                        subcategories: [
                            "Near Casual",
                            "30 min West (Carolina)", 
                            "30 min East (Fajardo)", 
                            "45 min West (San Juan)"
                        ]
                    },
                    {
                        name: "Shopping",
                        subcategories: [
                            "On the way from the airport (more variety)",
                            "Near Bahia Beach",
                            "Specialty Food, Wine and Liquors Stores",
                            "Shopping Malls"
                        ]
                    }
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

            // Añadir indicador de expansión solo si hay categorías
            if (config.categories.length > 0 && !config.isSpecial) {
                const expandIndicator = document.createElement('span');
                expandIndicator.className = 'expand-indicator';
                expandIndicator.innerHTML = '▼';
                header.appendChild(expandIndicator);
            }

            sectionEl.appendChild(header);

            // Crear lista de categorías
            if (config.categories.length > 0) {
                const list = document.createElement('div');
                list.className = 'category-list collapsed';

                config.categories.forEach(categoryItem => {
                    const category = typeof categoryItem === 'string' ? categoryItem : categoryItem.name;
                    const item = document.createElement('div');
                    item.className = 'category-item';
                    
                    const icon = document.createElement('i');
                    icon.className = `fas ${this.getIcon(category)}`;
                    item.appendChild(icon);
                    
                    const text = document.createElement('span');
                    text.textContent = category;
                    item.appendChild(text);
                    
                    list.appendChild(item);

                    // Agregar subcategorías si existen
                    if (typeof categoryItem === 'object' && categoryItem.subcategories && categoryItem.subcategories.length > 0) {
                        const subList = document.createElement('div');
                        subList.className = 'subcategory-list collapsed';

                        categoryItem.subcategories.forEach(subcategory => {
                            const subItem = document.createElement('div');
                            subItem.className = 'subcategory-item';
                            
                            const subIcon = document.createElement('i');
                            subIcon.className = `fas ${this.getIcon(subcategory)}`;
                            subItem.appendChild(subIcon);
                            
                            const subText = document.createElement('span');
                            subText.textContent = subcategory;
                            subItem.appendChild(subText);
                            
                            subList.appendChild(subItem);
                        });

                        list.appendChild(subList);
                    }
                });

                sectionEl.appendChild(list);
            }

            tree.appendChild(sectionEl);
        });

        // Añadir el árbol al contenedor
        this.container.appendChild(tree);

        // Configurar eventos después de renderizar
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Event listeners para los encabezados de sección
        const headers = this.container.querySelectorAll('.category-header');
        headers.forEach(header => {
            const section = header.parentElement;
            const isSpecial = header.dataset.isSpecial === 'true';
            const expandIndicator = header.querySelector('.expand-indicator');
            
            header.addEventListener('click', (event) => {
                // Verificar si el clic fue en el indicador de expansión
                if (event.target === expandIndicator) {
                    event.stopPropagation();
                    
                    // Si ya está abierta, cerrar la sección
                    const categoryList = section.querySelector('.category-list');
                    categoryList.classList.add('collapsed');
                    expandIndicator.innerHTML = '▼';
                    return;
                }
                
                if (isSpecial) {
                    // Para Emergency y Golf Cart
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
                } else if (expandIndicator) {
                    // Cerrar todas las secciones abiertas
                    const openSections = this.container.querySelectorAll('.category-section:not([data-special="true"]) .category-list:not(.collapsed)');
                    openSections.forEach(openList => {
                        openList.classList.add('collapsed');
                        const openHeader = openList.closest('.category-section').querySelector('.category-header .expand-indicator');
                        if (openHeader) {
                            openHeader.innerHTML = '▼';
                        }
                    });

                    // Alternar la sección actual
                    const categoryList = section.querySelector('.category-list');
                    const isCurrentlyClosed = categoryList.classList.contains('collapsed');

                    // Si la sección estaba cerrada, abrirla
                    if (isCurrentlyClosed) {
                        categoryList.classList.remove('collapsed');
                        expandIndicator.innerHTML = '▲';
                    } else {
                        // Si ya estaba abierta, cerrarla
                        categoryList.classList.add('collapsed');
                        expandIndicator.innerHTML = '▼';
                    }
                }
            });
        });

        // Event listeners para categorías
        const categoryItems = this.container.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            const subList = item.nextElementSibling;

            item.addEventListener('click', (event) => {
                event.stopPropagation();
                
                this.clearSelection();
                item.classList.add('selected');
                
                if (this.selectCallback) {
                    const categoryName = item.querySelector('span:last-child').textContent;
                    const sectionName = item.closest('.category-section').querySelector('.category-header span').textContent;
                    
                    this.selectCallback({
                        category: categoryName,
                        section: sectionName
                    });
                }
                this.scrollToResults();

                // Expandir/contraer subcategorías si existen
                if (subList && subList.classList.contains('subcategory-list')) {
                    // Cerrar todas las subcategorías abiertas en esta sección
                    const openSubLists = item.closest('.category-list').querySelectorAll('.subcategory-list:not(.collapsed)');
                    openSubLists.forEach(openSubList => {
                        if (openSubList !== subList) {
                            openSubList.classList.add('collapsed');
                        }
                    });

                    // Alternar la subcategoría actual
                    subList.classList.toggle('collapsed');
                }
            });
        });

        // Event listeners para subcategorías
        const subcategoryItems = this.container.querySelectorAll('.subcategory-item');
        subcategoryItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                
                this.clearSelection();
                item.classList.add('selected');
                
                if (this.selectCallback) {
                    const subcategoryName = item.querySelector('span:last-child').textContent;
                    const sectionName = item.closest('.category-section').querySelector('.category-header span').textContent;
                    
                    this.selectCallback({
                        category: subcategoryName,
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
            resultsContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
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
