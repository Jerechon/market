'use strict';

/**
 *
 * @see https://github.com/node-schedule/node-schedule
 */

const cron = require('node-schedule');

const WEEKDAYS = {
  Понедельник: 1,
  Вторник: 2,
  Среда: 3,
  Четверг: 4,
  Пятница: 5,
  Суббота: 6,
  Воскресенье: 7,
};

const job = (name, callback) => {
  return () => {
    try {
      callback();
    } catch (error) {
      console.log(`Ошибка выполнения задачи по расписанию ${name}`, error);
    }
  };
};

const start = (tasks, instance) => {
  if (instance !== '0') return;

  for (const [name, task] of Object.entries(tasks)) {
    const rule = new cron.RecurrenceRule();
    rule.hour = task.hour ?? null;
    rule.minute = task.minute ?? null;
    rule.dayOfWeek = task.dayOfWeek ? task.dayOfWeek.map(day => WEEKDAYS[day]) : null;
    rule.tz = 'Europe/Moscow';
    cron.scheduleJob(rule, job(name, task.handler));
  }
};

module.exports = {
  start,
};
