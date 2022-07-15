const dbops = require('./db-ops');


exports.addEmployee = function (req, res, next) {
    let emp = req.body;
    dbops.save(emp).then(() => {
        res.status(200).send("Added");
    }).catch(
        console.log
    );
}

exports.updateEmployee = function (req, res, next) {
    let id = req.body.id, emp = req.body.emp;
    dbops.update(id, emp).then(() => {
        res.status(200).send("Updated");
    }).catch(
        console.log
    );
}

exports.getAllEmployee = function (req, res, next) {
    dbops.findAll().then(([rows, details])=>{
        res.send(
            JSON.stringify(rows)
        );
    }).catch(
        console.log
    )
}

exports.find = function(req, res, next){
        let id = req.body.id; 
        dbops.find(id).then(results =>{
            // console.log("sadasd ", results)
            res.send(JSON.stringify(results[0][0]))
        }).catch(
            console.log
        )
}



