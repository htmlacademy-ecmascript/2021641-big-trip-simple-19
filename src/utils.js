import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';
const DAY_FORMAT = 'DD MMMM';

const fullDateFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
const fullDateTo = (dateTo) => dateTo ? dayjs(dateTo).format(DATE_FORMAT) : '';
const dateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
const dateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
const dayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DAY_FORMAT) : '';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export {getRandomArrayElement, fullDateFrom, fullDateTo, dateTimeFrom, dateTimeTo,dayDate};
