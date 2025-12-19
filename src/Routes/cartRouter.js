const express = require("express")
const router = express.Router()

router.post('/cart', async(req, res) =>{
    try {
        const productId = mongoose.Schemas.Types.ObjectId
        const{} = req.body

        if(!productId)
        {
            throw new Error("Product ID is required ")
        }

        const userId = req.user.id 

    const user = await userSchema.findById(userId)

    const itemIndex = user.cart.findIndex(
      item => item.productId.toString() === productId
    )

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity || 1
    } else {
      user.cart.push({ productId, quantity: quantity || 1 })
    }

    await user.save()

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart: user.cart
    })


    } catch (error) {
        res.status(400).json({error: error.message})
    }
})





module.exports ={
    cartRouter
}