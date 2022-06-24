const logger1 = require('./logger'),
    fileOps = require('./fileOPs'); 


module.exports = {logger : logger1, 
                routes: fileOps}