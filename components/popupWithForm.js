import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler){
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues(){}

    setEventListeners(){
        super.setEventListeners();
    }

    


}