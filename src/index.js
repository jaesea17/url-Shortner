const express = require('express');

const { tempDatabase } = require('./utils/database');
const { generateRandomString } = require('./utils/generateCode');
const { PORT } = require('./utils/port');

const app = express();
app.use(express.json());

const baseUrl = `http://localhost:${PORT}`;

app.get('/:urlPath', (req, res) => {
    const code = req.params.urlPath;
    let index;
    const data = tempDatabase.find((val, i) => {
        index = i;
        return val.code === code;
    });
    if (data) {
        data.timesVisited += 1;
        tempDatabase.splice(index, 1, data);
        res.redirect(data.longUrl)
    } else {
        res.status(404).json("url not found");
    }
})

app.post('/encode', (req, res) => {
    const longUrl = req.body.url;
    const data = tempDatabase.find(val => val.longUrl === longUrl);
    if (data) {
        const shortUrl = data.shortUrl;
        res.status(200).json({ shortUrl });
        return;
    }

    const code = generateRandomString(6);
    const shortUrl = `${baseUrl}/${code}`;

    const urls = {};
    urls["longUrl"] = longUrl;
    urls["shortUrl"] = shortUrl;
    urls["code"] = code;
    urls["dateCreated"] = new Date();
    urls["timesVisited"] = 0;

    tempDatabase.push(urls);
    res.status(201).json({ shortUrl });

})

app.post('/decode', (req, res) => {
    const shortUrl = req.body.url;
    const longUrl = tempDatabase.find(val => val.shortUrl === shortUrl).longUrl;
    if (longUrl) {
        res.status(200).json({ longUrl });
        return;
    }
    res.status(404).json({ message: "not found" })
})

app.get('/statistic/:urlPath', (req, res) => {
    const code = req.params.urlPath;
    const data = tempDatabase.find(val => val.code === code);
    if (data) {
        const dateCreated = data.dateCreated;
        const timesVisited = data.timesVisited;
        res.status(200).json({
            dateCreated,
            timesVisited
        })
    }
})



module.exports = { app, generateRandomString, baseUrl }
