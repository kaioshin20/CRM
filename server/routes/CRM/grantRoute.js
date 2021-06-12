const express=require("express");
const router=express.Router();
const Grant = require("../../models/grantModel")

router.get("/all",(req,res) =>{
    Grant.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})


module.exports=router;
