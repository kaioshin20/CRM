const mongoose=require("mongoose");

const icdrateSchema=mongoose.Schema({
    ICDName : {
        type: String,
        //required: true,
    },
    portOfLoading : {
        type: String,
        //required: true,
    },
    equipmentSize : {
        type: String,
        //required: true,
    },
    effectiveFromDate : {
        type: String,
        //required: true,
    },
    effectiveToDate : {
        type: String,
        //required: true,
    },
    currency : {
        type: String,
        //required: true,
    },
    WTSlab : {
        type: String,
        //required: true,
    },
    railFreightINR : {
        type: String,
        //required: true,
    },
    ICDHandlingFactoryINR : {
        type: String,
        //required: true,
    },
    ICDHandlingWarehouseINR : {
        type: String,
        //required: true,
    },
    GST : {
        type: String,
        //required: true,
    },



})

module.exports=mongoose.model("icd_rate",icdrateSchema)