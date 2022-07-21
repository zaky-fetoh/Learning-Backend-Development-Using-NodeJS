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
    age:{
        type: Number,
        min:7, 
        max:100,
    }, 
    email:{
        type: String,
        required: function(){
            return this.age > 18; 
        },
        match: /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/,
    },
    addDate:{
        type:Date,
        default:()=> new Date(),
    }
})

userSchema.virtual("NumofDays").get(function(){
        let numsec =  new Date() - this.addDate 
        let TotalDays = Math.ceil(numsec / (1000 * 3600 * 24));
        return TotalDays;
})

userSchema.virtual("AddedSince").get(function(){
        let days = this.NumofDays ;
        let years = Math.floor(days / 360);
        let remaining = days % 360; 
        return `Created ${years} year(s) and ${remaining} day(s) ago.`;
})

module.exports = mongoose.model('users', userSchema);