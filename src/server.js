const { app } = require("./index");
const { PORT } = require("./utils/port");

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

