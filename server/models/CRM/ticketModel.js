const mongoose=require("mongoose");

const ticketSchema=mongoose.Schema({
    name: {type: String},
    status: {type: String}, 
    description: {type: String},
    source: {type: String},
    ownerId: {type: String},
    priority: {type: String},
    contacts: {type: Array},
    companies: {type: Array},
    deals: {type: Array},
    timestamp: {type: Date, default: Date.now},
})


module.exports=mongoose.model("ticket",ticketSchema)

