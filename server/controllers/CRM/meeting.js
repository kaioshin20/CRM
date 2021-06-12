const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const Meeting=require("../../models/CRM/meetingModel")
const Activity = require("../../models/CRM/activityModel");
const Helpers=require("../../Helpers/helpers")
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret");

module.exports = {
    async createMeeting(req, res) {
        const schema=Joi.object().keys({
            subject: Joi.string().required(),
            startTime: Joi.string().required(),
            description: Joi.string().required(),
            priority: Joi.string().required(),
            assignedTo: Joi.string().required(),
            attendeeContacts: Joi.array().required(),
            associateContacts: Joi.array().required(),
            associateCompanies: Joi.array().required(),
            associateDeals: Joi.array().required(),
            associateTickets: Joi.array().required(),
            owner: Joi.string().required(),
            status: Joi.string(),
        })

        const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        }


        const body={
            subject: value.subject,
            type: value.type,
            startTime: value.startTime,
            description: value.description,
            priority: value.priority,
            assignedTo: value.assignedTo,
            attendeeContacts: value.attendeeContacts,
            associateContacts: value.associateContacts,
            associateCompanies: value.associateCompanies,
            associateDeals: value.associateDeals,
            associateTickets: value.associateTickets,
            owner: value.owner,
            status: value.status,
        }

        const newMeeting = new Meeting(body);

        // const newContact = new Contact({
        //     fname: req.body.fname,
        //     lname: req.body.lname,
        //     email: req.body.email,
        //     mobile: req.body.mobile,
        //     lifecyclestage: req.body.lifecyclestage,
        //     leadstage: req.body.leadstage,
        //     owner: req.body.owner,
        // })
        
        newMeeting.save()
            .then(meeting => {
                const newActivity = new Activity({
                    type: "Meeting " + meeting.status,
                    details: "Link:owner:;Text::"+ meeting.status +" a meeting with:;Link::"+ meeting.attendeeContacts + ":;Text::on:;Date::"+ meeting.startTime,
                    subdetails: meeting.status,
                    ownerId: meeting.ownerId ,
                    contactId: meeting.associateContacts,
                    companyId: meeting.associateCompanies,
                    dealId: meeting.associateDeals,
                    ticketId: meeting.associateTickets,
                    nameId: meeting._id
                })
                newActivity.save()
                    .then(activity => res.json({meeting, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))

    },
    
}
