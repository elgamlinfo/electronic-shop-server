const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

function auth(req, res, next) {
    try {
        let accessToken =  req.header('Authorization').split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err){
                return res.status(401).json({message: "Unauthorized!"});
            }
            User.findOne({_id: decoded._id, "tokens.token":accessToken}, (err, user) => {
                if(!user){
                    res.status(401).json({message: "Unauthorized!"});
                }
                req.user = user
                req.token = accessToken
                next();
            })
        })
    } catch (error) {
        res.status(500).json(err);
    }
}


module.exports = auth