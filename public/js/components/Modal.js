export class Modal {
    constructor() {
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        // Crear el overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);
        this.overlay = overlay;

        // Crear el modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-back">
                        <i class="fas fa-arrow-left"></i>
                        <span>Back</span>
                    </div>
                    <h2 class="modal-title"></h2>
                </div>
                <div class="modal-body"></div>
            </div>
        `;

        document.body.appendChild(modal);

        this.modal = modal;
        this.modalContent = modal.querySelector('.modal-content');
        this.modalTitle = modal.querySelector('.modal-title');
        this.modalBody = modal.querySelector('.modal-body');
        this.backButton = modal.querySelector('.modal-back');
    }

    setupEventListeners() {
        this.overlay.addEventListener('click', () => {
            this.hide();
        });

        this.backButton.addEventListener('click', () => {
            this.hide();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible()) {
                this.hide();
            }
        });

        // Manejar scroll en móviles
        if (window.innerWidth <= 768) {
            this.modalContent.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            });
        }
    }

    positionModal(targetElement) {
        if (window.innerWidth <= 768) {
            // En móviles, el modal se posiciona desde abajo
            return;
        }

        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Posicionar el modal
        this.modal.style.top = (rect.bottom + scrollTop) + 'px';
        this.modal.style.left = rect.left + 'px';
        this.modal.style.width = Math.max(rect.width, 320) + 'px';

        // Ajustar la posición de la flecha
        const arrow = this.modal.querySelector('.modal::before');
        if (arrow) {
            arrow.style.left = (rect.width / 2 - 8) + 'px';
        }
    }

    show(title, content, targetElement) {
        this.modalTitle.textContent = title;
        this.modalBody.innerHTML = content;
        this.positionModal(targetElement);
        
        this.overlay.classList.add('active');
        this.modal.classList.add('active');
    }

    hide() {
        this.overlay.classList.remove('active');
        this.modal.classList.remove('active');
        this.modalBody.innerHTML = '';
    }

    isVisible() {
        return this.modal.classList.contains('active');
    }
}
