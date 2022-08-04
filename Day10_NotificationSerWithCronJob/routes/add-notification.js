const express = require("express")

const addNoti = require("../controller/add-notification");

module.exports = express.Router()
    .post("/add-notification",addNoti.addNotification)