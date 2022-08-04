const cron = require("cron") 



new cron.CronJob( new Date(Date.now()+ 3000),()=>{
    console.log("hello");
}, null, true);