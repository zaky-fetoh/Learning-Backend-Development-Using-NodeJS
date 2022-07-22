require("mongoose").connect("mongodb://localhost:27017/firstREST", () => {
require("dotenv").config();    

    const mongoose = require("mongoose");
    const express = require("express")
    const db = require("./model/init");
    const auth = require("./controller/auth")
    const bodyParser = require("body-parser")

    new db.Users({
        name: "ah zaKy", 
        age: 15,
        password:"1234",
        email:"mah@gmail.com", 
    }).save(); 

    new express()
    .use(bodyParser.json())
    .post("/login",auth.login)
    .use('/g', auth.verify,(req,res, next)=>{
        console.log(req.userId);
    }).listen(3000,()=>{
        console.log("SerVerStarTed");
    });



    //main();
    async function main(){
    let user = new User({
        name: "ah zaKy", 
        age: 15,
        //email:"mah@gmail.com", 
    }); 
    await user.save(); 

    let prod = new ProductInfo({
        name:"mogo", 
        cost:25,
        productionDate: new Date(2014,1,1),
        expireAfterMonths:4,
    });
    
    await prod.save(); 
    
    console.log(prod.expirationDate); 

    order = new Orders({
        owner: new mongoose.Types.ObjectId(user._id),
        products:[{
            product:new mongoose.Types.ObjectId(prod._id),
            quantity:5
        },{
            product:new mongoose.Types.ObjectId(prod._id),
            quantity:5
        }]
    }); 



    await order.save()
    console.log("saved")
    console.log(await order.getOrederTotalCost);

    const supp = await s.Suppliers.create({
        name:"aboGhaz",
        contactNumber:"01234567890"
    });
    
    s.SupplyDetails.create(
        {
            product:prod._id,
            supplier: supp._id,
            supplyQuantity:100
        }
    )
    let prod1 =await ProductInfo.findOne({
        _id: prod._id,
    }).populate("storeId")
    console.log(prod1)
    console.log(await prod1.storeId.getAllSuppliers)

} 


    // async function run (){
    //     let cursor = await User.find().cursor();
    //     for await(let doc of cursor) doc.remove();
    // };run();
    


    
    // express()
    //     //.use Block
    //     .listen(300, () => {
    //         console.log("ServerStarted");
    //     })
}, e => {
    throw new Error("Can Not Connect Mongodb database");
})
