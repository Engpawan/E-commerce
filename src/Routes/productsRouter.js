const express = require("express")
const productList = require("../modals/productList")
const router = express.Router()

router.post('/Product', async (req, res) =>{
    try {
        const{ name, price, description, quantity, image, category } = req.body
        if (!name) {
            return res.status(400).json({ error: "Please Provide Product Name." })
        }
        if (!price) {
            return res.status(400).json({ error: "Please Provide Price of the Product." })
        }
        if (!description) {
            return res.status(400).json({ error: "Give some lines of Description." })
        }
        if (!quantity) {
            return res.status(400).json({ error: "Please Provide the Total quantity of the Product." })
        }
        if (!image) {
            return res.status(400).json({ error: "Mention the image of the following Product." })
        }
        if (!category) {
            return res.status(400).json({ error: "Which Category Belongs to..." })
        }
        
        let obj = {name, price, description, quantity, image, category}

        const createProduct = await productList.create(obj)


        res.status(200).json(obj)
    } 
    
    catch (error) {
        res.status(400).json({error : error.message})
    }
})



router.get('/Product/:id', async(req, res)=>{
    try {
        const{id} = req.params
        const foundProduct = await productList.findById(id)
        if(!foundProduct)
        {
            throw new Error("PRODUCT NOT FOUND...!")
        }
        res.status(200).json(foundProduct)
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
})



router.delete('/Product/:id', async(req, res) =>{
    try {
        const{id} = req.params
        const deletedProduct = await productList.findByIdAndDelete(id)
        res.status(200).json("Successfully delleted the Product and updated ", deletedProduct)
    } catch (error) {
        res.status(400).json({erro: error.message})
    }
})



router.patch('/Product/:id', async (req, res) => {
    try {
        const { id } = req.params
       const{ name, price, description, quantity, image, category } = req.body
       const Update = await productList.findById(id)
       if(!Update)
       {
        throw new Error("PRODUCT NOT FOUND")
       }
       if(quantity < 1)
       {
        throw new Error("Quantity must be Greater than 0")
       }

        const updatedProduct = await productList.findByIdAndUpdate(id, {name, price, description, quantity, image, category})
        res.status(200).json("Product Updated Successfully.." , updatedProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = {
    productRouter: router
}

