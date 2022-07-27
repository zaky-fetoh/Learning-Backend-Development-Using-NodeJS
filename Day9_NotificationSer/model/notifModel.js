const mongoose = require("mongoose");

notificationSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    details:{
        type:String, 
        required: true,
    },
    deliveryTime: {
        type: Date,
    },
});
exports.Notification = mongoose.model("notification", notificationSchema);

