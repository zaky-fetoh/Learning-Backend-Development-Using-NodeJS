const schNotification = require("../model/scheduled-notification");
const { isWithenServedInterval } = require("./served-interval")


exports.addNotification = async function (req, res, next) {
    let noti = req.body;
    try {
        if (!isWithenServedInterval(new Date(noti.deliveryTime))){
            let doc = await schNotification.create(noti);
            await res.status(200).json({
                ok: true,
                meta: {
                    doc,
                }
            });
        }
        else{
            //SendImdiate notification
        }
       
    } catch (e) {
        res.status(500).json({
            error: e,
        })
    }
};
