
const mongoose = require('mongoose');

const PickListSchema = mongoose.Schema({
 Dispatch_no:{type:String,default:''},
 Dispatch_Date:{type:Date,default:Date.now()},
 Package_name:{type:String,default:''},
 Fran_name:{type:String,default:''},
 Customer_name:{type:String,default:''},
 Box_no:{type:String,default:''},
 Required_qty:{type:Number,default:0},
 Stack_qty:{type:Number,default:0},
 Transporter:{type:String,default:'ATA-FREIGHT'},
 Pallet_no:{type:String,default:''},
List : [
 {
 Item_code:{type:String,default:''},
 Item_description:{type:String,default:''},
 Fran_name:{type:String,default:''},
 Box_no:{type:Number,default:0},
 Box_qty:{type:Number,default:0},
 Created:{type:Date,default:Date.now()}
}
]
});

module.exports = mongoose.model('Pick List', PickListSchema);