const pool = require('./model/database').pool; 
const routes = require('./routes/crudRoutes');

const express = require("express");
const bodyParser = require("body-parser");
const morgan  = require("morgan");

app = express();

app.use(morgan());
app.use(bodyParser.json());
app.use(routes.routes);


app.listen(3000,()=>{
    console.log("SerVerStarTed.")
    pool.execute(`SELECT * FROM employee`).then(results=>{
        console.log(results[0][0]);
    })
})


