const mongoose=require("mongoose");

const noteSchema=mongoose.Schema({
    for: {type: String},
    note: {type: String},
    owner: {type: String},
    associateContacts: {type: Array},
    associateCompanies:{type: Array},
    associateDeals:{type: Array},
    associateTickets:{type: Array},
    timestamp: {type: Date, default: Date.now},
})


module.exports=mongoose.model("note",noteSchema)

