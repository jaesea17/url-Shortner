const supertest = require("supertest");
const { app, baseUrl, generateRandomString } = require('../index');

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
        it("it shortUrl length should be 28", async () => {
            const response = await supertest(app).post('/encode')
                .send({ "url": "https://indicina.co" })
            expect(response.body.shortUrl.length).toEqual(28);
        })
    })
})
