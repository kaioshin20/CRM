const HttpStatus=require("http-status-codes")
const Medicines = require("../../../models/wms/medicinesModels")


module.exports={
  async GetMedicines(req,res){
    const allMedicines=await Medicines.find()
    .select("medicineId")
   .populate('medicineId')


 return res.status(HttpStatus.OK).json({"All medicines items":allMedicines});

  }

}