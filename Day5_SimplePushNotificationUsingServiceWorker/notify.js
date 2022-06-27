const webpush = require('web-push'),
    subscrDB = require('./subscriDB');

/*
> npx web-push generate-vapid-keys [--json]
=======================================

Public Key:
BDh6kcUfD7Lq3ofr2b8lJzHhQBg_NBNkgCVWE8NM7n5OAp1GipznXeqz2AOW2BE9f4wNWS-_-ujvf-x6OkGqXYI

Private Key:
146dRK4VLs9j--bQa5klVkQ7peDKKgxHuJAa4Xm0rQI

=======================================
*/
const PUBLIC_KEY = 'BDh6kcUfD7Lq3ofr2b8lJzHhQBg_NBNkgCVWE8NM7n5OAp1GipznXeqz2AOW2BE9f4wNWS-_-ujvf-x6OkGqXYI'
const PRIVATE_KEY= '146dRK4VLs9j--bQa5klVkQ7peDKKgxHuJAa4Xm0rQI'


webpush.setVapidDetails(
        'mailto:example@yourdomain.org',
        PUBLIC_KEY,
        PRIVATE_KEY
      );

exports.NotifyAll = function(){
    console.log('send')
    subscrDB.getAllSubscriptions.forEach(subcr => {
        let data = JSON.stringify({update:"Hello From server"});
        webpush.sendNotification(subcr, data)
        console.log("Subsent")
    });
}