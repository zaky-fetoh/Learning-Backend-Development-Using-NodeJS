const users = require("../controller/users");
const express = require("express");
const auth = require("../controller/auth")


exports.route = express.Router()
    .post("/create", users.addUser) //TODO include isAdmin Verification.
    .get("/info", auth.verify ,users.getMyInfo)
    .put("/update", auth.verify, users.updateInfo)