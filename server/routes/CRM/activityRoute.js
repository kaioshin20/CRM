const express=require("express");
const router=express.Router();

const Activity = require("../../models/CRM/activityModel");
const AuthCtrl =require("../../controllers/Auth/auth")
const AuthHelper = require("../../Helpers/AuthHelper")
const ActivityCtrl=require("../../controllers/CRM/activity");

// Create New Contact
router.post("/create",ActivityCtrl.createActivity);

// Fetch All Contacts
router.get("/all", (req, res) => {
    Activity.find()
        .then(activity => res.json(activity))
        .catch(err => res.json(err))

});

// Fetch all activities related to particular Contact with Contact ID
router.get("/contactid/:id", (req, res) => {
    Activity.find({contactId: req.params.id})
        .then(activities => res.json(activities))
        .catch(err => res.json(err))

});


module.exports=router;
