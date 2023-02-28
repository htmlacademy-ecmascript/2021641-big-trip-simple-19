import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButton from './view/new-button-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATTION = 'Basic d9F3js6c82jd92sd';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const pointModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATTION)
});
const filterModel = new FilterModel();

const listPresenter = new ListPresenter({
  container: siteTripElement,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});
const filterPresenter = new FilterPresenter({
  filterContainer: siteControlsElement,
  filterModel,
  pointModel
});

const newPointButtonComponent = new NewPointButton({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  listPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
listPresenter.init();
pointModel.init();
