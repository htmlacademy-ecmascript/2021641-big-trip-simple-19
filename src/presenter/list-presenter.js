import {remove, render, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import NewPointPresenter from '../presenter/new-point-presenter.js';
import PointPresenter from '../presenter/point-presenter.js';
import {SortType, UserAction, UpdateType, FilterType} from '../const.js';
import {sortPointDay, sortPointPrice} from '../utils/task.js';
import {filter} from '../utils/common.js';
import LoadingView from '../view/loading.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #filterModel = null;
  #component = new ListView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #noPointComponent = null;
  #pointPresenters = new Map();
  #newPointPresenters = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isNewEventOpened = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({container, pointModel, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenters = new NewPointPresenter({
      pointListContainer: this.#component.element,
      onDataChange: this.#handleViewAction,
      onDestroy: () => {
        onNewPointDestroy();
        if (this.points.length === 0) {
          this.#renderList();
        }
      }
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }

    return this.#pointModel.points;
  }

  init() {
    this.#renderList();
    // this.#renderSort();
  }

  createPoint() {
    this.#isNewEventOpened = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenters.init(this.#pointModel.blankPoint);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenters.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenters.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true, resetFilterType: true});
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderSort();
        this.#renderList();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenters.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    if (this.#pointModel.points.every((point) => point === null)) {
      return;
    }

    render(this.#sortComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
  }

  #renderNoPointComponent() {
    this.#noPointComponent = new NoPointView ({
      filterType: this.#filterType,
    });

    render(this.#noPointComponent, this.#component.element, RenderPosition.BEFOREBEGIN);
  }

  #renderPoint(point) {
    const pointPresenters = new PointPresenter ({
      pointContainer: this.#component.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenters.init(point);
    this.#pointPresenters.set(point.id, pointPresenters);
  }

  #clearSort() {
    remove(this.#sortComponent);
  }

  #clearList({resetSortType = false, resetFilterType = false} = {}) {
    this.#newPointPresenters.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#loadingComponent);

    if(this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      this.#clearSort();
      this.#renderSort();
    }

    if (resetFilterType) {
      this.#filterType = FilterType.EVERYTHING;
    }
  }

  #renderList() {
    render(this.#component, this.#container);

    const points = this.points;
    const pointCount = points.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (pointCount === 0 && this.#isNewEventOpened === false) {
      this.#clearSort();
      this.#renderNoPointComponent();
    }

    for (let i = 0; i < pointCount; i++) {
      this.#renderPoint(this.points[i]);
    }

    this.#isNewEventOpened = false;
  }
}
