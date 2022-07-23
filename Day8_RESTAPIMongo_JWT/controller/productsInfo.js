const db = require("../model/init");


exports.addProduct = async function (req, res, next) {
    const prod = await db.ProductsInfo.create({
        name: req.body.name,
        cost: parseInt(req.body.cost),
        productionDate: new Date(req.body.productionDate),
        expireAfterMonths: parseInt(req.body.expireAfterMonths),
    });
    res.status(200).json({
        ok: true,
        massage: "product added",
        prodId: prod._id,
        _Info: {
            link: "/product/get/" + prod._id,
        }
    })
}
exports.getAll = function (req, res, next) {
    db.ProductsInfo.find().select({
        _id: 1, name: 1, cost: 1, expirationDate: 1
    }).exec().then(prods => {
        res.status(200).json(
            {
                prods,
                _Info: {
                    link: "/product/add/",
                },
            })
    })
}
exports.getSingleProduct = function (req, res, next) {
    const id = req.params.prodId;
    db.ProductsInfo.findOne({ _id: id }, {
        _id: 1, name: 1, cost: 1, expirationDate: 1
    }).exec().then(prod => {
        res.status(200).json(
            {
                prod,
                _Info: {
                    massage: "get All Prods",
                    link: "/product/get-all",
                },
            })
    })
}

exports.deleteProduct = function (req, res, nex) {
    const id = req.params.prodId;
    db.ProductsInfo.deleteOne({
                _id: id
    }).exec().then(deleteInfo=>{
        res.status(200).json(
            {
                deleteInfo,
                ok:true,
                _Info: {
                    massage: "get All Prods",
                    link: "/product/get-all",
                },
            })
    }).catch(err=>{
        res.status(500).json(
            {
                message:"invalid ID",
                _Info: {
                    massage: "get All Prods",
                    link: "/product/get-all",
                },
            })
    })
}

