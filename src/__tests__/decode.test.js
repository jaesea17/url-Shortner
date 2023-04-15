const { app, baseUrl, tempDatabase, shortUrl } = require("../index");
const supertest = require("supertest");

describe('decode route', () => {
    describe('given successful decode', () => {
        it('it should return statusCode of 200', async () => {
            const res = await supertest(app).post('/encode').send({ "url": "https://google.com" })
            const shortUrl = res.body.shortUrl;
            const response = await supertest(app).post('/decode').send({ "url": shortUrl });

            expect(response.statusCode).toBe(200);
        })
        it('the url should contain baseUrl', async () => {
            const url = "https://google.com";
            const res = await supertest(app).post('/encode').send({ "url": url })
            const shortUrl = res.body.shortUrl;
            const response = await supertest(app).post('/decode').send({ "url": shortUrl });

            expect(response.body.longUrl).toBe(url)

        })
    })
})