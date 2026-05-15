const jwt = require('jsonwebtoken')
const User= require("../models/user")

const userAuth = async(req, res, next) => {
    try {
        //Read the token from the request cookies 
        const { token } = req.cookies;
       
        if(!token){
           throw new Error("Token is not valid!!!!!!!!")
        }

        //validate token
        const decodedMsg = await jwt.verify(token, "DEV@TINDER$970");

        //find the user
        const {_id}= decodedMsg;
        const  user = await User.findById({_id});

        if(!user){
            throw new Error("User doesn't exists");
        }
        req.user=user;
        next()

    }catch(err){
        res.status(400).send('ERROR : ' + err.message)
    } 
}



module.exports = { userAuth }


