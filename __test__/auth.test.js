const request = require("supertest");
const server = require("../index");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const testUser = {
    email: "test@test.com",
    password: "Password123!",
};

describe("POST /api/v1/auth/signup", () => {
    it("should response with 200 status code", () => {
        request(server)
            .post("api/v1/auth/signup")
            .send(testUser)
            .set("Accept", "application/json")
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).objectContaining({
                    code: 200,
                    status: "success",
                    message: "Sign up succesfully",
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
                            roleID: 3,
                            createBy: null,
                            createDt: expect(
                                new Date(res.body.data.user.createDt))
                                .toBeInstaceOf(Date),
                            updateBy: null,
                            updateDT: expect(
                                new Date(res.body.data.user.updateDt))
                                .toBeInstaceOf(Date),
                        }
                    })
                })
            })
    })
    it("should response with 400 status code", () => {

    })
})

// afterAll(() => {
//     prisma.users.deleteMany();
//     server.close()
// })