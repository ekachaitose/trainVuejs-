const express = require('express')
const router = express.Router()
const sequelize = app.get('sequelize')
const Customer = sequelize.models['customer']

router.get('/', async (req, res) => {
    try {
        const result = await Customer.all()
        res.json(result)
    } catch (err) {
        res.status(401).json({ "error": err.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Customer.findById(id)
        res.json(result)
    } catch (err) {
        res.status(401).json({ "error": err.message })
    }
})

router.post('/', (req, res) => {
    //res.status(201).end()
    res.json({ "code": 200, "status": "success" })
})



module.exports = router