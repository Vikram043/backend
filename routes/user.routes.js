const express=require("express")
const { UserModule } = require("../module/user.module")
const userRoute=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

userRoute.post("/register" ,async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    const use=await UserModule.findOne({email})
    try {
        if(!use){
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(400).send({message:err.message})
                }else{
                    const user=new UserModule({name,email,gender,password:hash,age,city,is_married})
                    await user.save()
                    res.status(200).send({message:"User Registerd"})
                }
            })
        }else{
            res.status(400).send({message:"User already exist, please login"})
        }
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

userRoute.post("/login" ,async(req,res)=>{
    const {email,password}=req.body
    const use=await UserModule.findOne({email})
    try {
        if(use){
            bcrypt.compare(password,use.password,async(err,decoded)=>{
                if(decoded){
                    let token=jwt.sign({userId:use.id},"bruce",{expiresIn:"1h"})
                    res.status(200).send({message:"Logged In","token":token})
                }else{
                    res.status(400).send({message:"Wrong Creditionals"})
                }
            })
        }else{
            res.status(400).send({message:"User not found"})
        }
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})
module.exports={userRoute}









