const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: ()=> new mongoose.Types.ObjectId(),
    },
    name:{
        type:String, 
        required: true
    },
    password:{
        type:String
    },
    age:{
        type: Number,
        min:7, 
        max:100,
    }, 
    // email:{
    //     type: String,
    //     required: function(){
    //         return this.age > 18; 
    //     },
    // },
    Notifications:[{
        from: mongoose.Schema.Types.ObjectId,
        details: String,
        date:{
            type: Date, 
            default: Date.now,
        },
    }],
    addDate:{
        type:Date,
        default:()=> new Date(),
    }
})

const users = mongoose.model('users', userSchema);

module.exports = users
