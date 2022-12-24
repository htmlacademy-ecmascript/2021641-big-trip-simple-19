import {render, RenderPosition} from '../render.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
// import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {offersByTypes, destinations} from '../mock/task.js';
import NoPointView from '../view/no-point-view.js';

export default class ListPresenter {
  #component = new ListView();
  #container = null;
  #pointModel = null;
  #listPoint = null;


  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#listPoint = [...this.#pointModel.tasks];
    this.#renderList();
  }

  #renderPoint(point) {
    const pointComponent = new EventView({point, offersByTypes, destinations});
    const pointEditComponent = new EditPointView ({point, offersByTypes, destinations});

    const replacePoinToForm = () => {
      this.#component.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#component.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onPointCloseClick = (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    };

    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePoinToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onPointCloseClick);


    render(pointComponent, this.#component.element, RenderPosition.BEFOREEND);
  }

  #renderList() {
    render(this.#component, this.#container);

    if (this.#listPoint.every((point) => point === null)) {
      render(new NoPointView(), this.#component.element, RenderPosition.BEFOREBEGIN);
      return;
    }

    // // render(new EditPointView(), this.component.getElement(), RenderPosition.AFTERBEGIN);
    // // render(new NewPointView({point: this.#listPoint[0], offersByTypes}), this.#component.element, RenderPosition.BEFOREEND);
    render(new SortView(), this.#component.element, RenderPosition.BEFOREBEGIN);
    for (let i = 0; i < this.#listPoint.length; i++) {
      this.#renderPoint(this.#listPoint[i]);
    }
  }

}
