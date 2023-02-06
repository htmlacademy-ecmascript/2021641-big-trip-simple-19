import { nanoid } from 'nanoid';
import { getRandomArrayElement } from '../utils/common.js';

const destinations = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=4',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 3,
    description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Geneva',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    name: 'Paris',
    pictures: []
  },
];

const offersByTypes = [
  {
    type: 'Taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      },
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      },
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      }
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      },
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 4,
        title: 'Travel by train',
        price: 40
      }
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      }
    ]
  }
];

const mockPoints = [
  {
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    destination: 1,
    offers: [1, 2],
    type: 'Taxi'
  },
  {
    basePrice: 500,
    dateFrom: '2022-06-12T15:55:56.845Z',
    dateTo: '2022-07-15T16:22:13.375Z',
    destination: 1,
    offers: [1, 3],
    type: 'Bus'
  },
  {
    basePrice: 800,
    dateFrom: '2021-05-14T12:55:56.845Z',
    dateTo: '2021-06-17T13:22:13.375Z',
    destination: 1,
    offers: [2, 3, 4],
    type: 'Train'
  },
  {
    basePrice: 2100,
    dateFrom: '2023-09-10T14:55:56.845Z',
    dateTo: '2023-10-13T17:22:13.375Z',
    destination: 2,
    offers: [2, 3],
    type: 'Ship'
  },
  {
    basePrice: 100,
    dateFrom: '2020-02-15T18:55:56.845Z',
    dateTo: '2020-03-11T13:22:13.375Z',
    destination: 2,
    offers: [1],
    type: 'Drive'
  },
  {
    basePrice: 5000,
    dateFrom: '2020-01-12T19:55:56.845Z',
    dateTo: '2020-02-17T11:22:13.375Z',
    destination: 2,
    offers: [1, 2, 4],
    type: 'Flight'
  },
  {
    basePrice: 2500,
    dateFrom: '2020-03-10T20:55:56.845Z',
    dateTo: '2020-03-13T15:22:13.375Z',
    destination: 3,
    offers: [1, 3],
    type: 'Check-in'
  },
  {
    basePrice: 8000,
    dateFrom: '2020-09-13T21:55:56.845Z',
    dateTo: '2020-10-12T17:22:13.375Z',
    destination: 3,
    offers: [3, 4],
    type: 'Sightseeing'
  },
  {
    basePrice: 300,
    dateFrom: '2020-05-12T16:55:56.845Z',
    dateTo: '2020-06-10T20:22:13.375Z',
    destination: 3,
    offers: [2, 4],
    type: 'Restaurant'
  }
];

function getRandomTask() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export {getRandomTask, offersByTypes, destinations};
