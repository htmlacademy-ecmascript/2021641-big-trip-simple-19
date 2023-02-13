import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';
const DAY_FORMAT = 'DD MMM';
const HUMANIZE_DAY_FORMAT = 'YYYY-MM-DD';
const HUMANIZE_TIME_FORMAT = 'YYYY-MM-DDThh:mm';

const fullDateFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
const fullDateTo = (dateTo) => dateTo ? dayjs(dateTo).format(DATE_FORMAT) : '';
const dateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
const dateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
const dayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DAY_FORMAT) : '';
const humanizeDateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(HUMANIZE_TIME_FORMAT) : '';
const humanizeDateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(HUMANIZE_TIME_FORMAT) : '';
const humanizeDayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(HUMANIZE_DAY_FORMAT) : '';

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const firstLetterUp = (item) => {
  if (!item) {
    return item;
  }
  return item[0].toUpperCase() + item.slice(1);
};

export {fullDateFrom, fullDateTo, dateTimeFrom, dateTimeTo, dayDate, humanizeDateTimeFrom, humanizeDateTimeTo, humanizeDayDate, sortPointDay, sortPointPrice, firstLetterUp};
