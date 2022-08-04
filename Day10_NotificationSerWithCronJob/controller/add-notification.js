const schNotification = require("../model/scheduled-notification");
const { isWithenServedInterval } = require("./served-interval")
const scheduleOps = require("./notification-scheduler");

exports.addNotification = async function (req, res, next) {
    let noti = req.body;
    try {
        if (!isWithenServedInterval(new Date(noti.deliveryTime))) {
            await schNotification.create(noti);
        }
        else {
            console.log("One Notification Directly scheduled")
            scheduleOps.scheduleOne(noti)
        }
        res.status(200).json({
            ok: true,
            meta: {
                noti,
            }
        });
    } catch (e) {
        res.status(500).json({
            ok:false,
            error: e,
        })
    }
};
