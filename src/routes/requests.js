const express= require('express')
const requestRouter= express.Router();
const { userAuth } = require('../middleware/auth');

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;

        //sending a connection request
        console.log("Sending a connection request");

        res.send(user.firstName + " sent the connection request");
    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
})


module.exports = requestRouter;