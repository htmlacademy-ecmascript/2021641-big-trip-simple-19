import {render, RenderPosition} from '../framework/render.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from '../presenter/point-presenter.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortPointDay, sortPointPrice} from '../utils/task.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #listPoints = null;

  #component = new ListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  // #sourceListPoint = [];

  constructor({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#listPoints = [...this.#pointModel.point];
    this.#listPoints.sort(sortPointDay, sortPointPrice);
    // this.#sourceListPoint = [...this.#pointModel.point];
    this.#renderList();
    this.#renderSort();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatePoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatePoint);
    // this.#sourceListPoint = updateItem(this.#sourceListPoint, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #sortPoints(sortType) {
    // console.log(sortType);
    switch (sortType) {
      case SortType.DAY:
        this.#listPoints.sort(sortPointDay);
        break;
      case SortType.PRICE:
        this.#listPoints.sort(sortPointPrice);
        break;
      // default:
      //   this.#listPoints = [...this.#sourceListPoint];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    if (this.#listPoints.every((point) => point === null)) {
      return;
    }

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
    if (this.#listPoints.every((point) => point === null)) {
      render(this.#noPointComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
    }
  }

  #renderList() {
    render(this.#component, this.#container);
    this.#renderNoPoint();

    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  }
}
