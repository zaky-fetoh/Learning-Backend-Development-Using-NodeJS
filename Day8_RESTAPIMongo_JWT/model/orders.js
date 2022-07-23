const mongoose = require("mongoose")
const Store = require("./store").Store;

const orderItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productsInfo",
    },
    quantity:{
        type: Number, 
        default: 1,
    },
})

orderItemSchema.post("save", async function(doc, next){
    await Store.updateOne({
        product: doc.product,
    },{
        $inc:{"currentQuantity": -doc.quantity},
    })
    next()
});




// orderItemSchema.virtual("totalCost").get(async function(){
//     await this.populate("product")
//     return this.product.cost* this.quantity; 
// });

const ordersSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "users",
    },
    createDate:{
        type: Date, 
        default: ()=> new Date(),
    },
    products:[{
        type: orderItemSchema,
        default:null,
        }],
})

ordersSchema.statics.pushOrderItem = async function(orid, Item){
    return this.updateOne({_id : orid},
        {$push:{"products" : Item}
        }).exec(); 
}

ordersSchema.virtual("getOrederTotalCost").get(async function(){
    let sum = 0;
    await this.populate({
        path:"products.product"
    })
    console.log(this)
    for(let p of this.products) sum += p.product.cost * p.quantity;    
    return sum;
})

exports.OrderItem = mongoose.model('orderItem', orderItemSchema);
exports.Orders = mongoose.model('orders', ordersSchema);