function FormValidator(config, formElement) {
  this._inputSelector = config.inputSelector;
  this._textAreaSelector = config.textAreaSelector;
  this._submitButtonSelector = config.submitButtonSelector;
  this._errorElementSelector = config.errorElementSelector;
  this._inactiveButtonClass = config.inactiveButtonClass;
  this._inputErrorClass = config.inputErrorClass;
  this._textAreaErrorClass = config.textAreaErrorClass;
  this._formElement = formElement;

  this._showInputError = function(inputElem, errorMessage) {
    const errorElem = this._formElement.querySelector(`${this._errorElementSelector}_type_${inputElem.name}`);

    if (inputElem.type === 'textarea') {
      inputElem.classList.add(this._textAreaErrorClass);
    } else {
      inputElem.classList.add(this._inputErrorClass);
    }
    errorElem.textContent = errorMessage;
  }

  this._hideInputError = function(inputElem) {
    const errorElem = this._formElement.querySelector(`${this._errorElementSelector}_type_${inputElem.name}`);

    if (inputElem.type === 'textarea') {
      inputElem.classList.remove(this._textAreaErrorClass);
    } else {
      inputElem.classList.remove(this._inputErrorClass);
    }
    errorElem.textContent = '';
  }

  this._isValid = function(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  }

  this._hasInvalidInput = function() {
    return this._inputList.some(inputElem => {
      return !inputElem.validity.valid;
    })

  }

  this._toggleButtonState = function() {
    if (this._hasInvalidInput()) {
      this._buttonElem.classList.add(this._inactiveButtonClass);
      this._buttonElem.setAttribute('disabled', 'true');

    } else {
      this._buttonElem.classList.remove(this._inactiveButtonClass);
      this._buttonElem.removeAttribute('disabled');

    }
  }

  this._findAllInputs = function() {
    const inputList = this._formElement.querySelectorAll(this._inputSelector);
    const textAreaList = this._formElement.querySelectorAll(this._textAreaSelector);

    return Array.from(inputList).concat(Array.from(textAreaList));
  }

  this._setEventListener = function() {

    this._inputList = this._findAllInputs();

    this._buttonElem = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach(inputElem => {
      inputElem.addEventListener('input', () => {

        this._isValid(inputElem);
        this._toggleButtonState();
      })
    })
  }

  this.resetValidation = function() {
    this._toggleButtonState();
  }

  this.enableValidation = function() {
    this._setEventListener();
  }
}

export default FormValidator;