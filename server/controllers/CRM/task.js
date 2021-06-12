const Joi= require("Joi")
const HttpStatus=require("http-status-codes")
const Task=require("../../models/CRM/taskModel")
const Activity = require("../../models/CRM/activityModel");
const Helpers=require("../../Helpers/helpers")
const jwt=require("jsonwebtoken")
const dbConfig=require("../../config/secret");

module.exports = {
    async createTask(req, res) {
        const schema=Joi.object().keys({
            name: Joi.string().required(),
            type: Joi.string().required(),
            due: Joi.date().required(),
            description: Joi.string(),
            priority: Joi.string().required(),
            assignedTo: Joi.string().required(),
            associateContacts: Joi.array(),
            associateCompanies: Joi.array(),
            associateDeals: Joi.array(),
            associateTickets: Joi.array(),
            status: Joi.string().default('0'),
            ownerId: Joi.string().required(),
        })

        const { error , value }=Joi.validate(req.body,schema) //if it has error then value saved is error else if value then saved in value by calling Joi.validate
        if(error && error.details){
            return res.status(HttpStatus.BAD_REQUEST).json({msg:error.details});
        }


        const body={
            name: value.name,
            type: value.type,
            due: value.due,
            description: value.description,
            priority: value.priority,
            assignedTo: value.assignedTo,
            associateContacts: value.associateContacts,
            associateCompanies: value.associateCompanies,
            associateDeals: value.associateDeals,
            associateTickets: value.associateTickets,
            status: value.status,
            ownerId: value.ownerId
        }

        const newTask = new Task(body);

        newTask.save()
            .then(task => {
                const newActivity = new Activity({
                    type : "Task",
                    details : "Link:owner:;Text::created a task"+ task.name +" due on:;Date::"+ task.due + ":;",
                    subdetails: "created",
                    contactId : task.associateContacts ,
                    companyId : task.associateCompanies ,
                    dealId : task.associateDeals ,
                    ticketId : task.associateTickets ,
                    nameId : task._id
                })
                newActivity.save()
                    .then(activity => res.json({task, activity}))
                    .catch(err => res.json(err))

            })
            .catch(err => res.json(err))

    },
    
}
