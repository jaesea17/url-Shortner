const supertest = require("supertest")
const { app } = require("../index")

describe("statistics route", () => {
    describe("given that the stats are successfully retrieved", () => {
        it("should return statusCode of 200", async () => {
            const res = await supertest(app).post('/encode').send({ "url": "https://google.com" });
            const code = res.body.shortUrl.split('/').at(-1);
            const response = await supertest(app).get(`/statistic/${code}`);
            expect(response.statusCode).toBe(200);
        })
        it("should return 'dateCreated' and 'timesVisited'", async () => {
            const res = await supertest(app).post('/encode').send({ "url": "https://google.com" });
            const code = res.body.shortUrl.split('/').at(-1);
            const response = await supertest(app).get(`/statistic/${code}`);
            const visted = response.body.timesVisited;
            const dateCreated = response.body.dateCreated;

            expect(Number.isInteger(visted)).toBe(true);
            expect(dateCreated).toBeTruthy();
        })
    })
})