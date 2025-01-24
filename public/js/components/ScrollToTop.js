export class ScrollToTop {
    constructor() {
        this.createButton();
        this.setupEventListeners();
    }

    createButton() {
        // Crear el botón
        this.button = document.createElement('button');
        this.button.id = 'scrollToTopBtn';
        this.button.innerHTML = `
            <i class="fas fa-arrow-up"></i>
            <span>Back to Categories</span>
        `;
        this.button.className = 'scroll-top-btn hidden';
        
        // Agregar estilos CSS
        const styles = document.createElement('style');
        styles.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                padding: 1rem 1.5rem;
                background-color: #1a1a1a;
                color: white;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }

            .scroll-top-btn:hover {
                background-color: #333;
                transform: translateY(-3px);
            }

            .scroll-top-btn.visible {
                opacity: 1;
            }

            .scroll-top-btn.hidden {
                opacity: 0;
                pointer-events: none;
            }

            .scroll-top-btn i {
                font-size: 1rem;
            }
        `;

        // Agregar elementos al DOM
        document.head.appendChild(styles);
        document.body.appendChild(this.button);
    }

    setupEventListeners() {
        // Manejar la visibilidad del botón basado en el scroll
        window.addEventListener('scroll', () => {
            const categoryTree = document.getElementById('categoryTree');
            if (!categoryTree) return;

            const categoryTreeBottom = categoryTree.getBoundingClientRect().bottom;
            
            // Mostrar el botón solo cuando el categoryTree no está visible
            if (categoryTreeBottom < 0) {
                this.button.classList.remove('hidden');
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
                this.button.classList.add('hidden');
            }
        });

        // Manejar el click del botón
        this.button.addEventListener('click', () => {
            const categoryTree = document.getElementById('categoryTree');
            if (categoryTree) {
                categoryTree.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }
}
