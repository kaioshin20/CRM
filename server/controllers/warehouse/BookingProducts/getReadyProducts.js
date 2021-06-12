const HttpStatus=require("http-status-codes")
const Ready = require("../../../models/wms/readyModels");


module.exports={
  async getReadyProducts(req,res){
    const allReady=await Ready.find()
    .select("readyId")
   .populate('readyId')
    return res.status(HttpStatus.OK).json({msg:"Ready items",allReady});

  }

}