const express=require("express");
const router=express.Router();

const Ticket = require("../../models/CRM/ticketModel");

const TicketCtrl=require("../../controllers/CRM/ticket");
// Create New Contact
router.post("/create",TicketCtrl.createTicket);

// Fetch All Contacts
router.get("/all", (req, res) => {
    Ticket.find()
        .then(tickets => res.json(tickets))
        .catch(err => res.json(err))

});

router.post("/update/status/", (req, res) => {
    Ticket.findOneAndUpdate({_id: req.body.id}, { $set: { "status": req.body.status} }, {returnNewDocument : true } )
        .then(ticket => res.json(ticket))
        .catch(err => res.json(err))

});

// Edit Particular Contact with id
router.get("/edit/:id", TicketCtrl.editTicket);




module.exports=router;
