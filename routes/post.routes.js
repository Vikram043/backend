const express=require("express")
const postRoute=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { PostModule } = require("../module/post.module")

postRoute.post("/add",async(req,res)=>{
    const payload=req.body
    try {
        const post=new PostModule(payload)
        await post.save()
        res.status(200).send({message:"New Post added"})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

postRoute.get("/",async(req,res)=>{
    const token=req.headers.authorization
    let decoded=jwt.verify(token,"bruce")
    try {
        if(decoded){
            const post=await PostModule.find({userId:decoded.userId})
            res.status(200).send(post)
        }else{
            res.status(400).send({message:"Please login"})
        }
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

postRoute.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    const payload=req.body
    try {
        await PostModule.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({message:`Post id: ${id} Updated`})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})
postRoute.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try {
        await PostModule.findByIdAndDelete({_id:id})
        res.status(200).send({message:`Post id: ${id} deleted`})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

module.exports={postRoute}