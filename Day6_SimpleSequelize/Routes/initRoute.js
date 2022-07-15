const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");


module.exports = express.Router()
    .use(morgan())
    .use(bodyParser.json())
