const supertest = require("supertest");
// const createServer = require("../server");

// const app = createServer()

const { app } = require("../index")



describe("encode route", () => {
    const tempDatabase = [];
    const urls = {}
    const { generateRandomString, baseUrl } = require('../index');

    let code, shortUrl;
    const longUrl = "https://indicina.co";


    describe("given the url is successfully shortend", () => {
        it("it should not find the url in tempDatabase", async () => {
            const data = tempDatabase.find(val => val.longUrl === longUrl);
            expect(data).toBeFalsy();

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

                console.log("code :", code);
                console.log("shortUrl :", shortUrl);

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
            const latest = tempDatabase.at(-1);

            expect(latest.code).toBe(code);
        })
        it("should return 201", async () => {
            const { statusCode } = await supertest(app).post('/encode').send({ "url": longUrl });
            expect(statusCode).toBe(201)
        })

    })
    describe("given the url entered has previously been shortened", () => {
        it("it should be found in the tempDatabase", async () => {
            const data = tempDatabase.find(val => val.longUrl === longUrl);
            expect(data).toBeTruthy();
        })
        it("it should return statusCode 200", async () => {
            const response = await supertest(app).post('/encode').send({ "url": longUrl })
            expect(response.statusCode).toBe(200);
        })
    })
})