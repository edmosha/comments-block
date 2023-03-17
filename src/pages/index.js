import '../sass/style.scss';
import Form from '../components/Form';
import { createComment, addComment, handleDate } from "../utils/utils";
import FormValidator from "../components/FormValidator";

const container = document.querySelector('.comments__container');

// form
const form = new Form({
  handleFormSubmit: (inputValues) => {
    addComment(
      createComment({ ...inputValues, date: handleDate(inputValues.date) }),
      container
    );
    form.clearInputs();
    formValidator.resetValidation();
  }
}, '.comments__form');

form.setEventListeners();

// validator
const formValidator = new FormValidator({
  inputSelector: '.comments__input',
  textAreaSelector: '.comments__text',
  submitButtonSelector: '.comments__submit-btn',
  errorElementSelector: '.comments__input-error',
  inactiveButtonClass: 'comments__submit-btn_inactive',
  inputErrorClass: 'comments__input_type_error',
  textAreaErrorClass: 'comments__text_type_error',
}, form.getFormElement());

formValidator.enableValidation();

// infinity comment
const infinityComment = createComment({
  author: 'Даша',
  date: handleDate('2023-03-16'),
  text: 'Это - вечный комментарий, и он тут просто так. Напиши и ты свой ;)',
});

addComment(infinityComment, container);

