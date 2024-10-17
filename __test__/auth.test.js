const request = require("supertest");
const server = require("../index");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const testUser = {
    email: "test@test.com",
    password: "Password123!",
};

describe("POST /api/v1/auth/signUp", () => {
    it("should response with 200 status code", (done) => {
        request(server)
            .post("/api/v1/auth/signUp")
            .send(testUser)
            .set("Accept", "application/json")
            .then((res) => {
                expect(res.statusCode).toBe(201)
                expect(res.body).toEqual(expect.objectContaining({
                    code: 201,
                    status: "success",
                    message: "User created successfully",
                    data: expect.objectContaining({
                        user: {
                            email: "test@test.com",
                            password: expect.not.stringContaining("Password123!"),
                            address: null,
                            avatar: null,
                            birthdate: null,
                            fullname: null,
                            driver_license: null,
                            gender: null,
                            phone_number: null,
                            roleId: 3,
                            createdBy: null,
                            createdDt: expect.any(String),
                            updatedBy: null,
                            updatedDt: expect.any(String),
                        }
                    })
                }))
                done()
            })
            .catch(e => {
                console.log(e)
                done()
            })
    })
    it("should response with 400 status code", () => {
    })
});

describe("POST /api/v1/auth/signIn", () => {
    it("should response with 200 status code", (done) => {
        request(server)
            .post("/api/v1/auth/signIn")
            .send(testUser)
            .set("Accept", "application/json")
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toEqual(expect.objectContaining({
                    code: 200,
                    status: "success",
                    message: "Sign In Successfully",
                    data: expect.objectContaining({
                        user: {
                            email: "test@test.com",
                            address: null,
                            avatar: null,
                            birthdate: null,
                            fullname: null,
                            driver_license: null,
                            gender: null,
                            phone_number: null,
                            roleId: 3,
                            createdBy: null,
                            createdDt: expect.any(String),
                            updatedBy: null,
                            updatedDt: expect.any(String),
                        }
                    })
                }))
                done()
            })
            .catch(e => {
                console.log(e)
                done()
            })
    })
    it("should response with 400 status code", () => {
    })
})
