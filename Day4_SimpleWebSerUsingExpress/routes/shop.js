const express = require('express');
const path = require('path');



const shopRoute = express.Router() 

shopRoute.get('/',(req, res, next)=>{
    res.sendFile(
        path.join(path.join(__dirname,'..', 'views', 'shop.html'))
    )
})


module.exports = shopRoute


