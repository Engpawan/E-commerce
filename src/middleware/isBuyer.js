const isBuyer = (req, res, next) =>{
    try {
            if (req.user.role !== "Buyer") {
            return res.status(403).json({ error: "Buyer Access Only" })

        }

        next()
    } catch (error) {
        throw new Error({error : error.message})
    }
}


module.exports ={
    isBuyer
}