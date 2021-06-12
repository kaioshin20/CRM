const HttpStatus=require("http-status-codes")
const Packed = require("../../../models/wms/packedModels");


module.exports={
  async getPackedProducts(req,res){
    const allPacked=await Packed.find()
    .select("packedId")
   .populate('packedId')
    return res.status(HttpStatus.OK).json({msg:"Packed items",allPacked});

  }

}