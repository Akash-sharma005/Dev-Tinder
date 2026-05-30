const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/health",async(req,res)=>{
    try{
      res.send("Sab Ok hai....")
    }catch(err){
        res.status(401).send(err.message);
    }
})

module.exports= {healthRouter}