const { PrismaClient } = require("@prisma/client");

const userSeed = require('./seeder/user')
const carSeed = require('./seeder/cars')
const roleSeed = require('./seeder/role')
const roleAccessSeed = require('./seeder/roleAccess')

const prisma = new PrismaClient();

async function main() {
  const role = await roleSeed()
  const user = await userSeed()
  const car = await carSeed()
  const access = await roleAccessSeed()

  console.log(user, role, car, access)
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
