const Joi= require("Joi")
const Storage=require("../../../models/wms/storageModels");
const HttpStatus=require("http-status-codes")
const Booking = require("../../../models/wms/bookingModels")
const Booked = require("../../../models/wms/bookedModels")

const moment=require("moment")
const request=require("request")


module.exports={


  async getBookingById(req,res){

    console.log("getbookng by id",req.params.id)
    const Booked = await Booking.find({_id:req.params.id});
    if(Booked){
      res.status(HttpStatus.OK).json({message:"booking found in booking",Booked})
    
  }
  else{
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"NOt available in storage"})
  }
  },

  async getAllBooking(req,res){
    console.log("reach to getALlbooking")
    const AllBookings = await Booking.find();
    if(AllBookings){
      res.status(HttpStatus.OK).json({message:"booking found in booking",AllBookings})
    
  }
  else{
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"NOt available in storage"})
  }

  },
  async AddBooking(req,res){
     console.log("Req body in post.js",req.body)
    const schema=Joi.object().keys({
        product_name:Joi.string().required(),
        category:Joi.string().required(),
        quantity:Joi.number().required(),
        shipping_address:Joi.string().required(),
        shipping_email:Joi.string().email().required(),
        shipping_status:Joi.string().required()   
    });
    
    const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
    
    if(error && error.details){
        return res.status(HttpStatus.BAD_REQUEST).json({message:'Form Not Filled properly'});
    
    }


    const {product_name,
      category,
      quantity, 
      shipping_address,
      shipping_email,
      shipping_status} = req.body
     

    const product_check=await Storage.findOne({
      product_name:product_name,
      category:category,
  });
  

const product_book ={
  product_name:product_name,
  product_category:category,
  product_quantity:quantity,
  shipping_address:shipping_address,
  shipping_email:shipping_email,
  shipping_status:shipping_status
}


  if(product_check){
console.log("----->>".product_check)
var message;


 product_check.quantity = product_check.quantity - quantity;
    if( product_check.quantity<=0){
        product_check.quantity = 0;
      message = "The following product's stock is totally empty or insufficient stock"
      return res.status(HttpStatus.CONFLICT).json({message:message})

    }
    else{
       message = "Products has been retrieve .New updates";
    
    await Storage.updateOne(
                {
                  _id: product_check._id,
                },
                {
               quantity:  product_check.quantity
                }
              )        
             console.log("product books",product_book); 

             Booking.create(product_book)
             .then(async (booking)=>{


              const newBooked = new Booked();
              newBooked.bookedId = booking._id
      
                await newBooked
                .save()
                .then((Booked) =>{
                  res.status(HttpStatus.OK).json({message:message,product_check,booking,Booked})
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
    return res.status(HttpStatus.BAD_REQUEST).json({message:"product doesnot exist anymore"})

}
        
    }

}