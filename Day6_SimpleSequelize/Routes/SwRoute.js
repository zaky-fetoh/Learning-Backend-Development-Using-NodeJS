const initR = require("./initRoute");
const BessR = require("./BesRoutes");
const express = require("express");





module.exports = express.Router()
.use(initR)
.use(BessR.customerRoute)
.use(BessR.productRoute);
