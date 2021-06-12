const mongoose=require("mongoose");

const eventSchema=mongoose.Schema({
    type: {type: String},
    contacted: {type: String},
    description: {type: String},
    outcome: {type: String},
    associateContacts: {type: Array},
    associateCompanies:{type: Array},
    associateDeals:{type: Array},
    associateTickets:{type: Array},
    ownerId: {type: String},
    status: {type: String, default: "completed"},
    timestamp: {type: Date, default: Date.now},
})

module.exports=mongoose.model("event",eventSchema)

