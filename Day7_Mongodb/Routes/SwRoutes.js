const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser")

const BRoutes = require("./BRoutes")

exports.Routes = express.Router()
.use(morgan())
.use(bodyParser.json())
.use(BRoutes.BRoutes);
