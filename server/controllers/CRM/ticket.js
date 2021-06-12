const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const Ticket=require("../../models/CRM/ticketModel")
const Deal=require("../../models/CRM/dealModel")
const Contact=require("../../models/CRM/contactModel")
const Company=require("../../models/CRM/companyModel")
const Activity = require("../../models/CRM/activityModel");
const Helpers=require("../../Helpers/helpers")
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret")

module.exports = {
    async createTicket(req, res) {
        const schema=Joi.object().keys({
            name: Joi.string().required(),
            status: Joi.string().required(),
            description: Joi.string().required(),
            source: Joi.string().required(),
            ownerId: Joi.string().required(),
            priority: Joi.string().required(),
            contacts: Joi.array(),
            companies: Joi.array(),
            deals: Joi.array(),
        })

        const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        }

        const body={
            name: value.name,
            status: value.status,
            description: value.description,
            source: value.source,
            ownerId: value.ownerId,
            priority: value.priority,
            contacts: value.contacts,
            companies: value.companies,
            deals: value.deals,
        }

        const newTicket = new Ticket(body);
        newTicket.save()
            .then(ticket => {
                ticket.contacts.forEach(id => {
                    console.log(id,ticket._id)
                    Contact.findOneAndUpdate({_id: id}, { $push: { tickets: ticket._id.toString()}},{returnNewDocument: true} )
                        .then(res =>{ return ;})
                        .catch(err => console.log(err))
                });
                ticket.companies.forEach(id => {
                    console.log(id,ticket._id)
                    Company.findOneAndUpdate({_id: id}, { $push: { tickets: ticket._id.toString()}},{returnNewDocument: true} )
                        .then(res =>{ return ;})
                        .catch(err => console.log(err))
                });
                ticket.deals.forEach(id => {
                    console.log(id,ticket._id)
                    Deal.findOneAndUpdate({_id: id}, { $push: { tickets: ticket._id.toString()}},{returnNewDocument: true} )
                        .then(res =>{ return ;})
                        .catch(err => console.log(err))
                });
                const newActivity = new Activity({
                    type : "Ticket",
                    details : "Link:owner:;Text::created a ticket"+ ticket.name + ":;",
                    subdetails: "created",
                    contactId : [ticket.contactId],
                    companyId : [ticket.company_id],
                    dealId : [ticket.dealId],
                    ticketId : [ticket.ticketId], 
                    ownerId : ticket.ownerId,
                    nameId : ticket._id
                })
                newActivity.save()
                    .then(activity => res.json({ticket, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))

    },
    async editTicket(req, res) {
        Ticket.findOneAndUpdate({ _id: req.params.id},{ $set: req.body},{returnNewDocument: true})
            .then(ticket => {
                const newActivity = new Activity({
                    type : "Ticket",
                    details : "Link:owner:;Text::edited a ticket"+ ticket.name + ":;",
                    subdetails: "edited",
                    contactId : [ticket.contactId],
                    companyId : [ticket.company_id],
                    dealId : [ticket.dealId],
                    ticketId : [ticket.ticketId], 
                    ownerId : ticket.ownerId,
                    nameId : ticket._id
                })
                newActivity.save()
                    .then(activity => res.json({ticket, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))
    }
    
}
