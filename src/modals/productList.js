const mongoose = require("mongoose")
const validate = require("validator")

const productListSchemas = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price :{
        type : Number,
        required : true,
    },
    description : {
        type : String,
        minLength : 5,
        maxLength : 25,
        required: true
    },
    quantity : {
        type: Number,
        required: false,
        minNumber : 1
    },
    image :{
        type: String,
        validate : (val)=>{
            const validURL = validate.isURL(val)

            if(!validURL)
            {
                throw new Error("Image cannot be blank")
            }
            
        },
        required: true
    },
    category:{
        type : String,
        enum : ["Electronics", "Groceries", "Fashions","Household"],
        required: true
    }
})



module.exports = mongoose.model("Product", productListSchemas)