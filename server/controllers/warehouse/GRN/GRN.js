const Joi=require("Joi")
//const Storage=require("../../../models/wms/storageModels");
const HttpStatus=require("http-status-codes")
const GRN = require('../../../models/wms/grnModels');

module.exports = {


    async getAllGrn(req,res){
        const AllGrn = await GRN.find();
        if(AllGrn){
          res.status(HttpStatus.OK).json({message:"grn found in store",AllGrn})
        
      }
      else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"NOt available in storage"})
      }
  
    },
    async getGRNById(req,res){
        console.log("reach to getGrn by id",req.params.id)
        const grn = await GRN.find({_id:req.params.id});
        if(grn){
          res.status(HttpStatus.OK).json({message:"grn found in grn",grn})
        
      }
      else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"NOt available in grn"})
      }
        

    },
async editGRNById(req,res){

  
  console.log(req.params.id)
    const {List, 
        Warehouse_code,
        Warehouse_name,
        Depositor_code,
        Depositor_name,
        Supplier_code,
        Supplier_name,
        Shelf_code,
        Shelf_name,
        Zone_code,
        Zone_name}  = req.body;
    


    await GRN.update(
        {
          _id: req.params.id,
        },
        {
            Warehouse_code:Warehouse_code,
            Warehouse_name:Warehouse_name,
            Depositor_code:Depositor_code,
            Depositor_name:Depositor_name,
            Supplier_code:Supplier_code,
            Supplier_name:Supplier_name,
            Shelf_code:Shelf_code,
            Shelf_name:Shelf_name,
            Zone_code:Zone_code,
            Zone_name:Zone_name,
            List:List
        }
      )
      .then(async (newUpdate)=>{
return res.status(HttpStatus.OK).json({messgae:"edited the grn",newUpdate})
            

      })
      .catch(err => {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error occured in editing' });
      });     
},

async AddGRN(req,res){
//res.status(200).json({"all are":req.body})
console.log("reached in side grn",
req.body)
console.log("reached in side grn LIST",
req.body.List)

const {List, 
    Warehouse_code,
    Warehouse_name,
    Depositor_code,
    Depositor_name,
    Supplier_code,
    Supplier_name,
    Shelf_code,
    Shelf_name,
    Zone_code,
    Zone_name}  = req.body;


// const schema=Joi.object().keys({
//     product_name:Joi.string().required(),
//     product_category:Joi.string().required(),
//     product_quantity:Joi.number().required(),
//     product_status:Joi.string().required(),
// })


//  allgrn.forEach((e)=>{
//     let { error , value } =Joi.validate(e,schema)

//  })


// if(error && error.details){
//     return res.status(HttpStatus.BAD_REQUEST).json({message:'Not validate'});

// }



await GRN.create({
    Warehouse_code:Warehouse_code,
    Warehouse_name:Warehouse_name,
    Depositor_code:Depositor_code,
    Depositor_name:Depositor_name,
    Supplier_code:Supplier_code,
    Supplier_name:Supplier_name,
    Shelf_code:Shelf_code,
    Shelf_name:Shelf_name,
    Zone_code:Zone_code,
    Zone_name:Zone_name,
    List:List

})
.then(post=>{
 res.status(HttpStatus.CREATED).json({message:"GRN created successfully",grn:post})
})
.catch(err=>
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error in creating the GRN"})
    
    )

},
async deleteGRNById(req,res){
    await GRN.findOneAndDelete({_id:req.params.id})
    .then(async (deletedData)=>{
        res.status(HttpStatus.OK).json({message:"GRN deleted successfully"})
 
    })
    .catch(err=>
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error in deleting the GRN"})

        )

   //if(deletedData){
}

}