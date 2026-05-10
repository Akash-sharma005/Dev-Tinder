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

//Now I'm going to fetch that users which are email id is equal to request
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        console.log(userEmail)
        const user = await User.findOne({ emailId: userEmail })
        if (!user) {
            res.status(401).send("User not found in the database");
        }
        else {
            res.send(user)
        }


        // if (users.length === 0) {
        //     res.status(401).send("user not found");
        // }
        // else{
        //     res.send(users);
        // }
    }
    catch (err) {
        res.status(401).send("Something went wrong");
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    }
    catch {
        res.status(401).send("Something went wrong");
    }
})

//feed API - GET/feed get all the users from the database
// app.get("/feed",(req,res)=>{

// })

connectDB().
    then(() => {
        console.log("Database connection establish..")
        app.listen(7777, () => {
            console.log("Server is successfully listen on PORT 7777")
        })
    }).catch((err) => {
        console.error("Database cannot be connected" + err)
    })

