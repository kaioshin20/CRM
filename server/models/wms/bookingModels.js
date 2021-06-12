const mongoose=require("mongoose")

const StorageSchema = mongoose.Schema({

    product_name:{type:String,default:''},
    product_category:{type:String,default:''},
    product_quantity:{type:Number,default:0},
    shipping_address:{type:String,default:''},
    shipping_email:{type:String,default:''},
    shipping_status:{type:String,default:''},
    created:{type:Date,default:Date.now()}

});

module.exports=mongoose.model('Booked-product',StorageSchema)
