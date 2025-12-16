require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const  productRouter  = require("./Routes/productsRouter")
const app = express()





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


app.use(express.json())
app.use('/product', productRouter)