const express = require("express")
const orders = require("../controller/orders")
const auth = require("../controller/auth")

exports.route = express.Router()
    .get("/create-order", auth.verify, orders.createOrder)
    .post("/add-item/:orderToken", auth.verify, orders.addItemToOrder)
    .get("/get/:orderToken",auth.verify, orders.getOrderById)
    .get("/get-user-order", auth.verify, orders.getOrdersByUser)