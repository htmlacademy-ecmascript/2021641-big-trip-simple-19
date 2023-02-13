import {FilterType} from '../const.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => Date.now() <= new Date(point.dateTo).getTime()),
};

export {getRandomArrayElement, filter};
