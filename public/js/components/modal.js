// Modal.js
export class Modal {
    constructor() {
        this.modal = null;
        this.createModal();
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Golf Cart Information</h2>
                
                <div class="info-section">
                    <h3>Charging Instructions</h3>
                    <p>The golf cart has a retractable cord on the back for charging. Please make sure to
                    retract it when in use so it is not hanging loose and gets damaged.</p>
                </div>

                <div class="info-section">
                    <h3>Golf Cart Parking</h3>
                    <p>Park your cart at its designated parking space and appropriate parking at the different resort venues:</p>
                    <ul>
                        <li>Wellness Center</li>
                        <li>Boathouse/ Water Park</li>
                        <li>Beach Club pools, restaurants, concierge and golf shop</li>
                        <li>Cocoteros Diner</li>
                        <li>Sand Dollar Beach</li>
                        <li>Valet parking at the St. Regis Hotel</li>
                    </ul>
                </div>

                <div class="info-section warning">
                    <h3>Rules and Regulations</h3>
                    <ul>
                        <li>It's prohibited for kids and adults with no driver's license to drive the golf cart</li>
                        <li>Kids aren't allowed to drive, not even with an adult on the side or carrying them on the laps</li>
                        <li>No excessive speeding, joy riding, golf course or golf course path riding, beach, sand or offroad riding, disregard of traffic signs, or any type of unreasonable activity with the golf cart will be tolerated by the development</li>
                    </ul>
                    <p class="warning-text">Local security enforces these restrictions with a fine and you will not be able to use the golf cart for the reminder of the stay.</p>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeBtn = this.modal.querySelector('.close');
        closeBtn.onclick = () => this.hide();
        
        window.onclick = (event) => {
            if (event.target === this.modal) {
                this.hide();
            }
        };
    }

    show() {
        this.modal.classList.add('show');
    }

    hide() {
        this.modal.classList.remove('show');
    }
}