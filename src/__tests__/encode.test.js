const supertest = require("supertest");
// const createServer = require("../server");

// const app = createServer()

const { app } = require("../index")

const tempDatabase = [];
const urls = {}
const { generateRandomString, baseUrl } = require('../index');

let longUrl, code, shortUrl;


describe("encode route", () => {
    describe("given the url is successfully shortend", () => {
        it("it should not find the url in tempDatabase", async () => {
            await supertest(app).post('/encode', (req, res) => {
                longUrl = req.body.url;
                const data = tempDatabase.find(val => val.longUrl === longUrl);
                expect(data).toBe(undefined);
            })
        })
        it("it should generate a shortUrl", () => {
            code = generateRandomString(6);
            shortUrl = `${baseUrl}/${code}`;
            const sUrlLength = shortUrl.length;
            expect(shortUrl).toContain(`${baseUrl}/${code}`);
            expect(sUrlLength).toEqual(28)
        })
        it(`it should create an object, that contains, 
        'longUrl', 'shortUrl', 'code', 'dateCreated' and 'timesVisited'`,
            () => {
                const date = new Date()

                urls["longUrl"] = longUrl;
                urls["shortUrl"] = shortUrl;
                urls["code"] = code;
                urls["dateCreated"] = date;
                urls["timesVisited"] = 0;

                expect(urls["longUrl"]).toBe(longUrl);
                expect(urls["shortUrl"]).toBe(shortUrl);
                expect(urls["code"]).toBe(code);
                expect(urls["dateCreated"]).toBe(date);
                expect(urls["timesVisited"]).toEqual(0);
            })
        it("should push into tempDatabase", () => {
            tempDatabase.push(urls);
            const lastest = tempDatabase.at(-1);

            expect(lastest.code).toBe(code);
        })
        it("should return 201", async () => {
            const { statusCode } = await supertest(app).post('/encode').send({ url: "https://indicina.co" });
            expect(statusCode).toBe(201)
        })

    })
})