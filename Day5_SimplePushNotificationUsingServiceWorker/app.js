const express = require('express'),
    bodyParser = require('body-Parser'),
    path = require('path'),
    subcrDB = require('./subscriDB'),
    notify = require('./notify');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/subscribe', (req, res, next)=>{
        console.log('SubAdded');
        console.log(req.body);
        subcrDB.getAllSubscriptions.push(req.body); 
        res.status(201).send('Added');
});

app.get('/notifyAll',(req, res,next)=>{
    notify.NotifyAll();
    res.send('Done')
})




let port = 2000; 
app.listen(port,()=>{
    console.log(`ServerStarts Listening at ${port}`)
})