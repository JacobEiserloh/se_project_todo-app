export class FormValidator {

    constructor(settings, formEL) {
        this._settings = settings;
        this._formElement = formEL;
        
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = formElement.querySelector(errorElementId);
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(settings.errorClass);
    };

    _hideInputError(formElement, inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
    };

    _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings,
        );
    } else {
        hideInputError(formElement, inputElement);
    }
    };

    _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
    };

    _toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
    };

    _setEventListeners(formElement) {
    const inputList = Array.from(
        formElement.querySelectorAll(settings.inputSelector),
    );
    const buttonElement = formElement.querySelector(
        settings.submitButtonSelector,
    );

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
        });
    });
    };

    enableValidation() {
    const formElement = document.querySelector(settings.formSelector);
    formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
    setEventListeners(formElement, settings);
    };

}