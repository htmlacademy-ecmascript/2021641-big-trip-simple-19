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
    name: 'Amsterdam',
    pictures: []
  },
];

const offersByTypes = [
  {
    type: 'taxi',
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
    type: 'bus',
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
    type: 'train',
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
    type: 'ship',
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
    type: 'drive',
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
    type: 'flight',
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
    type: 'check-in',
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
    type: 'sightseeing',
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
    type: 'restaurant',
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
    dateFrom: '2023-07-10T22:55:56.845Z',
    dateTo: '2023-08-11T11:22:13.375Z',
    destination: 1,
    id: 1,
    offers: [1, 2],
    type: 'taxi'
  },
  {
    basePrice: 500,
    dateFrom: '2023-06-12T22:55:56.845Z',
    dateTo: '2023-07-15T11:22:13.375Z',
    destination: 1,
    id: 2,
    offers: [1, 2],
    type: 'bus'
  },
  {
    basePrice: 800,
    dateFrom: '2023-05-14T22:55:56.845Z',
    dateTo: '2023-06-17T11:22:13.375Z',
    destination: 1,
    id: 3,
    offers: [2, 3, 4],
    type: 'train'
  },
  {
    basePrice: 2100,
    dateFrom: '2023-09-10T22:55:56.845Z',
    dateTo: '2023-10-13T11:22:13.375Z',
    destination: 2,
    id: 4,
    offers: [2, 3],
    type: 'ship'
  },
  {
    basePrice: 100,
    dateFrom: '2023-02-15T22:55:56.845Z',
    dateTo: '2023-03-11T11:22:13.375Z',
    destination: 2,
    id: 5,
    offers: [1],
    type: 'drive'
  },
  {
    basePrice: 5000,
    dateFrom: '2023-01-12T22:55:56.845Z',
    dateTo: '2023-02-17T11:22:13.375Z',
    destination: 2,
    id: 6,
    offers: [1, 2, 4],
    type: 'flight'
  },
  {
    basePrice: 2500,
    dateFrom: '2023-03-10T22:55:56.845Z',
    dateTo: '2023-03-13T11:22:13.375Z',
    destination: 3,
    id: 7,
    offers: [1, 3],
    type: 'check-in'
  },
  {
    basePrice: 8000,
    dateFrom: '2023-09-13T22:55:56.845Z',
    dateTo: '2023-10-12T11:22:13.375Z',
    destination: 3,
    id: 8,
    offers: [3, 4],
    type: 'sightseeing'
  },
  {
    basePrice: 300,
    dateFrom: '2023-05-12T22:55:56.845Z',
    dateTo: '2023-06-10T11:22:13.375Z',
    destination: 3,
    id: 9,
    offers: [2, 4],
    type: 'restaurant'
  }
];

function getRandomTask() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export {getRandomTask, offersByTypes, destinations};
