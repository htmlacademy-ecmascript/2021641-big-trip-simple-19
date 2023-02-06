import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const pointModel = new PointModel();
const filterModel = new FilterModel();

const listPresenter = new ListPresenter({container: siteTripElement, pointModel});
const filterPresenter = new FilterPresenter({
  filterContainer: siteControlsElement,
  filterModel,
  pointModel
});

filterPresenter.init();
listPresenter.init();
