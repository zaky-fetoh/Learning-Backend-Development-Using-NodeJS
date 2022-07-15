const DB = require("mysql2");
const utils = require("../utils/utils")

const pool = DB.createPool(
    utils.database_credential()
).promise();

pool.execute(`CREATE TABLE employee (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(45) NOT NULL,
    age int NOT NULL
  ) `).then(results => {
    console.log("Hello Table Created")
    console.log(results);
}).catch(console.log);


exports.pool = pool;




