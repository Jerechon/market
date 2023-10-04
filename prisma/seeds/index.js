require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed команда завершенна')
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
