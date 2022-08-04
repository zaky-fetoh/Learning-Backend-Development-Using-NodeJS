const addNotiRoute = require("./routes/add-notification");

const mongoose = require("mongoose");
const express = require("express");
const cron = require("cron");


async function run(){
    await mongoose.connect("mongodb://localhost:27017/notifiaction")
    const app = express()
    app.use(express.json())
    app.use(addNotiRoute)
    app.listen(3000)
}
run()


