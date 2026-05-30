const express = require("express");
// const connectDB = require("./config/database");
const app = express();
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

const connectDB = require("./config/database")
const bcrypt = require("bcrypt")
const validator = require('validator')
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");



// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const  healthRouter  = require("./routes/health");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/",healthRouter)

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
            console.log("Server is successfully listening on port 7777...");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!! " + err);
    });