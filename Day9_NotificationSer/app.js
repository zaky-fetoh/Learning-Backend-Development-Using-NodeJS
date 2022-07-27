require("mongoose")
    .connect("mongodb://localhost:27017/firstREST")
    .then(() => {
        const utils = require("./utils/utils")
        const INTERVAL = 1000 * 7;// according to the 
        setInterval(() => {
            utils.sendNotifWithen(INTERVAL);
        }, INTERVAL)
    });