 export default class Popup {
        static existsPopUp = false
        constructor(message, icon, bgColor) {
            if (document.querySelector('.popup')) {
                console.warn('A popup already exists.');
                Popup.existsPopUp = true
                return;
            }

            this.message = message;
            this.icon = icon;
            this.bgColor = bgColor;
            this.createPopup();
        }

        createPopup() {
            // Create popup container
            this.popup = document.createElement('div');
            this.popup.className = 'popup f-pp-lite';
            this.popup.style.backgroundColor = this.bgColor;

            // Create icon element
            const iconElement = document.createElement('img');
            iconElement.className = 'popup-icon';
            iconElement.src = `./assets/src/icons/${this.icon}.svg`;
            this.popup.appendChild(iconElement);

            // Create message element
            const messageElement = document.createElement('span');
            messageElement.className = 'popup-message';
            messageElement.innerText = this.message;
            this.popup.appendChild(messageElement);

            // Create close button
            const closeButton = document.createElement('div');
            const imgClose = document.createElement('img')
            imgClose.setAttribute('src', './assets/src/icons/close.svg')
            imgClose.setAttribute('style', 'width:18px')
            closeButton.append(imgClose)
            closeButton.className = 'popup-close';
            closeButton.onclick = () => this.close();
            this.popup.appendChild(closeButton);

            // Append popup to body
            document.body.appendChild(this.popup);

            // Trigger opacity transition to show popup
            // this.open();
        }

        open() {
            Popup.existsPopUp = true
            requestAnimationFrame(() => {
                this.popup.classList.add('active')
                // this.popup.style.opacity = '1';
            });

            setTimeout(() => {
                this.close()
            }, 3000);
        }

        close() {
            Popup.existsPopUp = false
            this.popup.classList.remove('active')
            setTimeout(() => {
                this.popup.remove();
            }, 500); // Tempo de transição correspondente ao CSS
        } 
    }

    function triggerPopUp(message, icon, bgColor) {
        new Popup(message, icon, bgColor);
    }