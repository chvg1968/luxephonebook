export class CategoryTree {
    constructor(options = {}) {
        console.log('🌳 CategoryTree: Constructor called', options);
        
        // Normalize container selection
        this.container = options.container instanceof HTMLElement 
            ? options.container 
            : document.querySelector('.category-tree-container');
        
        if (!this.container) {
            console.error('🚨 CategoryTree: No container found!');
            throw new Error('Category Tree Container is required');
        }

        // Callback for category selection
        this.selectCallback = options.selectCallback || null;

        // Category mapping for normalization
        this.categoryMapping = {
            "Personal Chefs": "Personal Chefs and Catering",
            "Pre-Made Meals and Catering": "Personal Chefs and Catering",
            "Delivery Services and Personal Grocery Shopping": "Delivery Services",
            "Nanny Service": "Nanny Services"
        };

        // Sections configuration
        this.sections = {
            "Emergency": { 
                isSpecial: true, 
                categories: [],  // No categories for Emergency
                icon: "fa-exclamation-triangle"
            },
            "Resort restaurants and venues": {
                isSpecial: false,
                categories: [
                    "Restaurant", "Bar", "Hotel", "Spa", "Wellness Center"
                ],
                icon: "fa-utensils"
            },
            "Resort activities and adventures": {
                isSpecial: false,
                categories: [
                    "Golf", "Scuba Diving Tours", "Aqua Tours", 
                    "Tours", "Activities Reservations", 
                    "Tennis Reservations", "Wellness Center", "Concierge"
                ],
                icon: "fa-bicycle"
            },
            "Transportation/Transfer": {
                isSpecial: false,
                categories: ["Transportation"],
                icon: "fa-car"
            },
            "Catering/delivery/special services": {
                isSpecial: false,
                categories: [
                    "Nanny Services", "Professional Photography", 
                    "Personal Care and Fitness", "Kid's Club", 
                    "Personal Chefs and Catering", "Butler Services", 
                    "Concierge Services", "Delivery Services"
                ],
                icon: "fa-concierge-bell"
            },
            "Off property": {
                isSpecial: false,
                categories: ["Restaurant", "Shopping"],
                icon: "fa-map-marker-alt"
            }
        };

        // Bind methods to maintain context
        this.setupEventListeners = this.setupEventListeners.bind(this);
        this.render = this.render.bind(this);
        this.normalizeCategory = this.normalizeCategory.bind(this);
        
        // Ensure rendering happens
        this.renderAttempts = 0;
        this.maxRenderAttempts = 3;
        this.isRendering = false;

        // Use MutationObserver or setTimeout to ensure content is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.render();
                this.setupMutationObserver();
            });
        } else {
            this.render();
            this.setupMutationObserver();
        }
    }

    normalizeCategory(category) {
        return this.categoryMapping[category] || category;
    }

    setupMutationObserver() {
        // Create a MutationObserver to watch for changes in the container
        const observer = new MutationObserver((mutations, obs) => {
            const sections = this.container.querySelectorAll('.category-header');
            const categoryItems = this.container.querySelectorAll('.category-item');
            
            if (sections.length > 0 && categoryItems.length > 0) {
                console.log('🌳 Content loaded, setting up event listeners');
                this.setupEventListeners();
                obs.disconnect(); // Stop observing once content is loaded
            }
        });

        // Start observing the container
        observer.observe(this.container, {
            childList: true,
            subtree: true
        });
    }

    render() {
        console.log('🌳 CategoryTree: Rendering...');
        
        // Prevent recursive rendering
        if (this.isRendering) {
            console.warn('🚨 Render already in progress');
            return;
        }

        this.renderAttempts++;
        console.log(`🌳 CategoryTree: Render Attempt ${this.renderAttempts}`);

        // Prevent infinite render loops
        if (this.renderAttempts > this.maxRenderAttempts) {
            console.error('🚨 Max render attempts exceeded');
            return;
        }

        try {
            this.isRendering = true;

            // Ensure container exists and is clear
            if (!this.container) {
                console.error('❌ Cannot render: No container found');
                return;
            }

            // Clear previous content
            this.container.innerHTML = '';

            // Force visibility and positioning
            this.container.style.display = 'block';
            this.container.style.visibility = 'visible';
            this.container.style.opacity = '1';
            this.container.style.position = 'relative';
            this.container.style.zIndex = '10';

            const tree = document.createElement('div');
            tree.className = 'category-tree';
            tree.style.width = '100%';
            tree.style.minHeight = '200px';

            // Render sections and categories
            Object.entries(this.sections).forEach(([section, config]) => {
                const sectionEl = this.createSectionElement(section, config);
                tree.appendChild(sectionEl);
            });

            // Append tree to container
            this.container.appendChild(tree);

            // Setup event listeners after rendering
            this.setupEventListeners();

            console.log('✅ CategoryTree rendering complete');
        } catch (error) {
            console.error('🚨 Render Error:', error);
        } finally {
            this.isRendering = false;
        }
    }

    setupEventListeners() {
        console.log('🌳 Setting up CategoryTree event listeners');
        
        const sections = this.container.querySelectorAll('.category-header');
        sections.forEach(section => {
            section.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const list = event.currentTarget.nextElementSibling;
                const chevron = section.querySelector('.category-chevron');
                const sectionName = section.closest('.category-section').dataset.section;

                // Special handling for Emergency section
                if (sectionName === 'Emergency') {
                    // Trigger emergency contact display
                    if (this.selectCallback) {
                        this.selectCallback({
                            category: 'Emergency',
                            section: 'Emergency'
                        });
                    }
                    return;
                }

                // Collapse all other sections
                this.container.querySelectorAll('.category-list').forEach(otherList => {
                    if (otherList !== list) {
                        otherList.classList.add('collapsed');
                        const otherChevron = otherList.previousElementSibling.querySelector('.category-chevron');
                        if (otherChevron) {
                            otherChevron.classList.remove('rotated');
                        }
                    }
                });

                // Toggle current section
                if (list && list.classList.contains('category-list')) {
                    const isCurrentlyCollapsed = list.classList.contains('collapsed');
                    
                    if (isCurrentlyCollapsed) {
                        list.classList.remove('collapsed');
                        if (chevron) {
                            chevron.classList.add('rotated');
                        }
                    } else {
                        list.classList.add('collapsed');
                        if (chevron) {
                            chevron.classList.remove('rotated');
                        }
                    }
                }
            });
        });

        // Category item listeners
        const categoryItems = this.container.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                
                const categoryName = item.querySelector('span').textContent;
                const section = item.closest('.category-section');
                const sectionName = section.querySelector('.category-header span').textContent;

                // Remove previous selections
                this.container.querySelectorAll('.category-item.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Mark current item as selected
                item.classList.add('selected');

                // Expand parent section
                const parentList = item.closest('.category-list');
                if (parentList) {
                    parentList.classList.remove('collapsed');
                    const parentChevron = parentList.previousElementSibling.querySelector('.category-chevron');
                    if (parentChevron) {
                        parentChevron.classList.add('rotated');
                    }
                }

                // Call select callback if defined
                if (this.selectCallback) {
                    this.selectCallback({
                        category: categoryName,
                        section: sectionName
                    });
                }
            });
        });
    }

    getIcon(name) {
        const iconMap = {
            "Emergency": "fa-exclamation-triangle",
            "Restaurant": "fa-utensils",
            "Bar": "fa-cocktail",
            "Hotel": "fa-hotel",
            "Spa": "fa-spa",
            "Golf": "fa-golf-ball",
            "Transportation": "fa-car",
            "Nanny Services": "fa-child",
            "Shopping": "fa-shopping-bag"
        };
        return iconMap[name] || "fa-info-circle";
    }

    createSectionElement(section, config) {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'category-section';
        sectionEl.dataset.section = section;
        sectionEl.dataset.special = config.isSpecial;

        // Section header
        const header = document.createElement('div');
        header.className = 'category-header';
        header.dataset.isSpecial = config.isSpecial;
        
        const sectionIcon = document.createElement('i');
        sectionIcon.className = `fas ${config.icon || this.getIcon(section)}`;
        header.appendChild(sectionIcon);
        
        const title = document.createElement('span');
        title.textContent = section;
        header.appendChild(title);

        // Chevron icon for expansion
        const chevron = document.createElement('i');
        chevron.className = 'fas fa-chevron-down category-chevron';
        header.appendChild(chevron);

        sectionEl.appendChild(header);

        // Categories list
        if (config.categories.length > 0) {
            const list = document.createElement('div');
            list.className = 'category-list collapsed';  // Start collapsed

            config.categories.forEach(category => {
                const item = document.createElement('div');
                item.className = 'category-item';
                
                const itemIcon = document.createElement('i');
                itemIcon.className = `fas ${this.getIcon(category)}`;
                item.appendChild(itemIcon);

                const itemText = document.createElement('span');
                itemText.textContent = category;
                item.appendChild(itemText);

                list.appendChild(item);
            });

            sectionEl.appendChild(list);
        }

        return sectionEl;
    }

    filterCards(category, section) {
        console.log('🔍 Filtering cards:', { category, section });
        
        // Normalize the category
        const normalizedCategory = this.normalizeCategory(category);
        
        // Find all cards
        const cards = document.querySelectorAll('.card');
        let visibleCardsCount = 0;
        
        cards.forEach(card => {
            const cardCategory = this.normalizeCategory(card.dataset.category);
            const cardSection = card.dataset.section;

            // Show/hide cards based on selection
            if (cardCategory === normalizedCategory && cardSection === section) {
                card.style.display = 'block';
                visibleCardsCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update results count
        this.updateResultsCount(category, section, visibleCardsCount);
    }

    updateResultsCount(category, section, count = 0) {
        const statsContainer = document.getElementById('stats');
        if (statsContainer) {
            if (section === 'Emergency') {
                statsContainer.textContent = `Emergency Contacts`;
            } else {
                statsContainer.textContent = `${category} - ${count} ${count === 1 ? 'contact' : 'contacts'}`;
            }
        }
    }

    // Optional method to force re-render if needed
    forceRender() {
        this.renderAttempts = 0;
        this.render();
    }
}
