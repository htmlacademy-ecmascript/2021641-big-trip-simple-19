import FilterView from './view/filter-view.js';
import {render, RenderPosition} from './render.js';
import ListPresenter from './presenter/list-presenter.js';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const listPresenter = new ListPresenter({listContainer: siteTripElement});

render(new FilterView(), siteControlsElement, RenderPosition.BEFOREEND);

listPresenter.init();
