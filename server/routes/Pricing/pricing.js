const express=require("express");
const router=express.Router();

const ICDRate = require("../../models/Pricing/ICDRateModel")
const FCLRate = require("../../models/Pricing/FCLRateModel")


router.post("/rates/",(req,res) => {
    console.log(req.body.type)
    if(req.body.type === "ICD_Rates"){
        ICDRate.find()
            .then(rates => res.json(rates))
            .catch(err => res.json(err))
    }
    else if(req.body.type === "FCL_Rates"){
        FCLRate.find()
            .then(rates => res.json(rates))
            .catch(err => res.json(err))
    }
});

router.post("/rates/add",(req, res) => {
    console.log(req.body.type)
    if(req.body.type === "ICD_Rates"){
        ICDRate.insertMany(req.body.data)
            .then(rates => res.json(rates))
            .catch(err => res.json(err))
    }
    else if((req.body.type === "FCL_Rates")){
        FCLRate.insertMany(req.body.data)
            .then(rates => res.json(rates))
            .catch(err => res.json(err))
    }
        
});

router.post("/rates/edit", (req,res) => {
    console.log(req.body.type)
    if(req.body.type === "ICD_Rates"){
        ICDRate.updateMany({_id : { $in : req.body.ids }}, { $set : req.body.change })
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }
    else if(req.body.type === "FCL_Rates"){
        FCLRate.updateMany({_id : { $in : req.body.ids }}, { $set : req.body.change })
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }
})

router.post("/rates/delete", (req,res) => {
    console.log(req.body.type)
    if(req.body.type === "ICD_Rates"){
        ICDRate.deleteMany({_id : { $in : req.body.ids }})
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }
    else if(req.body.type === "FCL_Rates"){
        FCLRate.deleteMany({_id : { $in : req.body.ids }})
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }
})
module.exports=router;
