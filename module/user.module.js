const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name : String,
    email :String,
    gender :String,
    password :String,
    age :Number,
    city :String,
    is_married :Boolean
})

const UserModule=mongoose.model("User",userSchema)

module.exports={UserModule}