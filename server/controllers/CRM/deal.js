const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const Deal=require("../../models/CRM/dealModel")
const Contact=require("../../models/CRM/contactModel")
const Company=require("../../models/CRM/companyModel")
const Activity = require("../../models/CRM/activityModel");
const Helpers=require("../../Helpers/helpers")
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret")

module.exports = {
    async createDeal(req, res) {
        const schema=Joi.object().keys({
            name: Joi.string().required(),
            stage: Joi.string(),
            description: Joi.string(),
            amount: Joi.string().required(),
            closeDate: Joi.date().required(),
            status: Joi.string(),
            owner: Joi.string(),
            companies: Joi.array(),
            contacts: Joi.array(),
        })

        const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
        
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        }

        const dealName=await Deal.findOne({
            name:Helpers.capitalize(req.body.name)
        });
        if(dealName){
            return res.status(HttpStatus.CONFLICT).json({message:"Deal with same name is already created"})
        }

        const body={
            name: Helpers.capitalize(value.name),
            stage: Helpers.capitalize(value.stage),
            description: value.description,
            amount: value.amount,
            closeDate: value.closeDate,
            owner: Helpers.capitalize(value.owner),
            status: value.status,
            companies: value.companies,
            contacts: value.contacts,
        }

        const newDeal = new Deal(body);
        
        newDeal.save()
            .then(deal => {
                deal.contacts.forEach(id => {
                    console.log(id,deal._id)
                    Contact.findOneAndUpdate({_id: id}, { $push: { deals: deal._id.toString()}},{returnNewDocument: true} )
                        .then(res =>{ return ;})
                        .catch(err => console.log(err))
                });
                deal.companies.forEach(id => {
                    console.log(id,deal._id)
                    Company.findOneAndUpdate({_id: id}, { $push: { deals: deal._id.toString()}},{returnNewDocument: true} )
                        .then(res =>{ return ;})
                        .catch(err => console.log(err))
                });
                
                const newActivity = new Activity({
                    type : "Deal",
                    details : "Link::owner:;Text::created a new deal:;",
                    subdetails : "created",
                    contactId : [deal.contactId],
                    companyId : [deal.company_id],
                    dealId : [deal.dealId],
                    ticketId : [deal.ticketId], 
                    ownerId : deal.ownerId,
                    nameId : deal._id
                })
                newActivity.save()
                    .then(activity => res.json({deal, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))

    },
    async editDeal(req, res) {
        Deal.findOneAndUpdate({ _id: req.params.id},{ $set: req.body},{returnNewDocument: true})
            .then(deal => {
                const newActivity = new Activity({
                    type : "Deal",
                    details : "Link::owner:;Text::made changes to deal:;",
                    subdetails : "edited",
                    contactId : [deal.contactId],
                    companyId : [deal.company_id],
                    dealId : [deal.dealId],
                    ticketId : [deal.ticketId], 
                    ownerId : deal.ownerId,
                    nameId : deal._id
                })
                newActivity.save()
                    .then(activity => res.json({deal, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))
    }
    
}
