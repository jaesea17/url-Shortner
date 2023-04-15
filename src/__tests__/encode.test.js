const supertest = require("supertest");
const { baseUrl, code, generateRandomString } = require('../index');

const { app } = require("../index")

describe("encode route", () => {
    describe("given the url is successfully shortend", () => {
        it("it should return statusCode 201", async () => {
            const response = await supertest(app).post('/encode')
                .send({ "url": "https://indicina.co" })

            expect(response.statusCode).toBe(201);
        })
        it("the generate function should return string of length 6", () => {
            const code = generateRandomString(6);
            expect(code.length).toEqual(6);
        })
        it("it should return shortUrl containing baseUrl", async () => {
            const response = await supertest(app).post('/encode')
                .send({ "url": "https://indicina.co" })
            expect(response.body.shortUrl).toContain(`${baseUrl}`)
        })
    })
    describe("given the url entered has previously been shortened", () => { })
})

// module.exports = { essentials }