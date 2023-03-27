const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    try {
        if(token){
            let decoded=jwt.verify(token,"bruce")
            if(decoded){
                req.body.userId=decoded.userId
                next()
            }else{
                res.status(400).send({message:"Please login"})
            }
        }else{
            res.status(400).send({message:"Please login"})
        }
    } catch (error) {
        
    }
}

module.exports={auth}