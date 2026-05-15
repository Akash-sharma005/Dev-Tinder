const express = require('express');
const { validateSignupData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user')

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignupData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, emailId, password: hashPassword });
        await user.save();

        res.send("User added successfully!!");

    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!validator.isEmail(emailId)) {
            throw new Error("EmailId not valid");
        }
        const user = await User.findOne({ emailId });

        if (!user) {
            throw new Error("Invalid Credientals");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie('token', token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
            res.send("Login Successfull..")
        }
        else {
            throw new Error("Invalid credentials")
        }
    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
})

module.exports = authRouter