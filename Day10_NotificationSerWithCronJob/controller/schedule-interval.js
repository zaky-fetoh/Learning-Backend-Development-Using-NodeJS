const cron = require("cron"); 
const interval = require("./served-interval");
const scheduleOPs= require("./notification-scheduler"); 
const schNotification = require("../model/scheduled-notification")


exports.runSchedule = function(INTERVAL){
    new cron.CronJob(`*/${INTERVAL} * * * *`,async function(){
        interval.setServedInterval(Date.now(), Date.now()+INTERVAL)
        const {start, end} = interval.getServedInterval;
        const Notis = await schNotification.find({
            deliveryTime:{
                $gte : start,
                $lt: end, 
            }
        }).exec()
        scheduleOPs.chainnedNotification(Notis)
    }, null, true)
}