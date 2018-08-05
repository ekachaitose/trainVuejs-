const express = require('express')
const router = express.Router()
const sequelize = app.get('sequelize')
const User = sequelize.models['user']
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.get('/', (req, res) => {

})

router.post('/', async (req, res) => {
    const { username, password } = req.body
    // console.log(username, password, hashPassword)
    const hashPassword = bcrypt.hashSync(password)
    try {
        const u = await User.create({
            username,
            password: hashPassword
        })
        res.status(201).json(username).end()

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const u = await User.findOne({
            where: {
                username
            }
        })

        if (!u) {
            res.status(401).end()
            return
        }
        if (bcrypt.compareSync(password, u.password)) {
            const token = jwt.sign({ username: u.username }, 'SECRET', {
                expiresIn: 60
            })
            res.status(200).json({ token: token })
        }
        else {
            res.status(401).end()
        }

    } catch (err) {
        res.status(500).end()
    }
})
module.exports = router