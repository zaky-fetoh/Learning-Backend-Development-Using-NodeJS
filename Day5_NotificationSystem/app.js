const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    SDB = require('./model/subscribersDB'),
    SubscrR = require('./controller/subscrRoute'),
    morgan =  require('morgan');



const DB = new SDB.SDB();



const app = express();

app.use(morgan("short"))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(SubscrR.getSubscrRoute(DB));
app.use(SubscrR.getIsthereNotifi);
app.use(SubscrR.addArticle(DB))




console.log(DB.SubArr)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Stareted Successfully at ${PORT}.`)
});