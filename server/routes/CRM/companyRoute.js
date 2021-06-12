const express=require("express");
const router=express.Router();
const CompanyCtrl = require("../../controllers/CRM/company")
 
const Contact = require("../../models/CRM/contactModel");
const Company = require("../../models/CRM/companyModel");
const Deal = require("../../models/CRM/dealModel")
const Activity = require("../../models/CRM/activityModel")
const Ticket = require("../../models/CRM/ticketModel")
const Meeting = require("../../models/CRM/meetingModel")
const Note = require("../../models/CRM/notesModel")

// Create New Company
router.post("/create",CompanyCtrl.createCompany )

// Fetch All Companies
router.get("/all", (req, res) => {
    Company.find()
        .then(company => res.json(company))
        .catch(err => res.json(err))

});


// Fetch particular Company with ID
router.get("/id/:id",async (req, res) => {
    const data = {};
    console.log("reached router")
    data.company = await Company.find({ _id: req.params.id})
    .then(company => {
        return company[0]
    })
    .catch(err => {
        res.json(err)
    }) 
    data.contacts = await Contact.find({companyId: req.params.id})
        .then((contact) => {
            return contact
        })
        .catch(err => res.json(err))
    data.deals = await Deal.find({ companies: { $elemMatch :{ $eq: data.company._id.toString() } }})
        .then(deals => {
            return deals
        })
        .catch(err => {
            res.json(err)
        }) 
    data.activities = await Activity.find({ companyId: { $elemMatch :{ $eq: data.company._id.toString() } }}).sort({timestamp : -1})
        .then(activity => {
            return activity
        })
        .catch(err => {
            res.json(err)
        })
    data.tickets = await Ticket.find({ companies: { $elemMatch :{ $eq: data.company._id.toString() } }})
        .then(ticket => {
            return ticket
        })
        .catch(err => {
            res.json(err)
        })
    data.meetings = await Meeting.find({ associateCompanies: { $elemMatch :{ $eq: data.company._id.toString() } }} )
        .then(meetings => {
            return meetings
        })
        .catch(err => {
            res.json(err)
        })
    data.notes = await Note.find({ associateCompanies: { $elemMatch :{ $eq: data.company._id.toString() } }} )
        .then(notes => {
            return notes
        })
        .catch(err => {
            res.json(err)
        })

    res.json(data)

});

// Delete companies with id
router.delete('/delete/id/:ids', (req,res) => {
    req.params.ids.split(':;').forEach(id =>{
        Company.findOneAndDelete({ _id: id })
                .then((data) => console.log(data))
                .catch((err) => { return res.json(err)})        
    })
    
    Company.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.json(err))

})

// Edit Particular Company with id
router.post("/edit/:id", CompanyCtrl.editCompany);



module.exports=router;
