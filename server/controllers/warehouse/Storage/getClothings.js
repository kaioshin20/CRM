const HttpStatus=require("http-status-codes")
const Clothings = require("../../../models/wms/clothingModels");


module.exports={
  async GetClothing(req,res){
    const allClothing=await Clothings.find()
    .select("clothingId")
   .populate('clothingId')
    return res.status(HttpStatus.OK).json({msg:"clothings",allClothing});

  }

}