const mongoose=require("mongoose");

const grantSchema=mongoose.Schema({
    role:{
        type: String,
        required: true
    },
    resource:{
        type: String,
        required: true
    },
    action:{
        type: String,
        required: true
    },
    possession:{
        type: String,
        default: "any"
    }


})

module.exports=mongoose.model("Grant",grantSchema)