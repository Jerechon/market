/**
 * @see https://day.js.org/
 */
const dayjs = require('dayjs');
const weekday = require('dayjs/plugin/weekday');
const localeData = require('dayjs/plugin/localeData');
require('dayjs/locale/ru');

dayjs.locale('ru');
dayjs.extend(weekday);
dayjs.extend(localeData);

module.exports = dayjs;
