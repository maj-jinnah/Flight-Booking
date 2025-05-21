const express = require("express");
const { PORT } = require("./config");
// const morgan = require("morgan");

const app = express();

console.log(PORT);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})