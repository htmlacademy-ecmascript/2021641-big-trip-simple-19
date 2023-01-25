import {getRandomTask, offersByTypes, destinations} from '../mock/task.js';

const TASK_COUNT = 6;

export default class PointModel {
  #points = Array.from({length: TASK_COUNT}, getRandomTask);
  #destinations = destinations;
  #offersByType = offersByTypes;

  get point() {
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
}
