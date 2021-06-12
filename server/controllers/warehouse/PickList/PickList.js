const Joi=require("Joi")
const HttpStatus=require("http-status-codes")
const PickList = require('../../../models/wms/pickListModels');

module.exports = {


    async getAllPickList(req,res){
        const AllPickList = await PickList.find();
        if(AllPickList){
          res.status(HttpStatus.OK).json({message:"PickList found in store",AllPickList})
        
      }
      else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"NOt available in storage"})
      }
  
    },
    async getPickListById(req,res){
        console.log("reach to getPickList by id",req.params.id)
        const pickList = await PickList.find({_id:req.params.id});
        if(pickList){
          res.status(HttpStatus.OK).json({message:"PickList found in PickList",pickList})
        
      }
      else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"NOt available in PickList"})
      }
        

    },
async editPickListById(req,res){

  
  console.log(req.params.id)
  const {
    Dispatch_no,
    Package_name,
    Fran_name,
    Customer_name,
    Box_no,
    Required_qty,
    Stack_qty,
    Transporter,
    Pallet_no,
    List
    }  = req.body;
    


    await PickList.update(
        {
          _id: req.params.id,
        },
        {
          Dispatch_no:Dispatch_no,
          Package_name:Package_name,
          Fran_name:Fran_name,
          Customer_name:Customer_name,
          Box_no:Box_no,
          Required_qty:Required_qty,
          Stack_qty:Stack_qty,
          Transporter:Transporter,
          Pallet_no:Pallet_no,
          List:List
        }
      )
      .then(async (newUpdate)=>{
return res.status(HttpStatus.OK).json({messgae:"edited the PickList",newUpdate})
            

      })
      .catch(err => {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error occured in editing' });
      });     
},

async AddPickList(req,res){

console.log("reached in side PickList",
req.body)
console.log("reached in side PickList LIST",
req.body.List)

const {
    Dispatch_no,
    Package_name,
    Fran_name,
    Customer_name,
    Box_no,
    Required_qty,
    Stack_qty,
    Transporter,
    Pallet_no,
    List
    }  = req.body;


// const schema=Joi.object().keys({
//     product_name:Joi.string().required(),
//     product_category:Joi.string().required(),
//     product_quantity:Joi.number().required(),
//     product_status:Joi.string().required(),
// })


//  allPickList.forEach((e)=>{
//     let { error , value } =Joi.validate(e,schema)

//  })


// if(error && error.details){
//     return res.status(HttpStatus.BAD_REQUEST).json({message:'Not validate'});

// }



await PickList.create({
    Dispatch_no:Dispatch_no,
    Package_name:Package_name,
    Fran_name:Fran_name,
    Customer_name:Customer_name,
    Box_no:Box_no,
    Required_qty:Required_qty,
    Stack_qty:Stack_qty,
    Transporter:Transporter,
    Pallet_no:Pallet_no,
    List:List
})
.then(post=>{
 res.status(HttpStatus.CREATED).json({message:"PickList created successfully",PickList:post})
})
.catch(err=>
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error in creating the PickList"})
    
    )

},
async deletePickListById(req,res){
    await PickList.findOneAndDelete({_id:req.params.id})
    .then(async (deletedData)=>{
        res.status(HttpStatus.OK).json({message:"PickList deleted successfully"})
 
    })
    .catch(err=>
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error in deleting the PickList"})

        )

}

}