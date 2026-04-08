import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler){
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues(){
        const inputList = this._form.querySelectorAll('.popup__input');
        const formValues = {};
        inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners(){
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._submitHandler(inputValues);
        });
        super.setEventListeners();
    }
}