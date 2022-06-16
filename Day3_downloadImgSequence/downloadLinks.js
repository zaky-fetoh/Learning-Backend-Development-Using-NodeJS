//MAhmoud ZAky
const pf = require('./parseFile.js'); 
const http = require('https');
const fs = require('fs');
const path = require('path')

function downloadFile(name, url){
    let writer = fs.createWriteStream(path.join('.','imgs',name+'.jpg'));
    return new Promise((resolve, reject)=>{
        http.get(url, res=>{
        if(res.statusCode !== 200) return reject(
            `Some Error Code ${res.statusCode},[${name},${url}]`);
        //res.pipe(writer)
        res.on('data', chunk =>{ 
             writer.write(chunk);
        });
        res.on('end',()=>{
            writer.end()
            resolve(name +' DownLoaded');
        });
        res.on('error',e=> reject(`[${name},${url}]`)); 
    }).end();});
}

pf.getlinksArrayProm().then(arr=>{
    return Promise.allSettled( arr.map(([name, url]) => downloadFile(name,url)))
}).then(JSON.stringify).then(logs=>{
    fs.writeFile('logs.txt',logs,(err)=>{
        if(err) console.log(e);
        else console.log('Done'); 
    })
})