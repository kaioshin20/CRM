const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const Activity = require("../../models/CRM/activityModel");
const Helpers=require("../../Helpers/helpers")
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret");

module.exports = {
    async createActivity(req, res) {
        const schema=Joi.object().keys({
            type: Joi.string().required(),
            details: Joi.string().required(),
            subdetails: Joi.string(),
            ownerId: Joi.string().required(),
            contactId: Joi.array(),
            companyId: Joi.array(),
            dealId: Joi.array(),
            ticketId: Joi.array(),
            nameId: Joi.string().required()
        })

        const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        }

        const body={
            type: Helpers.capitalize(value.type),
            details: Helpers.capitalize(value.details),
            subdetails: value.subdetails,
            ownerId: value.ownerId,
            contactId: value.contactId,
            companyId: value.companyId,
            dealId: value.dealId,
            nameId: value.name,
        }

        const newActivity = new Activity(body);
        
        newActivity.save()
            .then(activity => res.json(activity))
            .catch(err => res.json(err))

    }
    
}
