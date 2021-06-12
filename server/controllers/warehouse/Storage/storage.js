const Joi=require("Joi")
const Storage=require("../../../models/wms/storageModels");
const HttpStatus=require("http-status-codes")
const Furniture = require("../../../models/wms/furnitureModels")
const Clothing = require("../../../models/wms/clothingModels")
const Cosmetics = require("../../../models/wms/cosmeticsModels")
const Medicines = require("../../../models/wms/medicinesModels")
const Footwear = require("../../../models/wms/footwearModels")

const moment=require("moment")
const request=require("request");


module.exports={
  async AddProduct(req,res){
     console.log("Req body in post.js",req.body)
    const schema=Joi.object().keys({
        product_name:Joi.string().required(),
        category:Joi.string().required(),
        quantity:Joi.number().required(),
        storage_no:Joi.string().required(),
    
    });
    
    const { error , value }=Joi.validate(req.body,schema)//if it has error then value saved is error else if value then saved in value by calling Joi.validate
    
    if(error && error.details){
        return res.status(HttpStatus.BAD_REQUEST).json({message:'Not validate'});
    
    }


    const {product_name,category,quantity,storage_no,created} = req.body
     

    const product=await Storage.findOne({
      product_name:product_name,
      category:category,
      storage_no:storage_no
  });//to check if the email already exist
  
  if(product){
console.log("----->>",product)
product.quantity = product.quantity + quantity;
    await Storage.update(
                {
                  _id: product._id,
                },
                {
               quantity: product.quantity
                }
              )
             return res.status(HttpStatus.OK).json({message:"product already exist so updated the quantity",product})
}
else{
  const bodyObj={
    product_name:product_name,
    category:category,
    quantity:quantity,
    storage_no:storage_no,
    created:created
}




console.log("THE DATA AIA",bodyObj)

    
    Storage.create(bodyObj)
    .then(async (product)=>{

      if(category === 'furniture'){
        const newFurniture = new Furniture();
        newFurniture.furnitureId=product._id

          await newFurniture
          .save()
          .then((furniture) =>
          res.status(HttpStatus.OK).json({message:"product stored",product})
          )
          .catch(err =>
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error occured in createing storage in furniture' })
          );
      }
      else if(category === 'clothing'){
        const newClothing = new Clothing();
        newClothing.clothingId=product._id

          await newClothing
          .save()
          .then((clothing) =>
          res.status(HttpStatus.OK).json({message:"product stored",product})
          )
          .catch(err =>
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error occured in createing storage in clothing' })
          );
      }else if(category === 'footwear'){
        const newFootwear = new Footwear();
        newFootwear.footwearId=product._id

          await newFootwear
          .save()
          .then((Footwear) =>
          res.status(HttpStatus.OK).json({message:"product stored",product})
          )
          .catch(err =>
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error occured in createing storage in footwear' })
          );
      }else if(category === 'medicines'){
        const newMedicine = new Medicines();
        newMedicine.medicineId=product._id

          await newMedicine
          .save()
          .then((Medicine) =>
          res.status(HttpStatus.OK).json({message:"product stored",product})
          )
          .catch(err =>
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error occured in createing storage in Medicine' })
          );
      }else if(category === 'cosmetics'){
        const newCosmetics = new Cosmetics();
        newCosmetics.cosmeticsId=product._id

          await newCosmetics
          .save()
          .then((Cosmetics) =>
          res.status(HttpStatus.OK).json({message:"product stored",product})
          )
          .catch(err =>
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error occured in createing storage in Cosmetics' })
          );
      }
    })
    .catch(err=>{
      console.log("Data is ERROR saved in 0")
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Error Occured"})
        
    })
}
   
    },


    async GetAllFromStorage(req,res){
      const AllProducts = await Storage.find();
      if(AllProducts){
        res.status(HttpStatus.OK).json({message:"product found in store",AllProducts})
      
    }
    else{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"NOt available in storage"})
    }


    },

    async GetProductById(req,res){
      
     const product = await Storage.findOne({ _id: req.params.id})
      if(product){
        res.status(HttpStatus.OK).json({message:"product found in store",product})
      
    }
    else{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"NOt available in storage"})
    }

   }
}