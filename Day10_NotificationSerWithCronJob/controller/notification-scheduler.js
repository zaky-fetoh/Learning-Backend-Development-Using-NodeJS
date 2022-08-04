const userNotification = require("../model/user-notification");
const schNotification = require("../model/scheduled-notification");
const cron = require("cron");


async function scheduleOne(notification, callback, ...args) {
    new cron.CronJob(new Date(notification.deliveryTime),
        async function () {
            userNotification.create(
                {
                    user: notification.to,
                    details: notification.details,
                }
            )
            if (callback) callback(...args);
        }, async function () {
            if (notification._id)
                schNotification.deleteOne({
                    _id: notification._id
                }).exec();
        }, true)
}


async function chainnedNotification(sortedNotification) {
    if (!sortedNotification.length) return;
    const noti = sortedNotification.shift();
    scheduleOne(noti, chainnedNotification, sortedNotification)
}

exports.scheduleOne = scheduleOne 
exports.chainnedNotification = chainnedNotification