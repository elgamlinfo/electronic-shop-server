const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

function auth(req, res, next) {
    try {
        let accessToken =  req.cookies["access_token"].split(' ')[1];
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err){
                return res.send(err);
            }
            User.findOne({_id: decoded._id, "tokens.token":accessToken}, (err, user) => {
                if(!user){
                    res.status('401').send('Unauthorized!')
                }
                req.user = user
                req.token = accessToken
                next();
            })
        })
    } catch (error) {
        res.status('401').send('Unauthorized!')
    }
}


module.exports = auth