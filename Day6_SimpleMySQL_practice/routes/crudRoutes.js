const ops = require("../controller/logic");
const express = require("express"); 


const route = express.Router();

route.get("/get_all_employee", ops.getAllEmployee); 
route.post("/update_employee", ops.updateEmployee);
route.post("/add_employee", ops.addEmployee);
route.post("/find", ops.find);

exports.routes = route ;