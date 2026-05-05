const express= require('express');
const app =express(); 

app.use("/",(req,res)=>{
    res.send("starting ")
})

app.use("/test",(req,res)=>{
    res.send("Response from test route server");
})

app.use("/hello",(req,res)=>{
    res.send("Response from hello route server")
})

app.listen(7777,()=>{
    console.log("Server is successfully running on PORT 7777..")
});
