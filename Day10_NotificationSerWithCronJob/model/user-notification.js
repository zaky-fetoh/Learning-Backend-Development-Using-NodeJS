const mongoose = require("mongoose");


const userNotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Date,
        default: Date.now,
        required: true,
    },
})


module.exports = mongoose.model("userNotification",
    userNotificationSchema)