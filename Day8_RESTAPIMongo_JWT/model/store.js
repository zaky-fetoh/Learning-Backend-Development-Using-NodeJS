const mongoose = require("mongoose")

const supplierSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
        minLegth: 11,
    }
})

const supplyDetailsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productsInfo",
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "suppliers",
    },
    supplyQuantity: {
        type: Number,
        required: true,
        min: 0,
    },
    supplyDate: {
        type: Date,
        default: () => new Date(),
    },
})


const storeSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productsInfo",
    },
    currentQuantity: {
        type: Number,
        default: 0,
        min: 0,
    },
    lastSupplyDetails: [supplyDetailsSchema],
})

storeSchema.virtual("getAllSuppliers").get(async function () {
    let suppliersofthatProduct = [];
    await this.populate("lastSupplyDetails.supplier");
    for (let s of this.lastSupplyDetails)
    suppliersofthatProduct.push(s.supplier);
    return suppliersofthatProduct; 
});

supplyDetailsSchema.pre('save',async function(next){
    await exports.Store.updateOne({
        product:this.product,
    },{
        $inc :{"currentQuantity" : this.supplyQuantity},
        $push:{"lastSupplyDetails":this},
    });
    next()
})



exports.SupplyDetails = mongoose.model("supplyDetails", supplyDetailsSchema)
exports.Suppliers = mongoose.model('suppliers', supplierSchema);
exports.Store = mongoose.model('store', storeSchema);
