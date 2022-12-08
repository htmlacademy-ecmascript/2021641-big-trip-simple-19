import {render, RenderPosition} from '../render.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class ListPresenter {
  listComponent = new ListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.listComponent, this.listContainer);
    render(new SortView(), this.listComponent.getElement(), RenderPosition.BEFOREBEGIN);
    render(new EditPointView(), this.listComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new NewPointView(), this.listComponent.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.listComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }


}
