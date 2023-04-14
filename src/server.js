// const express = require("express");

const { app } = require("./index");

// function createServer() {
//     const app = express();
//     // app.use(express.json());
//     return app
// }

app.listen(4000, () => {
    console.log(`listening on port 4000`);
});

// module.exports = createServer;