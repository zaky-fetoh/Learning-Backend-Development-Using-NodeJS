const express = require('express'),
    middles  =require('./middlewares/middlewares');
    utils = require('./utils/utils');


utils.loggerFile();


const app = express();

for(let k in middles) app.use(middles[k]);

app.use('/', (req, res, next) => {
    res.status(404).send('File Not Found');
});

app.listen(3000, () => {
    console.log('Server Started')
});

