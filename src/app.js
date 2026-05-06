const express = require('express');
const app = express();
const {adminAuth, userAuth}=require("./middleware/auth")

app.use("/admin",adminAuth)

app.use("/user",userAuth,(req,res)=>{
    res.send("User Data send")
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent")
}) 

app.get("admin/deletedUser",(req,res)=>{
   res.send("Deleted a USer")
})

app.listen(7777, () => {
    console.log("Server is successfully running on PORT 7777..")
});

//Handling the route user 2
//handling the route user