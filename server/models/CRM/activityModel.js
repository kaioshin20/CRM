const mongoose=require("mongoose");

const activitySchema=mongoose.Schema({
    type: {type: String},
    details: {type: String},
    subdetails: {type: String},
    ownerId: {type: String},
    contactId: {type: Array},
    companyId: {type: Array},
    dealId: {type: Array},
    ticketId: {type: Array},
    nameId: {type: String},
    timestamp: {type: Date, default: Date.now},
})


module.exports=mongoose.model("activity",activitySchema)

