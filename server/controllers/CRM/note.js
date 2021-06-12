const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const Note =require("../../models/CRM/notesModel")
const Activity = require("../../models/CRM/activityModel");
const Helpers=require("../../Helpers/helpers")
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret");

module.exports = {
    async createNote(req, res) {
        const schema=Joi.object().keys({
            for: Joi.string().required(),
            note: Joi.string().required(),
            associateContacts: Joi.array(),
            associateCompanies: Joi.array(),
            associateDeals: Joi.array(),
            associateTickets: Joi.array(),
            owner: Joi.string().required(),
            timestamp: Joi.date(),
        })

        const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        }


        const body={
            for: value.for,
            note: value.note,
            associateContacts: value.associateContacts,
            associateCompanies: value.associateCompanies,
            associateDeals: value.associateDeals,
            associateTickets: value.associateTickets,
            owner: value.owner,
            timestamp: value.timestamp
        }

        const newnote = new Note (body);
        
        newnote.save()
            .then(note => {
                const newActivity = new Activity({
                    type : "Note",
                    details : "Link:owner:;Text::created a note for:;Link::"+ note.for + ":;",
                    subdetails: "created",
                    contactId : note.associateContacts ,
                    companyId : note.associateCompanies ,
                    dealId : note.associateDeals ,
                    ticketId : note.associateTickets , 
                    ownerId : note.ownerId,
                    nameId : note._id
                })
                newActivity.save()
                    .then(activity => res.json({note, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))

    },
    
}
