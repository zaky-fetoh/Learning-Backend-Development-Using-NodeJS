
const db = require("../model/init")
const bcrypt = require("bcrypt")


exports.addUser = function (req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hpass) => {
        if (err) return res.status(500).json({
            message: "ErrorOccuredPleaseTryAgain",
            ok: false, err,
        })
        db.Users.create({
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            password: hpass,
        }).then(results => {
            res.status(200).json({
                message: "user Created",
                ok: true,
                user: {
                    id: results._id,
                    email: results.email,
                    name: results.name,
                    age: results.age,
                },
            })
        }).catch(err => {
            res.status(500).json({
                message: "ErrorOccuredPleaseTryAgain",
                ok: false,
                err,
            })
        })
    })
}

exports.getMyInfo = function (req, res, next) {
    const id = req.userId;
    db.Users.findOne({ _id: id }, {
        password: 0, __v: 0,
    }).then(user => {
        res.status(200).json({
            ok: true, user,
        })
    }).catch(err => {
        res.status(500).json({
            ok: false,
            err,
        })
    })
}

exports.updateInfo = async function (req, res, next) {
    const id = req.userId; if (req.body.password)
        req.body.password = await bcrypt.hash(
            req.body.password, 10,
        );
    db.Users.updateOne({ _id: id }, {
        $set: req.body
    }).then(results => {
        res.status(200).json({
            ok: true, results,
        });
    }).catch(err => {
        res.status(500).json({
            ok: false,
            err,
        })
    })
}

exports.deleteUser = function (req, res, next){
    //TODO    
}





