const jwt = require("jsonwebtoken");
const Users = require("../model/init").Users




exports.login =  async function(req, res, next){
 
    let userInfo = await Users.findOne({email:req.body.email});
    console.log(userInfo);
    if(!userInfo) return res.status(401).json({
        error:"forbidden"
    })

    if( req.body.password === userInfo.password){

        jwt.sign({id : userInfo._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"1d"},(err,tkn)=>{
                if(err) return res.status(500).json({
                    error:"server error try again"
                });
                else return res.status(200).json({
                    token:tkn
                })
            })
        
    }else{
        res.status(401).json({
            error:"forbidden"
        })
    }
}

exports.verify = function(req,res,next){
    
    const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1]
    if( !token ) return res.status(401).json({
        error:"forbidden"
    }); 
    else jwt.verify(token, process.env.JWT_SECRET_KEY,(err,dec)=>{
        if(err) return res.status(401).json({
            error:"forbidden"
        });
        console.log(`TokenVerifiedForUser${dec.id}`)
        req.userId = dec.id;
        next();
    })
}

exports.isAdmin = function(req,res,next){
    next()
    // if(req.userId === 999)return next();
    // else return res.status(401).json({
    //     error:"forbidden"
    // });
}

