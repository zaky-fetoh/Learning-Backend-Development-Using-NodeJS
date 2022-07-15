const Product = require("../model/product_ops");
const logic = require("./Logic")

Object.entries(logic).forEach(([key, value])=>{
    exports[key] = value(Product); 
})