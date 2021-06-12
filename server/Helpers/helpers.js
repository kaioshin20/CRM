const User=require("../models/userModels")

module.exports={
    firstUpper:(username)=>{
        const name=username.toLowerCase();
        return name.charAt(0).toUpperCase()+name.slice(1);

    },
    lowerCase:(str)=>{
        return str.toLowerCase();
    },
    capitalize:(str)=>{
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

    }
}
