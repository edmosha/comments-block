function Comment({author, date, text, handleLike, handleDelete}, templateSelector) {
  this._author = author;
  this._date = date;
  this._text = text;
  this._handleLike = handleLike;
  this._handleDelete = handleDelete;

  this.getTemplate = function () {
    return (
      document
        .querySelector(templateSelector)
        .content
        .querySelector('.comments__item')
        .cloneNode(true)
    );
  }

  this.like = function() {
    this._likeButton.classList.toggle('comment__like-btn_active');

    if (this._likeButton.classList.contains('comment__like-btn_active')) {
      this._likeCounter.textContent = +this._likeCounter.textContent + 1;
    } else {
      this._likeCounter.textContent = +this._likeCounter.textContent - 1;
    }
  }

  this.delete = function() {
    this._element.remove();
    this._element = null;
  }

  this._setEventListeners = function () {
    this._likeButton.addEventListener('click', () => { this._handleLike() });

    this._deleteButton.addEventListener('click', () => { this._handleDelete() });
  }

  this.createComment = function () {
    this._element = this.getTemplate();
    this._likeButton = this._element.querySelector('.comment__like-btn')
    this._likeCounter = this._element.querySelector('.comment__like-counter');
    this._deleteButton = this._element.querySelector('.comment__delete-btn');

    const author = this._element.querySelector('.comment__author');
    const date = this._element.querySelector('.comment__date');
    const text = this._element.querySelector('.comment__text');

    author.textContent = this._author;
    date.textContent = this._date;
    text.textContent = this._text;

    this._setEventListeners();

    return this._element;
  }
}

export default Comment;