const userNotification = require("../model/user-notification");
const schNotification = require("../model/scheduled-notification");
const cron = require("cron");


async function scheduleOne(notification, callback, ...args) {
    new cron.CronJob(noti.deliveryTime,
        async function () {
            await userNotification.create(
                {
                    to: notification.to,
                    details: notification.details,
                }
            )
            if (!callback) callback(args);
        }, async function () {
            if (!notification._id)
                await schNotification.deleteOne({
                    _id: notification._id
                })
        }, true)
}


async function chainnedNotification(sortedNotification) {
    if (!sortedNotification.length) return;
    const noti = sortedNotification.shift();
    scheduleOne(noti, chainnedNotification, sortedNotification)
}

exports.scheduleOne = scheduleOne 
exports.chainnedNotification = chainnedNotification