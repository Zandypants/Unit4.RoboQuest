const prisma = require("./connection");
const {faker} = require("@faker-js/faker");

async function seed() {
  const promises = [];
  for (let i = 0; i < 3; i++) {
    // Engineers
    await prisma.engineer.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password()
      }
    });

    // Robots per engineer
    for (let j = 0; j < 3; j++) {
      promises.push(prisma.robot.create({
        data: {
          name: `${faker.hacker.noun()} ${faker.hacker.verb()}`,
          color: faker.color.rgb(),
          engineerId: i+1
        }
      }));
    }
  }
  await Promise.all(promises);
}

if (require.main === module) {
  seed()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}