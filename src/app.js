const express = require('express');
const app = express();

app.use("/user",(req,res)=>{
  res.send("hakhkjfhkjhkjh");
})

app.get("/user", (req, res) => {
    res.send({
        firstName: "Akash",
        lastName: "Sharma"
    })
})

app.post("/user",(req,res)=>{
    res.send("Data fetch successfully");
})

app.delete("/user",(req,res)=>{
    res.send("Deleted successfully");
})

app.use("/test", (req, res) => {
    res.send("hello");
})

app.listen(7777, () => {
    console.log("Server is successfully running on PORT 7777..")
});
