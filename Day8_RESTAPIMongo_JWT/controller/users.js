
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
                user:{
                    id: results._id,
                    email:results.email,
                    age:results.age,
                    name:results.name,
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






