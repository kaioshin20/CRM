const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    name: {type: String},
    due: {type: Date},
    description: {type: String},
    associateContacts: {type: Array},
    associateCompanies:{type: Array},
    associateDeals:{type: Array},
    associateTickets:{type: Array},
    assignedTo: {type: String},
    type: {type: String},
    priority: {type: String},
    ownerId: {type: String},
    status: {type: String, default: "0"},
    timestamp: {type: Date, default: Date.now},
})


module.exports=mongoose.model("task",taskSchema)

