const express = require("express")
const auth = require("../controller/auth")
const prodInfo = require("../controller/productsInfo")

exports.route = express.Router()
.get("/get-all", prodInfo.getAll)
.get("/get/:prodId", prodInfo.getSingleProduct)
.post("/add", auth.verify, auth.isAdmin, prodInfo.addProduct)