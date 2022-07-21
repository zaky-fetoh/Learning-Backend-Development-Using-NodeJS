const mongoose = require("mongoose");
const store = require("./store").Store

const productsInfoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'store'
    },

    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    productionDate: {
        type: Date,
        required: true,
    },
    expireAfterMonths: {
        type: Number,
        default: null,
    },
})

productsInfoSchema.virtual("expirationDate").get(function(){
    return new  Date(
        this.productionDate.getFullYear(),
        this.productionDate.getMonth() + this.expireAfterMonths,
        this.productionDate.getDate(),
    )
});

productsInfoSchema.post('save', async function(doc, next){
        let stdoc = await store.create({
            product: new mongoose.Types.ObjectId(doc._id)
        }); 
        // doc.update
        await module.exports.updateOne({
            product: doc._id,
        },{
            $set:{
                storeId:new mongoose.Types.ObjectId(stdoc._id),
            }
        })
        next();
})




module.exports = mongoose.model('productsInfo', productsInfoSchema)