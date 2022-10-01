const host = "localhost"
const port = 4000;

const fs = require('fs')
const path = require("path")
const morgan = require('morgan')

const router = require("./src/routes");

const express = require("express"),
    app = express();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan("dev"))
app.use(express.json());

// ROUTERS
app.use("/api", router);

// START
app.listen(port, function () {
    console.log(`Server is running on http://${host}:${port}`);
});