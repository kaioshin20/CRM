const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")

const userSchema=mongoose.Schema({
  email:{type:String},
  password:{type:String},
  role:{
    type:String,
    default: "basic"
  },
})



userSchema.statics.EncryptPassword=async function(password){
  const hash =await bcrypt.hash(password,10);
  return hash;
}

module.exports=mongoose.model("User",userSchema)

