

exports.addItem = function (DB_handler) {
    return function (req, res, next) {
        let cus = req.body;
        DB_handler.add(cus).then(results => {
            res.status(200).send("Added");
        }).catch(err => {
            // console.log("An Error From adding Customer midellWare");
            console.log(err);
        });
    }
}


exports.findAll = function (DB_handler) {
    return function (req, res, next) {
        DB_handler.findAll().then(results => {
            res.send(
                JSON.stringify(results)
            )
        }).catch(err => {
            // console.log("An Error From Fin/dAll Customer midellWare");
            console.log(err);
        });
    }
}

exports.findId = function (DB_handler) {
    return function (req, res, next) {
        let id = req.body.id;
        DB_handler.findId(id).then(result => {
            res.send(
                JSON.stringify(result)
            )
        }).catch(err => {
            // console.log("An Error From findid Customer midellWare");
            console.log(err);
        });
    }
}

exports.find = function (DB_handler) {
    return function (req, res, next) {
        let wh = req.body;
        DB_handler.find(wh).then(results => {
            res.send(
                JSON.stringify(results)
            )
        }
        ).catch(err => {
            // console.log("An Error From find Customer midellWare");
            console.log(err);
        });
    }
}
exports.destory = function (DB_handler) {
    return function (req, res, next) {
        let id = req.body.id;
        DB_handler.delete(id).then(result => {
            res.status(200).send("Deleted");
        });
    }
}

