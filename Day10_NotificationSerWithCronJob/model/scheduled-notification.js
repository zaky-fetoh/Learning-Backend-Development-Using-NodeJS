const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Date,
        required: true,
        validate: {
            validator: v => Date.now() < v, 
            message : v => `${v} Past Date not valid input`,
        }
    }
});

module.exports = mongoose.model("scheduledNotification",
    notificationSchema)