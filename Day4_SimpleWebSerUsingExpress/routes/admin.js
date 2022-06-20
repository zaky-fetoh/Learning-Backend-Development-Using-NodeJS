const express = require('express');
const path = require('path');


const adminRoute = express.Router();


adminRoute.get('/add-product',(req, res, next)=>{
    res.sendFile(
        path.join(__dirname,'..', 'views', 'add-product.html')
    )
});

adminRoute.post('/add-product',(req, res, next)=>{
        let arr =[]; 
        req.on('data',(chank)=>{
            arr.push(chank);
        });
        req.on('end',()=>{
            let data = Buffer.concat(arr).toString();
            console.log(data) ;
            res.redirect('/');
        });
    }
)


module.exports = adminRoute ; 