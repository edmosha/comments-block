function Form({ handleFormSubmit }, formSelector) {
  this._element = document.querySelector(formSelector);
  this._handleFormSubmit = handleFormSubmit;

  this._findAllInputs = function() {
    const inputList = this._element.querySelectorAll('.comments__input');
    const textAreaList = this._element.querySelectorAll('.comments__text');

    this._inputList = Array.from(inputList).concat(Array.from(textAreaList));
    return this._inputList;
  }

  this._getInputValues = function() {
    this._findAllInputs();

    const inputValues = {};

    this._inputList.forEach(input => inputValues[input.name] = input.value);

    return inputValues;
  }

  this.getFormElement = function() {
    return this._element;
  }

  this.clearInputs = function() {
    this._inputList.forEach(input => { input.value = '' });
  }

  this.setEventListeners = function() {
    this._element.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      })
  }
}

export default Form;