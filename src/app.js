const express = require('express');
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")

app.use(express.json())

app.post("/signup", async (req, res) => {
    //Create a new instance of the user model
    const user = new User(req.body)

    try {
        await user.save();
        res.send("User Added successfully!")
    }
    catch (err) {
        res.status(400).send("Error in saving the user.." + err.message)
    }
    // console.log(req.body)
    
})

connectDB().
    then(() => {
        console.log("Database connection establish..")
        app.listen(7777, () => {
            console.log("Server is successfully listen on PORT 7777")
        })
    }).catch((err) => {
        console.error("Database cannot be connected" + err)
    })

