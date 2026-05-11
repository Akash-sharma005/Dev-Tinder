const express = require('express');
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")

app.use(express.json())

//to create the user
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

// to fetch the particular user from the database by email id
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        // console.log(userEmail)
        const user = await User.findOne({ emailId: userEmail })
        if (!user) {
            res.status(401).send("User not found in the database");
        }
        else {
            res.send(user)
        }
    }
    catch (err) {
        res.status(401).send("Something went wrong");
    }
})

// to fetch all the users present in the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    }
    catch {
        res.status(401).send("Something went wrong");
    }
})

//to delete the user by Id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({ _id: userId })
        // const user = await User.findByIdAndDelete(userId )
        res.send("User Deleted Successfully");
    }
    catch (err) {
        res.status(401).send("Something went wrong")
    }
})

//to update the data of the user
app.patch("/user", async (req, res) => {
    const data = req.body;
    const userEmail = req.body.emailId;
    const userId=req.body.userId;
    try {
        const user = await User.findByIdAndUpdate(userId, data,{returnDocument:"after",runValidators:true});
        console.log(user)
        res.send("user updated successfully");
    }
    catch (err) {
        res.status(401).send("UPDATE FAILED : " + err.message);
    }
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