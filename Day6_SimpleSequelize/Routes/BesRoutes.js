const express = require("express");
const customer = require("../controller/CustomerLogic");
const product = require("../controller/productLogic");

console.log(customer) 


function getRouter(middle, name) {
    return express.Router()
        .post("/add_"+name, middle.addItem)
        .get("/get_all_"+name, middle.findAll)
        .post("/find_id_"+name, middle.findId)
        .post("/find_"+name, middle.find)
        .post("/delete_" + name , middle.destory)
}

exports.customerRoute = getRouter(customer, "customer")
exports.productRoute = getRouter(product, "product")