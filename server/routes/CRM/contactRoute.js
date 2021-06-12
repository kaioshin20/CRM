const express=require("express");
const router=express.Router();

const Contact = require("../../models/CRM/contactModel");
const Company = require("../../models/CRM/companyModel");
const Deal = require("../../models/CRM/dealModel")
const Activity = require("../../models/CRM/activityModel")
const Ticket = require("../../models/CRM/ticketModel")
const Meeting = require("../../models/CRM/meetingModel")
const Note = require("../../models/CRM/notesModel")

const ContactCtrl=require("../../controllers/CRM/contact");
// Create New Contact
router.post("/create",ContactCtrl.createContact);

// Fetch All Contacts
router.get("/all", (req, res) => {
    Contact.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.json(err))

});

// Fetch particular Contact with ID
router.get("/id/:id",async (req, res) => {
    const data = {};
    console.log("reached router1")
    data.contact = await Contact.find({_id: req.params.id})
        .then((contact) => {
            return contact[0]
        })
        .catch(err => res.json(err))
    data.company = await Company.find({ _id: data.contact.companyId})
        .then(company => {
            
            return company[0]
        })
        .catch(err => {
            res.json(err)
        }) 
    data.deals = await Deal.find({ contacts: { $elemMatch :{ $eq: data.contact._id.toString() } }})
        .then(deals => {
            return deals
        })
        .catch(err => {
            res.json(err)
        }) 
    data.activities = await Activity.find({ contactId: { $elemMatch :{ $eq: data.contact._id.toString() } }}).sort({timestamp : -1})
        .then(activity => {
            return activity
        })
        .catch(err => {
            res.json(err)
        })
    data.tickets = await Ticket.find({ contacts: { $elemMatch :{ $eq: data.contact._id.toString() } }})
        .then(ticket => {
            return ticket
        })
        .catch(err => {
            res.json(err)
        })
    data.meetings = await Meeting.find({ associateContacts: { $elemMatch :{ $eq: data.contact._id.toString() } }} )
        .then(meetings => {
            return meetings
        })
        .catch(err => {
            res.json(err)
        })
    data.notes = await Note.find({ associateContacts: { $elemMatch :{ $eq: data.contact._id.toString() } }} )
        .then(notes => {
            return notes
        })
        .catch(err => {
            res.json(err)
        })
    res.json(data)

});

// Delete contact with id
router.delete('/delete/id/:ids', (req,res) => {
    req.params.ids.split(':;').forEach(id =>{
        Contact.findOneAndDelete({ _id: id })
                .then((data) => console.log(data))
                .catch((err) => { return res.json(err)})        
    })
    
    Contact.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.json(err))

})

// Edit Particular Contact with id
router.post("/edit/:id",ContactCtrl.editContact);




module.exports=router;
