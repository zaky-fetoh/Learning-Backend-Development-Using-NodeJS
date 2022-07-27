const Notification = require("../model/notifModel").Notification;
const Users = require("../model/Users")

CurrentServedInterval = {
    start: 0, end: 0,
}

const sendNotification = async function (to, from, details) {
    const result = await Users.updateOne({ _id: to, }, {
        $push: {
            Notifications: {
                from: from,
                details: details,
                date: Date.now(),
            }
        }
    });
    return result;
};

async function chainingNotiCalls(allNotis) {
    if (!allNotis.length) return;
    else setTimeout(() => {
        let no = allNotis[0];
        sendNotification(no.to, no.from, no.details);
        allNotis.shift();
        chainingNotiCalls(allNotis)
    }, allNotis[0].deliveryTime);
};

exports.sendNotifWithen = async function (interval = 1000 * 60 * 60) {
    CurrentServedInterval.start = Date.now();
    CurrentServedInterval.end = Date.now() + interval;
    try {
        const docs = await Notification.find({
            deliveryTime: {
                $gte: CurrentServedInterval.start,
                $lt: CurrentServedInterval.end,
            }
        }).sort({
            deliveryTime: 1,
        }).exec();
        
        console.log(docs);
        console.log(`A ${docs.length} Notification is Scheduled to be sent from ${CurrentServedInterval.start} To ${CurrentServedInterval.end}` )

        chainingNotiCalls(docs);

    } catch (err) {
        console.log(err);
    }
}


exports.scheduleNotification = function (notificationObject) {
    if (notificationObject.deliveryTime >= CurrentServedInterval.start
        && notificationObject.deliveryTime < CurrentServedInterval.end)
        setTimeout(() => {
            sendNotification(notificationObject.to,
                notificationObject.from,
                notificationObject.details);
        }, notificationObject.deliveryTime);
    else Notification.create(notificationObject);
}

