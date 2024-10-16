const request = require("supertest");
const server = require ("../index");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const testUser = {
    email: "test@test.com",
    password: "Password123!",
};

describe("POST /api/v1/auth/signUp",()=> {
    it ("should response with 200 status code",()=>{

    })
    it ("should response with 400 status code",()=>{
        
    })
})