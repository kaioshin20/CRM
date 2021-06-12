const mongoose=require("mongoose")

const StorageSchema = mongoose.Schema({

    product_name:{type:String,default:''},
    category:{type:String,default:''},
    quantity:{type:Number,default:0},
    storage_no:{type:String,default:''},
    created:{type:Date,default:Date.now()}

});

module.exports=mongoose.model('Storage',StorageSchema)
