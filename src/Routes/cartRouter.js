const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/userSchema")
const router = express.Router()
const { isLoggedIn } = require("../middleware/isLoggedIn")

router.post("/cart", isLoggedIn, async (req, res) => {
  const { productId, quantity = 1 } = req.body

  if (!productId) {
    throw new Error("Product ID is required")
  }

  const user = await User.findById(req.user._id)

  const item = user.cart.find(
    item => item.product.toString() === productId
  )

  if (item) {
    item.quantity += quantity
  } else {
    user.cart.push({ product: productId, quantity })
  }

  await user.save()
  res.json({ success: true, cart: user.cart })
})

module.exports = { cartRouter: router }
