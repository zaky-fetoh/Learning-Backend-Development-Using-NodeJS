const  http = require('http'); 
const fs = require('fs');

let counter = 0;

function sendMainPage(res){
    fs.readFile('SimpleHttpServersWithCallbacks\\form.txt',(err, data) =>{
        if(err) console.log('Error Opening the File',err);
        else{
            res.write(data);
            res.end()
        }
    })
}

function RejesterResHandlingEvents(req, res){
    const data = [];
    req.on('data',(chank)=>{
        console.log(chank);
        data.push(chank);
    });
    req.on('end', ()=>{
        out = Buffer.concat(data).toString()
        console.log(out);
        fs.writeFile('res'+counter+++'.txt', out ,(err)=>{
            if(err) console.log(err); 
        });
        res.write('DOne');
        res.end();
    });
}

const server = http.createServer((req,res)=>{
    console.log('server is Listening')
    const {method, url} = req
    console.log(url, method)
    if(url === '/') return sendMainPage(res);
    if(url=== '/ANS' && method === 'POST')
    RejesterResHandlingEvents(req, res);
    if(counter > 3 ) process.exit();
}); 

server.listen(4000)
