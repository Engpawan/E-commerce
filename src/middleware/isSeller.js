const isSeller = (req, res, next) =>{
    try{
        if(req.userSchema.role != "Seller")
        {
           res.status(400).json({error: "Seller Access Only !"})

        }
        next()
    }
    catch(error)
    {
        throw new Error({error : error.message})
    }
}

module.exports ={
    isSeller
}
