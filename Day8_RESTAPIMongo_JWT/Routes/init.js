const orderRoute = require("./ordersRoute").route;
const prepRoute = require("./prepRoutes").route;
const prodRoute = require("./productsInfo").route;
const userRoute = require("./users").route;
const auth = require("../controller/auth")
const express = require("express")

exports.route = express.Router()
    .use(prepRoute)
    .post("/login",auth.login)
    .use("/product",prodRoute)
    .use("/order", orderRoute)
    .use("/users", userRoute)
    
    .use("/", (req, res, next)=>{
        res.status(404).json({
            message:"invalide Route"
        })
    })
    .use((err, req, res, next) => {
        if (res.headersSent) {
          return next(err)
        }
        res.status(500)
        res.render('error', { error: err })
      })