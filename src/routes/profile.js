const express = require('express');
const {userAuth}  = require('../middleware/auth');
const profileRouter = express.Router();
const bcrypt = require('bcrypt');


profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(401).send("ERROR : " + err.message)
    }
})

module.exports= profileRouter