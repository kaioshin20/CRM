const mongoose=require("mongoose");

const meetingSchema=mongoose.Schema({
    subject: {type: String},
    startTime: {type: Date,  default: Date.now()},
    description: {type: String},
    priority: {type: String},
    assignedTo: {type: String},
    attendeeContacts: { type: Array},
    associateContacts: {type: Array},
    associateCompanies:{type: Array},
    associateDeals:{type: Array},
    associateTickets:{type: Array},
    status: {type: String, default: "scheduled"},
    owner: {type: String},
    timestamp: {type: Date, default: Date.now()}
})

module.exports=mongoose.model("meeting",meetingSchema)

