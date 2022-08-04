const schNotification = require("../model/scheduled-notification");
const { isWithenServedInterval } = require("./served-interval")
const scheduleOps = require("./notification-scheduler");

exports.addNotification = async function (req, res, next) {
    let noti = req.body;
    try {
        if (!isWithenServedInterval(new Date(noti.deliveryTime))) {
            let doc = await schNotification.create(noti);
        }
        else {
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
            error: e,
        })
    }
};
