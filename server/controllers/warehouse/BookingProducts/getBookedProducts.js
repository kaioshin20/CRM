const HttpStatus=require("http-status-codes")
const Booked = require("../../../models/wms/bookedModels");


module.exports={
  async getBookedProducts(req,res){
    const allBooked=await Booked.find()
    .select("bookedId")
   .populate('bookedId')
    return res.status(HttpStatus.OK).json({msg:"booked items",allBooked});

  }

}