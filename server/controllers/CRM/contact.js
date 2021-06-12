const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const Contact=require("../../models/CRM/contactModel")
const Company=require("../../models/CRM/companyModel")
const Activity = require("../../models/CRM/activityModel");
const Helpers=require("../../Helpers/helpers")
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret");

module.exports = {
    async createContact(req, res) {
        console.log("reached ctrl")
        const schema=Joi.object().keys({
            fname: Joi.string().required(),
            lname: Joi.string().required(),
            email: Joi.string().required(),
            mobile: Joi.string().min(10).max(10).required(),
            companyId: Joi.string(),
            lifecyclestage: Joi.string(),
            leadstage: Joi.string(),
            designation: Joi.string(),
            owner: Joi.string().required(),
        })

        const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        }

        const contactEmail=await Contact.findOne({
            email:Helpers.lowerCase(req.body.email)
        });
        if(contactEmail){
            return res.status(HttpStatus.CONFLICT).json({message:"Contact with same Email already exist"})
        }

        const contactMobile=await Contact.findOne({
            mobile: req.body.mobile
        });
        if(contactMobile){
            return res.status(HttpStatus.CONFLICT).json({message:"Contact with same Mobile Number already exist"})
        }

        const body={
            fname: Helpers.capitalize(value.fname),
            lname: Helpers.capitalize(value.lname),
            email: Helpers.lowerCase(value.email),
            mobile: value.mobile,
            designation: Helpers.capitalize(value.designation),
            companyId: value.companyId,
            lifecyclestage: Helpers.capitalize(value.lifecyclestage),
            leadstage: Helpers.capitalize(value.leadstage),
            owner: Helpers.capitalize(value.owner),
        }

        const newContact = new Contact(body);
        
        await newContact.save()
            .then(contact => {
                console.log(contact)
                const newActivity = new Activity({
                    type : "Contact",
                    details : "Link::owner:;Text::created a new contact:;",
                    subdetails : "LeadStage:"+contact.leadstage,
                    companyId : [contact.companyId],
                    contactId : [contact._id],
                    dealId : [],
                    ticketId : [],
                    ownerId : contact.ownerId,
                    nameId : contact._id
                })
                newActivity.save()
                    .then(activity => res.json({contact, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))

    },

    async editContact(req, res){
        console.log(res.body, 1)
        Contact.findOneAndUpdate({ _id: req.params.id},{ $set: req.body},{returnNewDocument: true})
            .then(contact => {
                const newActivity = new Activity({
                    type : "Contact",
                    details : "Link::owner:;Text::edited a contact:;",
                    subdetails : "created",
                    companyId : [contact.companyId],
                    contactId : [contact._id],
                    dealId : [],
                    ticketId : [],
                    ownerId : contact.ownerId,
                    nameId : contact._id
                })
                newActivity.save()
                    .then(activity => res.json({contact, activity}))
                    .catch(err => res.json(err))
            })
            .catch(err => res.json(err))
    }
    
}
