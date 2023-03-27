const mongoose=require("mongoose")


const postSchema=mongoose.Schema({
    title :String,
    body :String,
    device: String,
    no_of_comments : Number,
    userId: String
})

const PostModule=mongoose.model("post",postSchema)

module.exports={PostModule}