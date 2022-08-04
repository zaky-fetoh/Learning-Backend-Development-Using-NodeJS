const userNotification = require("../model/user-notification");
const schNotification = require("../model/scheduled-notification");
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
            if (notification._id) {
                console.log(notification);
                schNotification.deleteOne({
                    _id: notification._id,
                }).exec();
            }
            if (callback) callback(arg);
        }, null, true)
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