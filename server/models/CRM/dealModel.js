const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name: {type: String},
    stage: {type: String, default: "Stage1"},
    description: {type: String},
    amount: {type: String},
    closeDate: {type: Date},
    owner: {type: String},
    // dealType: {type: String},
    status: {type: String, default: "0"},
    contacts: {type: Array},
    companies: {type: Array},
    tickets: {type: Array},
    timestamp: {type: Date, default: Date.now},
})


module.exports=mongoose.model("deal",userSchema)

