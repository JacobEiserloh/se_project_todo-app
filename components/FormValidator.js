export class FormValidator {

    constructor(settings, formEL) {
        this._settings = settings;
        this._formElement = formEL;
        this._inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.classList.add(this._settings.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
    } else {
        this._hideInputError(inputElement);
    }
    };

    _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
    };

    _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
        this._submitButton.classList.add(this._settings.inactiveButtonClass);
        this._submitButton.disabled = true;
    } else {
        this._submitButton.classList.remove(this._settings.inactiveButtonClass);
        this._submitButton.disabled = false;
    }
    };

    _setEventListeners() {
    const inputList = Array.from(
        this._formElement.querySelectorAll(this._settings.inputSelector),
    );
    const buttonElement = this._formElement.querySelector(
        this._settings.submitButtonSelector,
    );

    this._toggleButtonState(inputList);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
        });
    });
    };

    enableValidation() {
        this._setEventListeners();
    };

}