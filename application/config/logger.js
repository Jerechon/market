({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss o',
      ignore: 'pid,hostname',
    },
  },
  level: 'fatal', // info | fatal | debug
});
