const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ACCESS = [
  {
    id: 1,
    name: "CARS",
    title: "Cars",
    route: null,
    method: null,
    createdBy: "Super Duper Admin"
  },
  {
    id: 2,
    name: "CARS_LIST",
    title: "List",
    is_submenu: true,
    route: "/cars",
    method: "GET",
    menu_id: 1,
    createdBy: "Super Duper Admin"
  },
  {
    id: 3,
    name: "ORDER",
    title: "Order",
    route: null,
    method: null,
    createdBy: "Super Duper Admin"
  },
  {
    id: 4,
    name: "ORDER_LIST",
    title: "List",
    is_submenu: true,
    route: "/order",
    method: "GET",
    menu_id: 3,
    createdBy: "Super Duper Admin"
  },
  {
    id: 5,
    name: "USERS",
    title: "Users",
    route: null,
    method: null,
    createdBy: "Super Duper Admin"
  },
  {
    id: 6,
    name: "USERS_LIST",
    title: "List",
    is_submenu: true,
    route: "/users",
    method: "GET",
    menu_id: 3,
    createdBy: "Super Duper Admin"
  },
  {
    id: 4,
    name: "MASTER",
    createdBy: "Super Duper Admin"
  },
  {
    id: 5,
    name: "ROLE_ACCESS",
    createdBy: "Super Duper Admin"
  },
  {
    id: 4,
    name: "ACCESS",
    createdBy: "Super Duper Admin"
  },
  {
    id: 5,
    name: "PROMOS",
    createdBy: "Super Duper Admin"
  },
  {
    id: 6,
    name: "ORDERS",
    createdBy: "Super Duper Admin"
  },
];

async function accessSeed() {
  await prisma.access.deleteMany()
  return await prisma.access.createMany({
    data: ACCESS,
  });
}
