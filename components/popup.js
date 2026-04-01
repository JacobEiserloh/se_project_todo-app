export default class Popup {
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
    }

    open(){
        this._popup.classList.add('popup_visible');
    }
    close(){
        this._popup.classList.remove('popup_visible');
    }

    _handleEscapeClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        const closeButton = this._popup.querySelector(`.popup__close`);
        closeButton.addEventListener('click', () => this.close());

        this._popup.addEventListener('click', (evt) => {
            if (evt.target === this._popup) {
                this.close();
            }
        });
    }
}