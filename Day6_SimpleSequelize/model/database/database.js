const sequelize = require("sequelize");


module.exports = new sequelize.Sequelize("project0",
 "root", "root", {
    host: "localhost", dialect: "mysql"
});

