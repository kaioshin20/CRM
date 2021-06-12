const express=require("express");
const router=express.Router();
 
const DealCtrl = require("../../controllers/CRM/deal")
const Contact = require("../../models/CRM/contactModel");
const Company = require("../../models/CRM/companyModel");
const Deal = require("../../models/CRM/dealModel")
const Activity = require("../../models/CRM/activityModel")
const Ticket = require("../../models/CRM/ticketModel")
const Meeting = require("../../models/CRM/meetingModel")
const Note = require("../../models/CRM/notesModel")

// Create New Deal
router.post("/create",DealCtrl.createDeal);

// Fetch All Deals
router.get("/all", (req, res) => {
    Deal.find()
        .then(deal => res.json(deal))
        .catch(err => res.json(err))

});

// Fetch Deals with particular Contact ID
router.get("/contactid/:id", (req, res) => {
    Deal.find({contactId: req.params.id})
        .then(deals => res.json(deals))
        .catch(err => res.json(err))

});

router.post("/update/stage/", (req, res) => {
    Deal.findOneAndUpdate({_id: req.body.id}, { $set: { "stage": req.body.stage} }, {returnNewDocument : true } )
        .then(deal => res.json(deal))
        .catch(err => res.json(err))

});

// Fetch particular Deal with ID
router.get("/id/:id",async (req, res) => {
    const data = {};
    console.log("reached router")
    data.deal = await Deal.find({_id: req.params.id})
        .then((deals) => {
            return deals[0]
        })
        .catch(err => res.json(err))
    data.company = await Company.find({ deals: { $elemMatch :{ $eq: data.deal._id.toString()} } })
        .then(company => {
            return company
        })
        .catch(err => {
            res.json(err)
        }) 
    data.contact = await Contact.find({ deals: { $elemMatch :{ $eq: data.deal._id.toString()} } })
        .then(contacts => {
            return contacts
        })
        .catch(err => {
            res.json(err)
        }) 
    data.activities = await Activity.find({ dealId: { $elemMatch :{ $eq: data.deal._id.toString()} } }).sort({timestamp : -1})
        .then(activity => {
            return activity
        })
        .catch(err => {
            res.json(err)
        })
    data.tickets = await Ticket.find({ dealId: data.deal._id})
        .then(ticket => {
            return ticket
        })
        .catch(err => {
            res.json(err)
        })
    data.meetings = await Meeting.find({ associateDeals: { $elemMatch :{ $eq: data.deal._id.toString() } }} )
        .then(meetings => {
            return meetings
        })
        .catch(err => {
            res.json(err)
        })
    data.notes = await Note.find({ associateDeals: { $elemMatch :{ $eq: data.deal._id.toString() } }} )
        .then(notes => {
            return notes
        })
        .catch(err => {
            res.json(err)
        })
    
    res.json(data)

});

// Edit Particular Deal with id
router.get("/edit/:id", DealCtrl.editDeal);



module.exports=router;
