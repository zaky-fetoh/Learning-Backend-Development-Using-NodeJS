const schNotification = require("../model/scheduled-notification");
const userNotification = require("../model/user-notification");
const cron = require("cron");

async function sendNotification(notification) {
    userNotification.create({
            user: notification.to,
            details: notification.details,
    })
    if (notification._id) {
        // console.log(notification);
        schNotification.deleteOne({
            _id: notification._id,
        }).exec();
    }
}

async function scheduleOne(notification, callback, arg) {
    try{
    new cron.CronJob(new Date(notification.deliveryTime),
        async function () {
            sendNotification(notification)
            if (callback) callback(arg);
        }, null, true);
    }catch{
        sendNotification(notification);
        if (callback) callback(arg);
    }
}

async function chainnedNotification(sortedNotification) {
    if (!sortedNotification.length) return;
    const noti = sortedNotification.shift();
    scheduleOne(noti, chainnedNotification, sortedNotification)
}

async function parallNotification(Notifications) {
    for (let doc of Notifications)
            scheduleOne(doc);
}

exports.scheduleOne = scheduleOne;
exports.parallNotification = parallNotification;
exports.chainnedNotification = chainnedNotification;