const userNotification = require("../model/user-notification");
const schNotification = require("../model/scheduled-notification");
const mongoose = require("mongoose")
const cron = require("cron");


async function scheduleOne(notification, callback, arg) {
    new cron.CronJob(new Date(notification.deliveryTime),
        async function () {
            userNotification.create(
                {
                    user: notification.to,
                    details: notification.details,
                }
            )
            if (callback) callback(arg);
        }, async function () {
            if (notification._id)
                schNotification.deleteOne({
                    _id: new mongoose.Types.ObjectId(notification._id)
                }).exec();
        }, true)
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
exports.chainnedNotification = chainnedNotification;
exports.parallNotification= parallNotification;