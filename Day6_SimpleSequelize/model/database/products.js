const sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("products",{
    id:{
        type:sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull:false,
    }, 
    name:{
        type:sequelize.STRING, 
        allowNull: false,
    },
    cost:{
        type: sequelize.INTEGER, 
        allowNull: false, 
    },     
})
