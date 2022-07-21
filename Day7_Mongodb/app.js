const db = require("./model/data_base"); 
const express = require("express");

process.on("uncaughtException", err=>{
    console.log(err)
    db.client.close().then(
        console.log("DAta Base Closed")
    )
    process.exit();
})
process.on("exit",()=>{
    db.client.close(
        console.log("DAta Base Closed")
    )
    process.exit();
})


db.GetConnection.then(dbo =>{
    const routes = require("./Routes/SwRoutes").Routes;
    express().use(routes).listen(3000,()=>{
        console.log("SerVerStarTed")
    })    
}).catch(err=>{
    console.log(err);
    process.exit();
})