const sequelize = require("sequelize");
const db = require("./database");


const customers = db.define("customers", {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    phoneNum: {
        type: sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize.STRING,
        allowNull: true,
    },
});

module.exports = customers; 