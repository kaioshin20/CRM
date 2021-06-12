const Booking = require("../../../models/wms/bookingModels")
const Packing = require("../../../models/wms/packedModels")
const Ready = require("../../../models/wms/readyModels")
const Shipping = require("../../../models/wms/shippedModels")
const Booked = require("../../../models/wms/bookedModels")
const Storage=require("../../../models/wms/storageModels");


const Joi= require("Joi")
const HttpStatus=require("http-status-codes")

module.exports={

    async cancelBooking(req,res){
        
console.log(req.params.id)
 await Booking.findOneAndDelete({_id:req.params.id})
 .then(async (deletedData)=>{
//if(deletedData){
 
const {product_quantity,shipping_status,product_name} = deletedData
console.log("the data is deeleted",deletedData)

let deleteFromother=''
if(shipping_status === 'booked'){
     await Booked.findOneAndDelete({bookedId:req.params.id})
     .then(async (data)=>{
         deleteFromother = data
         console.log("deleteData from booked")
     })
}
else if(shipping_status === 'packed'){
    await Packing.findOneAndDelete({packedId:req.params.id})
    .then(async (data)=>{
        deleteFromother = data
        console.log("deleteData from packed")

    })

}
else if(shipping_status === 'ready'){
    await Ready.findOneAndDelete({readyId:req.params.id})
    .then(async (data)=>{
        deleteFromother = data
        console.log("deleteData from ready")

    })

}
else
 if(shipping_status === "shipped"){
    await Shipping.findOneAndDelete({shippedId:req.params.id})
    .then(async (data)=>{
        deleteFromother = data
        console.log("deleteData from shiped")

    })

}

const OldStoreData = await Storage.findOne({
    category: deletedData.product_category,
    product_name:deletedData.product_name
})

if(OldStoreData){
    console.log("oldata mik",OldStoreData)
 //product_quantity = product_quantity + OldStoreData.quantity

const p = deletedData.product_quantity + OldStoreData.quantity
console.log("restorest quantity", p)
    await Storage.updateOne(
        {
            _id: OldStoreData._id
        },
        {
            quantity: p
        }
      )
      .then(async (newUpdate)=>{
        res.status(HttpStatus.OK).json({msg:"updated status to ready",newUpdate,deletedData,deleteFromother});
    
    })
    .catch(err=>{
        res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error occured in updating the store' })
       })
    
}
else{
    res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: 'Not present' })
   return
}


})
.catch(err=>{
 res
 .status(HttpStatus.INTERNAL_SERVER_ERROR)
 .json({ message: 'Error occured in updating the status' })
})


   }

 }