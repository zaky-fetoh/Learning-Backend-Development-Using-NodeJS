const customer = require("../model/customer_ops");
const logic = require("./Logic")

Object.entries(logic).forEach(([key, value])=>{
    exports[key] = value(customer); 
})