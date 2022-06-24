const express = require('express');
const utils = require('../utils/utils');
const fs = require('fs');

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('isHere')
    let id = req.query.imgId;
    if (utils.isExist(id))
        res.sendFile(utils.getImgePath(id));
    else next();
});

router.post('/',(req, res, next) =>{
    imgId = req.query.imgId; 
    if(utils.isExist(imgId))
        res.status(403).send('This File Already exists'); 
    else{
        let fileName = utils.getImgePath(imgId); 
        let wrfile = fs.createWriteStream(fileName);
        req.pipe(wrfile);
        req.on('end',()=>{
            wrfile.close(); 
            res.status(200).send('Uploaded'); 
        });
    }
});

router.put('/',(req, res, next) =>{
    imgId = req.query.imgId; 
    let fileName = utils.getImgePath(imgId); 
    let wrfile = fs.createWriteStream(fileName);
    req.pipe(wrfile);
    req.on('end',()=>{
        wrfile.close(); 
        res.status(200).send('updated'); 
    });
});

router.delete('/',(req,res,next)=>{
    imgId = req.query.imgId; 
    if(utils.isExist(imgId))
        utils.deleteFile(imgId,(err)=>{
            if(err)  return res.status(500).send('Error Occered Try Again'); 
            else return res.status(200).send('File Deleted'); 
        });
    else res.status(404).send('File Not Found');  
}); 


module.exports = router; 