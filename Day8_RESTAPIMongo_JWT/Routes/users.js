const users = require("../controller/users");
const express = require("express");


exports.route = express.Router()
    .post("/create", users.addUser)