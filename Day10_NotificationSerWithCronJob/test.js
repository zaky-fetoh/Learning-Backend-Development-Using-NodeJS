const cron = require("cron") 



new cron.CronJob("*/3 * * * * *",function(){
    console.log("hello")
    console.log(this.nextDates()) 
}, null, true);