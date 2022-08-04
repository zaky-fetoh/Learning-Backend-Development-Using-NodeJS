const {runSchedule} = require("./controller/schedule-interval");
const addNotiRoute = require("./routes/add-notification");
const mongoose = require("mongoose");
const express = require("express");


const PORT = process.env.PORT || 3000
const INTERVAL = 3

async function run(){
    await mongoose.connect("mongodb://localhost:27017/notifiaction")
    const app = express()
    app.use(express.json())
    app.use(addNotiRoute)
    runSchedule(INTERVAL)
    app.listen(PORT,()=>{
        console.log(`Server Start listening at port ${PORT}`)
    })
}
run()


