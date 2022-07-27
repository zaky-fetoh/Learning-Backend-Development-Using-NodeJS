require("mongoose")
    .connect("mongodb://localhost:27017/firstREST")
    .then(async function(){
        const Users = require("./model/Users")
        const Noti = require("./model/notifModel").Notification;
        const utils= require("./utils/utils")


        const mah = await Users.create({
            name: "mahmoudZaky",
        });
        const omar = await Users.create({
            name: "OmerZaky",
        });

        utils.scheduleNotification({
            to: omar._id,
            from: mah._id,
            details: "Hello omer",
            deliveryTime: Date.now() + 25* 1000
        })
        utils.scheduleNotification({
            to: omar._id,
            from: mah._id,
            details: "Hello omer2",
            deliveryTime: Date.now() + 30*1000
        })
        utils.scheduleNotification({
            from: omar._id,
            to: mah._id,
            details: "Hello mah",
            deliveryTime: Date.now() + 22*1000
        })


    });