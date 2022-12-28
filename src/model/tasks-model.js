import {getRandomTask} from '../mock/task.js';

const TASK_COUNT = 3;

export default class PointModel {
  #points = Array.from({length: TASK_COUNT}, getRandomTask);
  #offerByTypes = Array.from({length: TASK_COUNT}, getRandomTask);
  #destinations = Array.from({length: TASK_COUNT}, getRandomTask);

  get pointOffers() {
    return this.#points.map((point, destination) => {
      const typeOffers = this.#offerByTypes.find((offer) => offer.type === point.type);
      console.log(point);
      const pointOffers = [];
      const typeDestination = this.#destinations.find((dest) => dest.type === destination.type);
      const pointDestinations = [];

      return {
        typeOffers,
        pointOffers,
        typeDestination,
        pointDestinations
      };
    });
  }
}
