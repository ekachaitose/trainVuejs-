const express = require('express')
const router = express.Router()
const { Op } = require('Sequelize')
const sequelize = app.get('sequelize')
const Product = sequelize.models['product']


router.get('/', async (req, res) => {
    const { price = 0 } = req.query
    try {
        const result = await Product.all({
            attributes: ['id', 'product_name_en', 'price'],
            where: {
                price: {
                    [Op.lt]: price
                },
                id: {
                    [Op.gt]: 50
                }
            },
            order: [
                ['id']
                , ['product_name_en', 'DESC']
            ],
            limit: 10
        })
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message }).end()
    }
    //   
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await Product.findById(id)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message }).end()
    }
})

router.post('/', async (req, res) => {
    const product = req.body
    try {
        const p = await Product.create(product)
        res.status(201).json({ p })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const formData = req.body
    const { id } = req.params
    try {
        const result = await Product.findById(id)
        await result.update(formData)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const p = await Product.findById(id)
        await p.destroy()
        res.status(200).end()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



module.exports = router