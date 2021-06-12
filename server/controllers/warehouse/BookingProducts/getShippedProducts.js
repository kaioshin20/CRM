const HttpStatus=require("http-status-codes")
const Shipped = require("../../../models/wms/shippedModels");


module.exports={
  async getShippedProducts(req,res){
    const allShipped=await Shipped.find()
    .select("shippedId")
   .populate('shippedId')
    return res.status(HttpStatus.OK).json({msg:"Shipped items",allShipped});

  }

}