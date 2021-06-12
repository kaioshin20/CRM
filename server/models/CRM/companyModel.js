const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name: {type: String},
    domain: {type: String},
    description: {type: String},
    industry: {type: String},
    // type: {type: String},
    noOfEmployees: {type: Number},
    revenue: {type: String},
    city: {type: String},
    state: {type: String},
    pin: {type: String},
    email: {type: String},
    mobile: {type: String},
    lifecyclestage: {type: String, default: "New"},
    contacts: { type: Array},
    deals: {type: Array},
    tickets: { type: Array},
    owner: {type: String},
    lastContacted: {type: String},
    timestamp: {type: Date, default: Date.now},
})


module.exports=mongoose.model("company",userSchema)

