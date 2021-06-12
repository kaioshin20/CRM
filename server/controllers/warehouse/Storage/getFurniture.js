const HttpStatus=require("http-status-codes")
 const Furniture = require("../../../models/wms/furnitureModels")



module.exports={
  async GetFurniture(req,res){
    const allFurniture=await Furniture.find()
    .select("furnitureId")
   .populate('furnitureId')


 return res.status(HttpStatus.OK).json({"All furniture items":allFurniture});


  }


}