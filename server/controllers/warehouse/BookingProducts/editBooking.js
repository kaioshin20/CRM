const Joi= require("Joi")
const Storage=require("../../../models/wms/storageModels");
const HttpStatus=require("http-status-codes")

const Booking = require("../../../models/wms/bookingModels")
const Packing = require("../../../models/wms/packedModels")
const Ready = require("../../../models/wms/readyModels")
const Shipping = require("../../../models/wms/shippedModels")
const Booked = require("../../../models/wms/bookedModels")


const moment=require("moment")
const request=require("request")


module.exports={
  async editBooking(req,res){
           
console.log(req.params.id)



const testing=await Storage.findOne({
  product_name:req.body.product_name,
  category:req.body.product_category,
});



console.log("checking prodct check")
if(testing){
console.log("----first->>",testing)


let temp = 0

temp = testing.quantity - req.body.product_quantity;
console.log(temp,"--",testing.quantity,"---",req.body.product_quantity)
if( temp <0){
   
  message = "Quantity is more than the actual stock .cancelling the editing request"
    res.status(HttpStatus.BAD_REQUEST).json({message:message})
    return;

}
}
else{
  message = "Product description donot match with the storage"
   res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:message})
 return  
}





await Booking.findOneAndDelete({_id:req.params.id})
.then(async (deletedData)=>{
//if(deletedData){

const {
  
        product_name ,
        product_category ,
        shipping_address ,
        shipping_email ,
        shipping_status,
     
    
} = deletedData
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
//       res.status(HttpStatus.OK).json({msg:"updated status to ready",newUpdate,deletedData,deleteFromother});

console.log("added back to storage",newUpdate)

const addNewOne = {
    product_name:req.body.product_name,
    product_category:  req.body.product_category,
    product_quantity: req.body.product_quantity, 
    shipping_address:req.body.shipping_address,
    shipping_email:req.body.shipping_email,
    shipping_status:'booked'
}

console.log("new to add",addNewOne)


const product_check=await Storage.findOne({
  product_name:addNewOne.product_name,
  category:addNewOne.product_category,
});



console.log("checking prodct check")
if(product_check){
console.log("----->>".product_check)
var message;


product_check.quantity = product_check.quantity - addNewOne.product_quantity;
if( product_check.quantity<0){
    product_check.quantity = 0;
  message = "The following product's stock is totally empty or insufficient stock"
   res.status(HttpStatus.OK).json({message:message})

}
else{
   message = "ORder has been updated but now it start from the booking";

await Storage.updateOne(
            {
              _id: product_check._id,
            },
            {
           quantity:  product_check.quantity
            }
          )        
         console.log("product books",addNewOne); 

         Booking.create(addNewOne)
         .then(async (booking)=>{


          const newBooked = new Booked();
          newBooked.bookedId = booking._id
  
            await newBooked
            .save()
            .then((Booked) =>{
              res.status(HttpStatus.OK).json({message:message})
            })
            .catch(err =>
              res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Error occured in updating the status' })
            );


         })
          }
        }
else{
 res.status(HttpStatus.BAD_REQUEST).json({message:"product doesnot exist anymore",})

}


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
   
  
}


})
.catch(err=>{
res
.status(HttpStatus.INTERNAL_SERVER_ERROR)
.json({ message: 'Your data is not found in database .Cannot edit the booking' })
})

   }

}