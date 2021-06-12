const express=require("express");
const router=express.Router();

const Event = require("../../models/CRM/eventModel");

const EventCtrl=require("../../controllers/CRM/event");
// Create New Event
router.post("/create",EventCtrl.createEvent);

// Fetch All Events
router.get("/all", (req, res) => {
    Event.find()
        .then(meetings => res.json(meetings))
        .catch(err => res.json(err))

});

// // Edit Particular Contact with id
// router.get("/edit/:id",MeetingCtrl.editMeeting);




module.exports=router;
