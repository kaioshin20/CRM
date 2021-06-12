const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const Event =require("../../models/CRM/eventModel")
const Activity = require("../../models/CRM/activityModel");
const Helpers=require("../../Helpers/helpers")
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret");

module.exports = {
    async createEvent(req, res) {
        const schema=Joi.object().keys({
            type: Joi.string().required(),
            contacted: Joi.string().required(),
            description: Joi.string().required(),
            outcome: Joi.string().required(),
            associateContacts: Joi.array(),
            associateCompanies: Joi.array(),
            associateDeals: Joi.array(),
            associateTickets: Joi.array(),
            status: Joi.string(),
            ownerId: Joi.string().required(),
            timestamp: Joi.date(),
        })

        const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        }


        const body={
            type: value.type,
            contacted: value.contacted,
            description: value.description,
            outcome: value.outcome,
            associateContacts: value.associateContacts,
            associateCompanies: value.associateCompanies,
            associateDeals: value.associateDeals,
            associateTickets: value.associateTickets,
            status: value.status,
            ownerId: value.ownerId,
            timestamp: value.timestamp
        }

        const newEvent = new Event (body);
        
        newEvent.save()
            .then(event => {
                const newActivity = new Activity({
                    type: event.type,
                    details: "Link:owner:;Text::logged a "+event.type+" with:;Link::"+ event.contacted + ":;",
                    subdetails: event.description,
                    ownerId: event.ownerId ,
                    contactId: event.associateContacts,
                    companyId: event.associateCompanies,
                    dealId: event.associateDeals,
                    ticketId: event.associateTickets,
                    nameId: event._id
                })
                newActivity.save()
                    .then(activity => res.json({event, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))

    },
    
}
