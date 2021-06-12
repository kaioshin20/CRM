const mongoose=require("mongoose")

const GRNSchema = mongoose.Schema({
    Warehouse_code:{type:String,default:''},
    Warehouse_name:{type:String,default:''},
    Depositor_code:{type:String,default:''},
    Depositor_name:{type:String,default:''},
    Supplier_code:{type:String,default:''},
    Supplier_name:{type:String,default:''},
    Shelf_code:{type:String,default:''},
    Shelf_name:{type:String,default:''},
    Zone_code:{type:String,default:''},
    Zone_name:{type:String,default:''},
    ReceiptDate:{type:Date,default:Date.now()},
List : [
    {
    Item_code:{type:String,default:''},
    Item_description:{type:String,default:''},
    Container_quantity:{type:Number,default:0},
    Total_quantity:{type:Number,default:0},
    Unit_price:{type:Number,default:0},
    Total_price:{type:Number,default:0},
    Product_status:{type:String,default:'ok'},
    Accepted_qty:{type:Number,default:0},
    Rejected_qty:{type:Number,default:0},
    Depositor_currency:{type:String,default:'INR'},
    Exchange_rate:{type:Number,default:0},
    Created:{type:Date,default:Date.now()}
}
]
   
});

module.exports=mongoose.model('GRN',GRNSchema)
