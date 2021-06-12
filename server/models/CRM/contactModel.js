const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    fname: {type: String},
    lname: {type: String},
    email: {type: String},
    mobile: {type: String},
    lifecyclestage: {type: String, default: "New"},
    leadstage: {type: String, default: "New"},
    owner: {type: String},
    designation: {type: String},
    companyId: {type: String},
    deals: {type: Array},
    tickets: {type: Array},
    lastContacted: {type: String, default: Date.now },
    timestamp: {type: Date, default: Date.now}, 
})


module.exports=mongoose.model("contact",userSchema)

