const morgan = require("morgan");
const express= require("express");


exports.route = express.Router()
.use(morgan("combined"))
.use(express.json())
.use(express.urlencoded())
