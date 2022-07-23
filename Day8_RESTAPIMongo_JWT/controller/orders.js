const db = require("../model/init")
const jwt= require("jsonwebtoken")

exports.createOrder = async function(req, res, next){
    const userId = req.userId; 
    const order = await db.Orders.create({
            owner: userId,
    })
    jwt.sign({orderId:order._id},
        process.env.JWT_SECRET_KEY, 
        {expiresIn:"1h"},(err, token)=>{
            if(err) return res.status(500).json({
                err:"Error, Try Again"
            });
            res.status(200).json({
                orderId :token,
                _info:{
                    message:"an order is created start to add Products",
                    ex:"/order/add-item/<OrderId>",
                    method:"POST",
                }
            })
        })
}

exports.addItemToOrder = function(req,res, next){
    const orderToken = req.params.orderToken; 
    jwt.verify(orderToken, process.env.JWT_SECRET_KEY,(err, dec)=>{
        if(err) return res.status(403).json({
            err:"Forbidden",
        })
        db.Orders.pushOrderItem(dec.orderId, new db.OrderItem({
            product : req.body.product,
            quantity: req.body.quantity,
        })).then(results =>{
            res.status(200).json({
                results,
                _info:{
                    message: "get your order",
                    ex:"order/<OrderId>",
                    method:"GET",
                }
            })
        })
    })
}

exports.getOrderById= function( req,res, next) {
    const orderToken = req.params.orderToken; 
    jwt.verify(orderToken, process.env.JWT_SECRET_KEY,(err, dec)=>{
        if(err) return res.status(403).json({
            err:"Forbidden",
        })
        db.Orders.findOne({
            _id:dec.orderId
        }).exec().then(results =>{
            res.status(200).json({
                results,
                _info:{
                    message: "get your order",
                    ex:"order/<OrderId>",
                    method:"GET",
                }
            })
        })
    })
}

exports.getOrdersByUser = function(req,res, next){
    const userId = req.userId; 
    db.Orders.find({
        owner: userId,
    }).exec().then(results=>{
        res.status(200).json({
            results
        })
    }).catch(err=>{
        res.status(500).json(
            err,
        )
    })
}


