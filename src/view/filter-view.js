import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

function creatFilterTemplate(points, currentFilter) {
  const dateNow = Date.now();

  const checkDisabled = ((point) => {
    const currentDate = new Date(point.dateTo);
    return currentDate.getTime() <= dateNow;
  });

  return (`<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${FilterType.EVERYTHING === currentFilter ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${points.every(checkDisabled) ? 'disabled' : ''} ${FilterType.FUTURE === currentFilter ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
}

export default class FilterView extends AbstractView {
  #points = null;
  #handleFilterTypeChange = null;
  #currentFilter = null;

  constructor({points, onFilterTypeChange, currentFilterType}) {
    super();
    this.#points = points;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.#currentFilter = currentFilterType;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return creatFilterTemplate(this.#points, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    this.#handleFilterTypeChange(evt.target.value);
  };
}
