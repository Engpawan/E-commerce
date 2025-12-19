const userSchema = require("../modals/userSchema")
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const validate = require("validator")
const jwt = require("jsonwebtoken")


router.post('/signUp', async(req, res) =>{
    try {
        const{firstName, lastName, userName, password, profilePicture, role, phoneNumber}= req.body
        if(!firstName)
        {
            throw new Error("FirstName cannot be blank")
        }
        if(!lastName)
        {
            throw new Error("LastName cannot be blank")
        }
        if(!userName)
        {
            throw new Error("LastName cannot be blank")
        }
        if(!password)
        {
            throw new Error("Password cannot be blank")
        }
        
        const isStrongPassword = validate.isStrongPassword(password)

        if(!validate.isStrongPassword(password)) {
            throw new Error("Password should be strong")
            }

        if(!role)
        {
            throw new Error("Role cannot be blank")
        }
        if(!phoneNumber)
        {
            throw new Error("Phone Number is mandatory")
        }
        if(phoneNumber.toString().length !== 10)
        {
            throw new Error("Invalid Phone Number")
        }

        const isPresentUserName = await userSchema.findOne({userName : userName.toLowerCase()})

        if(isPresentUserName)
        {
            throw new Error("User already exist")
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await userSchema.create({firstName, lastName, userName, password : hashedPassword, profilePicture, role, phoneNumber})

        res.status(200).json(createUser)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})



router.post('/signIn', async (req, res) => {
  try {
    const { userName, password } = req.body

    if (!userName)
        { 
            throw new Error("Username cannot be blank")
        }
    if (!password){
         throw new Error("Password cannot be blank")
        }

    const userFound = await userSchema.findOne({ userName: userName.toLowerCase() })
    if (!userFound){
         throw new Error("User does not exist")
        }

    const isPasswordMatch = await bcrypt.compare(password, userFound.password)
    if (!isPasswordMatch) {
        throw new Error("Invalid password")
    }

    const token = jwt.sign({ id: userFound._id },process.env.JWT_SECRET,{ expiresIn: "5d" })

    const { firstName, lastName, userName: un, profilePicture, phoneNumber, role, cart } = userFound

    res.cookie("loginToken", token, {maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true,}).status(200).json({success: true,
      msg: "You are logged in now",
      userData: { firstName, lastName, userName: un, profilePicture, phoneNumber, role, cart }
    })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})



router.post('/SignOut', async(req, res) =>{

    res.cookie("loginToken" , null).status(200).json({Success : true , msg : "You are logout Now"})
    
})



module.exports = {
    userRouter :  router
}