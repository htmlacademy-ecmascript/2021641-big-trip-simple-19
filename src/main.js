import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import PointModel from './model/tasks-model.js';
import {render, RenderPosition} from './framework/render.js';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const pointModel = new PointModel();
const listPresenter = new ListPresenter({container: siteTripElement, pointModel});

render(new FilterView(), siteControlsElement, RenderPosition.BEFOREEND);

listPresenter.init();
