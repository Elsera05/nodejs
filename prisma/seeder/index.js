const { PrismaClient } = require("@prisma/client");

const roleSeed = require('./role')
const menuSeed = require('./menu')
const userSeed = require('./user')
const accessSeed = require('./access')


const prisma = new PrismaClient();

async function main() {
  const role = await roleSeed()
  const menu = await menuSeed()
  const user = await userSeed()
  const access = await accessSeed()

  console.log(user, role, menu, access)
  console.log(`Database has been seeded. 🌱`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
