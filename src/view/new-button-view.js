export default class NewPointButton {
  #handleNewPointButtonClick = null;
  #element = null;

  constructor({onClick}) {
    this.#handleNewPointButtonClick = onClick;
    this.#element = document.querySelector('.trip-main__event-add-btn');
    this.#element.addEventListener('click', this.#clickHandler);
  }

  get element() {
    return this.#element;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewPointButtonClick();
  };
}
