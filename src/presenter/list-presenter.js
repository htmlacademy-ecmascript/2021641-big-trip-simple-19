import {render, RenderPosition} from '../framework/render.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #listPoint = [];

  #component = new ListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #pointPresenters = new Map();

  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#listPoint = [...this.#pointModel.point];

    this.#renderList();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatePoint) => {
    this.#listPoint = updateItem(this.#listPoint, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #renderSort() {
    render(this.#sortComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      pointContainer: this.#component.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
  }

  #renderList() {
    render(this.#component, this.#container);

    if (this.#listPoint.every((point) => point === null)) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    for (let i = 0; i < this.#listPoint.length; i++) {
      this.#renderPoint(this.#listPoint[i]);
    }
  }
}
