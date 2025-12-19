const isBuyer = (req, res, next) =>{
    try {
        if(req.userSchema.role != "Buyer")
        {
            res.status(400).json({error: "Buyer Access Only !"})
        }

        next()
    } catch (error) {
        throw new Error({error : error.message})
    }
}


module.exports ={
    isBuyer
} 