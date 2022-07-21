const express = require("express");
const blogic = require("../controller/Blogic"); 
const collec = require("../model/collections"); 


function BasicRoute(name, handler){
    return express.Router()
    .post("/get-all-" + name + "-doc", blogic.getDocsByQuery(handler))
    .post("/add-" + name + "-doc", blogic.PostDoc(handler))
    .delete("/delete-" +name + "-doc", blogic.deleteDoc(handler));
}

exports.BRoutes = express.Router(); 

collec.CollectionNames.forEach(e=>{
    exports.BRoutes.use(BasicRoute(e,collec[e]));
})
