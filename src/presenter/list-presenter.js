import {render, RenderPosition} from '../render.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import NewPointView from '../view/new-point-view.js';
// import EditPointView from '../view/edit-point-view.js';
import {offersByTypes, destinations} from '../mock/task.js';

export default class ListPresenter {
  component = new ListView();

  constructor({container, pointModel}) {
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.listPoint = [...this.pointModel.tasks];

    render(this.component, this.container);
    render(new SortView(), this.component.element, RenderPosition.BEFOREBEGIN);
    // render(new EditPointView(), this.component.getElement(), RenderPosition.AFTERBEGIN);
    render(new NewPointView({point: this.listPoint[0], offersByTypes}), this.component.element, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.listPoint.length; i++) {
      render(new EventView({point: this.listPoint[i], offersByTypes, destinations}), this.component.element, RenderPosition.BEFOREEND);
    }
  }


}
