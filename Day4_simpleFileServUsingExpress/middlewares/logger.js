const express = require('express');
const path = require('path');
const fs = require('fs');

const logger = express.Router().use((req, res, next)=>{
        let log = `${req.method} Req from IP:<<${req.ip}>> at <<${new Date().toString()}>> requisting <<${req.url}>>#\n`
        let p = path.join(__dirname,'..', 'logger.txt');
        console.log(log); 
        fs.appendFile(p, log, { encoding: "utf-8" }, err => {
            if (err) console.log(err);
        })
        next();
    })


module.exports = logger