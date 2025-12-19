const mongoose = require("mongoose")



const userSchemas = new mongoose.Schema(
    {
        firstName: {
            type : String,
            minLength : 2,
            maxLength : 10,
            required : true
        },
        lastName : {
            type : String,
            minLength : 2,
            maxLength : 10,
            required : true
        },
        userName : {
            type: String,
            minLength : 2,
            maxLength : 10,
            required : true,
            unique: true,
        },
        password : {
            type: String,
            required : true
        },
        profilePicture :{
            type : String,
            required : false,
        },
        role:{
            type: String,
            enum:["Buyer", "Seller"],
            required: true,
        },
        phoneNumber :{
            type: String,
            minLength: 10,
            required: true
        },
        cart : []
    }
)


module.exports = mongoose.model("userInfo", userSchemas)
