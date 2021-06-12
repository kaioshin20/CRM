const express=require("express");
const router=express.Router();

const Meeting = require("../../models/CRM/meetingModel");

const MeetingCtrl=require("../../controllers/CRM/meeting");
// Create New Contact
router.post("/create",MeetingCtrl.createMeeting);

// Fetch All Contacts
router.get("/all", (req, res) => {
    Meeting.find()
        .then(meetings => res.json(meetings))
        .catch(err => res.json(err))

});

// // Edit Particular Contact with id
// router.get("/edit/:id",MeetingCtrl.editMeeting);




module.exports=router;
