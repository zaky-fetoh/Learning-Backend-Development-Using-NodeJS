const { runSchedule } = require("./controller/schedule-interval");
const addNotiRoute = require("./routes/add-notification");

const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan")


const PORT = process.env.PORT || 3000
const INTERVAL = 1

async function run() {
    await mongoose.connect("mongodb://localhost:27017/notifiaction")

    const app = express();
    app.use(morgan());
    app.use(express.json());
    app.use(addNotiRoute);

    runSchedule(INTERVAL);
    
    app.listen(PORT, () => {
        console.log(`Server Start listening at port ${PORT}`)
    })
}
run()


