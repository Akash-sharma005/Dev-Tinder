const express = require('express');
const { userAuth } = require('../middleware/auth');
const profileRouter = express.Router();
const bcrypt = require('bcrypt');
const { validateEditProfileData } = require('../utils/validation');
const User = require("../models/user")
const validator = require("validator")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(401).send("ERROR : " + err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit request");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key])
        await loggedInUser.save()

        res.send({
            message: loggedInUser.firstName + " your profile updated successfully..",
            data: loggedInUser
        })

    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
})

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.user._id;

        if (!validator.isStrongPassword(password)) {
            throw new Error("Please enter a strong password..");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const update = await User.findByIdAndUpdate(userId, { password: hashPassword })
        res.send("Password update successfully..") 

    } catch (err) {
        res.status(401).send("ERROR : "+ err.message);
    }
})

module.exports = profileRouter