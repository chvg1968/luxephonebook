import { Modal } from './Modal.js';
// En CategoryTree.js y Modal.js
import { icons, sections } from './config.js';

export class CategoryTree {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedCategory = null;
        this.activeSection = null;
        this.selectCallback = null;
        
        // Mapeo de iconos para cada categoría y sección
        this.icons = icons;
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

        // Renderizar el árbol
        Object.entries(sections).forEach(([section, config]) => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'category-section';

            // Crear encabezado de sección
            const header = document.createElement('div');
            header.className = 'category-header';
            
            // Agregar icono de la sección
            const sectionIcon = document.createElement('i');
            sectionIcon.className = `fas ${this.getIcon(section)}`;
            header.appendChild(sectionIcon);
            
            const title = document.createElement('span');
            title.textContent = section;
            header.appendChild(title);

            // Añadir indicador de expansión solo si hay categorías
            if (config.categories.length > 0) {
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
        // Función auxiliar para contraer todas las secciones
        const collapseAllSections = () => {
            const openSections = this.container.querySelectorAll('.category-section .category-list:not(.collapsed)');
            openSections.forEach(openList => {
                openList.classList.add('collapsed');
                const openHeader = openList.closest('.category-section').querySelector('.category-header .expand-indicator');
                if (openHeader) {
                    openHeader.innerHTML = '▼';
                }
            });
        };

        // Event listeners para los encabezados de sección
        const headers = this.container.querySelectorAll('.category-header');
        headers.forEach(header => {
            const section = header.parentElement;
            const expandIndicator = header.querySelector('.expand-indicator');
            
            header.addEventListener('click', (event) => {
                // Verificar si el clic fue en el indicador de expansión
                if (event.target === expandIndicator) {
                    event.stopPropagation();
                    
                    // Si ya está abierta, cerrar la sección
                    const categoryList = section.querySelector('.category-list');
                    const isCurrentlyOpen = !categoryList.classList.contains('collapsed');
                    
                    // Contraer todas las secciones
                    collapseAllSections();
                    
                    // Si estaba cerrada, abrirla; si estaba abierta, mantenerla cerrada
                    if (!isCurrentlyOpen) {
                        categoryList.classList.remove('collapsed');
                        expandIndicator.innerHTML = '▲';
                    } else {
                        expandIndicator.innerHTML = '▼';
                    }
                    
                    return;
                }
                
                // Obtener el nombre de la sección
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
                    const categoryName = item.textContent.trim();
                    
                    // Encontrar el encabezado de la sección de manera robusta
                    const sectionHeader = findSectionHeader(item);
                    
                    if (!sectionHeader) {
                        console.warn('Sección no encontrada');
                        return;
                    }
                    
                    const sectionName = sectionHeader.textContent;
                    
                    // Mapeo de categorías especiales
                    const specialCategoryMap = {
                        "Bar": "Bar",
                        "Hotel": "Hotel",
                        "Pool": "Pool", 
                        "Beach": "Beach",
                        "Spa": "Spa",
                        "Wellness Center": "Wellness Center",
                        "Golf": "Golf",
                        "Nature and Wildlife": "Nature and Wildlife",
                        "Tennis": "Tennis",
                        "Water Park and Water Sports": "Water Park and Water Sports",
                        "Nanny Services": "Nanny Services",
                        "Professional Photography": "Professional Photography",
                        "Personal Care and Fitness": "Personal Care and Fitness",
                        "Kid's Club": "Kid's Club",
                        "Personal Chefs, Catering and Pre-Made Meals": "Personal Chefs, Catering and Pre-Made Meals",
                        "Butler Services": "Butler Services",
                        "Concierge Services": "Concierge Services",
                        "Delivery Services": "Delivery Services"
                    };

                    const mappedCategory = specialCategoryMap[categoryName] || categoryName;
                    
                    this.selectCallback({
                        category: mappedCategory,
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
                    const subcategoryName = item.textContent.trim();
                    
                    // Encontrar el encabezado de la sección de manera robusta
                    const sectionHeader = findSectionHeader(item);
                    
                    if (!sectionHeader) {
                        console.error('Sección no encontrada');
                        return;
                    }
                    
                    const sectionName = sectionHeader.textContent;
                    
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

function findSectionHeader(item) {
    const sectionHeaderSelectors = [
        '.category-section > .category-header span',
        '.category-header span',
        '.category-section .category-header span',
        'span.section-name',
        // Selector de último recurso
        '.category-header'
    ];

    let sectionHeader = null;
    let closestSection = item.closest('.category-section');
    

    console.log('Debugging section header search:', {
        item: item,
        itemHTML: item.innerHTML,
        closestSection: closestSection,
        closestSectionHTML: closestSection?.innerHTML
    });

    if (!closestSection) {
        console.warn('No closest section found for item');
        return null;
    }

    for (const selector of sectionHeaderSelectors) {
        sectionHeader = closestSection.querySelector(selector);
        if (sectionHeader) break;
    }

    // Si no se encuentra el encabezado, intentar otros métodos
    if (!sectionHeader) {
        console.warn('Could not find section header', {
            item: item,
            itemHTML: item.innerHTML,
            closestSectionHTML: closestSection.innerHTML,
            availableSpans: closestSection.querySelectorAll('span')
        });

        // Fallback: buscar cualquier span en la sección
        const allSpans = closestSection.querySelectorAll('span');
        if (allSpans.length > 0) {
            sectionHeader = allSpans[0];
            console.warn('Using first available span as section header', {
                fallbackSpan: sectionHeader,
                spanText: sectionHeader.textContent
            });
        }

        return sectionHeader;
    }

    return sectionHeader;
}
