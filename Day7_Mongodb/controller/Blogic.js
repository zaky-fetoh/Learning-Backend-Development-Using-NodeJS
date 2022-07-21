
exports.getDocsByQuery = function (collec) {
    return function (req, res, next) {
        let query = req.body;
        collec.findAll(query).then(results => {
            res.status(200).json(
                JSON.stringify(results)
            );
        })
    };
}

exports.PostDoc = function (collec) {
    return function (req, res, next){
        let doc = req.body; 
        collec.insertNew(doc).then(()=>{
            res.status(200).json(
                JSON.stringify(doc)
            )
        })
    }
}

exports.deleteDoc = function(collec){
    return function(req,res, next){
        let query = req.body; 
        collec.findAll(query).then(arr=>{
            arr.forEach(element => {
                element.delete()
            });
            res.status(200).send(); 
        })
    }
}
