module.exports = {
  apps: [
    {
      name: '88date',
      script: 'main.js',
      instances: '3',
      exec_mode: 'cluster',
    },
    {
      name: 'prisma',
      script: 'npx',
      args: 'prisma studio',
    },
  ],
};
