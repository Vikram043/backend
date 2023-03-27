const express=require("express")
const { connection } = require("./db")
const { postRoute } = require("./routes/post.routes")
const { userRoute } = require("./routes/user.routes")
const cors=require("cors")
const { auth } = require("./middleware/auth.midddleware")
const app=express()
app.use(express.json())

app.use(cors())
app.use("/users",userRoute)

app.use("/posts",auth,postRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Unbale to connect to DB")
        console.log(error)
    }
})