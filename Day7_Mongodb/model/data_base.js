const mongo = require("mongodb")


let DB = undefined; 
const url = "mongodb://localhost:27017/"
const client  = new mongo.MongoClient(url); 

exports.GetConnection = client.connect().then(db=>{
    console.log("DATABASE Connected SuccessFully")
    DB = db.db("Project0BD");
    return DB
})
exports.gatDBO = function(){
    if(DB) return DB;
    else throw "DataBase Not Connected Yet"; 
};
exports.client = client;


