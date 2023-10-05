require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = ['Техника', 'Одежда', 'Акссесуары'];

  const tehProducts = [
    {
      title: 'Ноутбук',
      price: 1500,
      category: 'Техника',
    },
    {
      title: 'Телефон',
      price: 560,
      category: 'Техника',
    },
    {
      title: 'Мышка',
      price: 150,
      category: 'Техника',
    },
  ];

  const clothesProducts = [
    {
      title: 'Носки',
      price: 25,
      category: 'Одежда',
    },
    {
      title: 'Худи',
      price: 300,
      category: 'Одежда',
    },
    {
      title: 'Джинсы',
      price: 225,
      category: 'Одежда',
    },
  ];

  const accessoryProducts = [
    {
      title: 'Кольцо',
      price: 3210,
      category: 'Акссесуары',
    },
    {
      title: 'Ожерелье',
      price: 5000,
      category: 'Акссесуары',
    },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: {
        title: category,
      },
    });
  }

  for (const product of tehProducts) {
    const category = await prisma.category.findFirst({
      where: {
        title: 'Техника',
      },
    });

    await prisma.product.create({
      data: {
        title: product.title,
        price: product.price,
        categoryId: category.id,
      },
    });
  }

  for (const product of clothesProducts) {
    const category = await prisma.category.findFirst({
      where: {
        title: 'Одежда',
      },
    });

    await prisma.product.create({
      data: {
        title: product.title,
        price: product.price,
        categoryId: category.id,
      },
    });
  }

  for (const product of accessoryProducts) {
    const category = await prisma.category.findFirst({
      where: {
        title: 'Акссесуары',
      },
    });

    await prisma.product.create({
      data: {
        title: product.title,
        price: product.price,
        categoryId: category.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed команда завершенна');
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
