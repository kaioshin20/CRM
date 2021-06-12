const Booking = require("../../../models/wms/bookingModels")
const Packing = require("../../../models/wms/packedModels")
const Ready = require("../../../models/wms/readyModels")
const Shipping = require("../../../models/wms/shippedModels")
const Booked = require("../../../models/wms/bookedModels")

const Joi=require("Joi")
const HttpStatus=require("http-status-codes")

module.exports={

    async AlterStatus(req,res){
        console.log("status",req.body.shipping_status)

     

        const {shipping_status} = req.body

       
// if( shipping_status !=='booked' || shipping_status !== 'packed' ||shipping_status !=='ready' || shipping_status !=='shipped' )
//   {
//     res
//     .status(HttpStatus.INTERNAL_SERVER_ERROR)
//     .json({ message: 'Status is not valid' })
//     return
//   }    
    

        await Booking.updateOne(
            {
              _id: req.params.id,
            },
            {
                shipping_status: shipping_status
            }
          )
          .then(async (newUpdate)=>{

                   if(shipping_status === 'packed'){
                    const newPacking = new Packing();
                    newPacking.packedId = req.params.id
            
                      await newPacking
                      .save()
                      .then(async (packing) =>{

                        await Booked.findOneAndDelete({bookedId:req.params.id})
                        .then((newUpdate)=>{
                         res.status(HttpStatus.OK).json({msg:"updated status to packed",newUpdate,Booked});

                        })
                        .catch(err=>{
                          res
                          .status(HttpStatus.INTERNAL_SERVER_ERROR)
                          .json({ message: 'Error occured in updating the status' })
                        })


                       res.status(HttpStatus.OK).json({msg:"updated status",newUpdate,packing});
                      })
                      .catch(err =>
                        res
                          .status(HttpStatus.INTERNAL_SERVER_ERROR)
                          .json({ message: 'Error occured in updating the status' })
                      );
                   }
                   else if(shipping_status === 'ready'){
                    const newReady = new Ready();
                    newReady.readyId = req.params.id
            
                      await newReady
                      .save()
                      .then(async (ready) =>{

                           await Packing.findOneAndDelete({packedId:req.params.id})
                           .then((newUpdate)=>{
                            res.status(HttpStatus.OK).json({msg:"updated status to ready",newUpdate,ready});

                           })
                           .catch(err=>{
                            res
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .json({ message: 'Error occured in updating the status' })
                           })


                      })
                      .catch(err =>
                        res
                          .status(HttpStatus.INTERNAL_SERVER_ERROR)
                          .json({ message: 'Error occured in updating the status' })
                      );
                   }
                   else if(shipping_status === 'shipped'){
                    const newShipped = new Shipping();
                    newShipped.shippedId = req.params.id
            
                      await newShipped
                      .save()
                      .then(async (shipped) =>{

                           await Ready.findOneAndDelete({readyId:req.params.id})
                           .then((newUpdate)=>{
                            res.status(HttpStatus.OK).json({msg:"updated status to shipped",newUpdate,shipped});

                           })
                           .catch(err=>{
                            res
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .json({ message: 'Error occured in updating the status' })
                           })


                      })
                      .catch(err =>
                        res
                          .status(HttpStatus.INTERNAL_SERVER_ERROR)
                          .json({ message: 'Error occured in updating the status' })
                      );
                   }
                   else{
                    res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured in updating the status' })
                   }


          })
          .catch(err => {
            return res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error occured' });
          });       
    }

}