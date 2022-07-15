const express = require("express");
const DB = require("./model/database/database"); 
const Routes  =require("./Routes/SwRoute");


DB.sync().then(results =>{
    express()
    .use(Routes)
    .listen(3000,()=>{
        console.log("SerVerStarTed at " + new Date()); 
    })
});