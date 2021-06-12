// const Joi= require("Joi")
const Storage=require("../../../models/wms/storageModels");
const HttpStatus=require("http-status-codes")
const Footwear = require("../../../models/wms/footwearModels")

const moment=require("moment")
const request=require("request")


module.exports={
  async GetFootwear(req,res){

    const allFootwears=await Footwear.find()
       .select("footwearId")
      .populate('footwearId')


    return res.status(HttpStatus.OK).json({"All footwears items":allFootwears});

  }

}