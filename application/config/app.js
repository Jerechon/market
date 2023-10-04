({
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',

  port: env.PORT || 3000,

  closeGraceDelay: 3000,

  instance: env.NODE_APP_INSTANCE || '0',
});
