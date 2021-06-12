const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const Company=require("../../models/CRM/companyModel")
const Activity = require("../../models/CRM/activityModel");
const Helpers=require("../../Helpers/helpers")
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret")

module.exports = {
    async createCompany(req, res) {
        const schema=Joi.object().keys({
            name: Joi.string().required(),
            domain: Joi.string(),
            description: Joi.string(),
            industry: Joi.string(),
            noOfEmployees: Joi.string(),
            revenue: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            pin: Joi.string().min(6).max(6),
            email: Joi.string(),
            mobile: Joi.string().min(10).max(10),
            lifecyclestage: Joi.string(),
            owner: Joi.string(),
        })

        const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
        
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        }

        const companyEmail=await Company.findOne({
            email:Helpers.lowerCase(req.body.email)
        });
        if(companyEmail){
            return res.status(HttpStatus.CONFLICT).json({message:"Company with same Email is already registered"})
        }

        const companyMobile=await Company.findOne({
            mobile:Helpers.lowerCase(req.body.mobile)
        });
        if(companyMobile){
            return res.status(HttpStatus.CONFLICT).json({message:"Company with same Mobile Number is already registered"})
        }

        const body={
            name: Helpers.capitalize(value.name),
            domain: Helpers.lowerCase(value.domain),
            description: value.description,
            industry: Helpers.capitalize(value.industry),
            noOfEmployees: value.noOfEmployees,
            revenue: value.revenue,
            city: Helpers.capitalize(value.city),
            state: Helpers.capitalize(value.state),
            pin: value.pin,
            email: Helpers.lowerCase(value.email),
            mobile: value.mobile,
            lifecyclestage: value.lifecyclestage,
            owner: Helpers.capitalize(value.owner),
        }

        const newCompany = new Company(body);

        // const newContact = new Contact({
        //     fname: req.body.fname,
        //     lname: req.body.lname,
        //     email: req.body.email,
        //     mobile: req.body.mobile,
        //     lifecyclestage: req.body.lifecyclestage,
        //     leadstage: req.body.leadstage,
        //     owner: req.body.owner,
        // })
        
        newCompany.save()
            .then(company => {
                const newActivity = new Activity({
                    type : "Company",
                    details : "Link::owner:;Text::created a new company:;",
                    subdetails : "created",
                    contactId : [],
                    companyId : [company._id],
                    dealId : [],
                    ticketId : [],
                    ownerId : company.ownerId,
                    nameId : company._id,
                })
                newActivity.save()
                    .then(activity => res.json({company, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))
            
    },

    async editCompany(req, res){
        Company.findOneAndUpdate({ _id: req.params.id},{ $set: req.body},{returnNewDocument: true})
            .then(company => {
                const newActivity = new Activity({
                    type : "Company",
                    details : "Link::owner:;Text::made changes:;",
                    subdetails : "edited",
                    contactId : [],
                    companyId : [company._id],
                    dealId : [],
                    ticketId : [],
                    ownerId : company.ownerId,
                    nameId : company._id,
                })
                newActivity.save()
                    .then(activity => res.json({company, activity}))
                    .catch(err => res.json(err))
    
            })
            .catch(err => res.json(err))
    }
    
}
