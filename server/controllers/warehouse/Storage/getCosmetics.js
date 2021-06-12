const HttpStatus=require("http-status-codes")
 const Cosmetics = require("../../../models/wms/cosmeticsModels")


module.exports={
  async GetCosmetics(req,res){

    const allCosmetics=await Cosmetics.find()
    .select("cosmeticsId")
   .populate('cosmeticsId')


    return res.status(HttpStatus.OK).json({msg:"GetCosmetics",allCosmetics});

  }

}