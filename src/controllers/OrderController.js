const OrderSummary = require("../models/OrderSummary")
const {User} = require("../models/userSchema")

const Checkout = async (req, res) =>{
    try {
        const UserId = req.user.id

        // items should not be blank  - checking
        const { items, totalAmount } = req.body

        if(!items || items.length == 0)
        {
            return res.status(400).json({
                message : "Cart is Empty !"
            })
        }


        // user exists or not 
       const user = await User.findById(UserId)
       if(!user) 
       {
        res.status(400).json("User not found")
       }


    //    ordersummary check

    const Order = await OrderSummary.create({
        user : UserId,
        items,
        totalAmount
    })
    res.status(200).json({
    success: true,
    message: "Order Placed Successfully",
    order: Order
    })

    } 
    // If any error occurs then
    catch (error) {
        res.status(400).json("CheckOut Failed", error.message)
    }
}

module.exports ={
    Checkout
}
