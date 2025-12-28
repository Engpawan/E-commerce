require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const  {productRouter}  = require("./routes/productsRouter")
const app = express()
const cp = require("cookie-parser")
const {userRouter} = require("./Routes/userRouter")
const cors = require("cors")

mongoose.connect(process.env.MONGODB_URL)
.then(() =>{
    
    console.log("DB CONNECTED")
    app.listen(process.env.PORT,() =>{
        console.log(`server is running: ${process.env.PORT}`)
    })
})
.catch((error) =>{
    console.log("DB NOT CONNECTED")
})



app.use(cp())
app.use(express.json())
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use(cors({
    origin: "",
    credentials :true
}))


