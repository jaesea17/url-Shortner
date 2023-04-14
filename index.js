const express = require("express");
const app = express();

app.use(express.json());

const PORT = 4000;

const tempDatabase = [];
const baseUrl = `http://localhost:${PORT}`;

app.get('/:urlPath', (req, res) => {
    const code = req.params.urlPath;
    const data = tempDatabase.find(val => val.code === code);
    if (data) {
        res.redirect(data.longUrl)
    } else {
        res.status(404).json("url not found");
    }
})

app.post('/encode', (req, res) => {
    const longUrl = req.body.url;
    const data = tempDatabase.find(val => val.code === code);
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
    urls["date"] = new Date();

    tempDatabase.push(urls);
    res.status(200).json({ shortUrl });

})

app.post('/decode', () => {
    const shortUrl = req.body.url;
    const longUrl = tempDatabase.find(val => val.shortUrl === shortUrl).longUrl;
    res.json({ longUrl });
})

app.post('/statistic/:urlPath', () => {

})

function generateRandomString(length) {
    const characters = 'ab78cABCdefDEFghijklmnopGHI45JKLMN0123OPqrstuvwxyzQRST69UVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
