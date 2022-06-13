const fs = require('fs');
const path=require('path');

function preadFile(path){
    return new Promise((resolve, reject)=>{
        if(! path) return reject(new Error('Empty Path'));
        if(!fs.existsSync(path)) return reject(new Error('This File Not Exist'));
        fs.readFile(path,{encoding: 'utf-8'},(err, data)=>{
            if(err) return reject( err ); 
            resolve( data);
        });
    })
}
function handelRawFile(data){
    //console.log(data);
    data = data.split('').map(c=>{
        if(c === '(') return '[';
        if(c === ')') return ']';
        return c
    }).join('');    
    return eval(data)
}
function getlinksArrayProm(){
    return preadFile(path.join('.', 'imgs.txt'))
    .then(data => data.replace('abs','pdf'))
    .then(handelRawFile).catch(e => {throw e})
}



module.exports = {
    'getlinksArrayProm':getlinksArrayProm}


