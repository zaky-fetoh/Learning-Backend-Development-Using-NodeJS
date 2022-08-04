const cron = require("cron");
const interval = require("./served-interval");
const scheduleOPs = require("./notification-scheduler");
const schNotification = require("../model/scheduled-notification")

async function serveInterval (I){

    const old = interval.getServedInterval()
    interval.setServedInterval(old.end, old.end + I)
    const { start, end } = interval.getServedInterval();

    const Notis = await schNotification.find({
        deliveryTime: {
            $gte: start, 
            $lt: end,
        }
    }).sort({deliveryTime: 1,}).exec()
    
    console.log(`Current Interval from ${new Date(start)} to ${new Date(end)} total Notification ${Notis.length}.`)
    scheduleOPs.chainnedNotification(Notis)
}

exports.runSchedule = function (INTERVAL) {
    const I = INTERVAL * 60000;
    interval.setServedInterval(null,Date.now())
    serveInterval(I);
    new cron.CronJob(`*/${INTERVAL} * * * *`, async function () {
        serveInterval(I);
    }, null, true)
}