import {getRandomTask, offersByTypes, destinations} from '../mock/task.js';
import Observable from '../framework/observable.js';

const TASK_COUNT = 6;

export default class PointModel extends Observable {
  #points = Array.from({length: TASK_COUNT}, getRandomTask);
  #destinations = destinations;
  #offersByType = offersByTypes;

  get points() {
    return this.#points.map((point) => {
      const typeOffer = this.#offersByType.find((offer) => offer.type === point.type);
      return {
        ...point,
        destination: this.#destinations.find((direction) => direction.id === point.destination),
        typeOffer,
        offersByTypes,
        destinations,
      };
    });
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
