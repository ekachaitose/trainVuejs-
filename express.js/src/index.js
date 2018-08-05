const express = require('express')
app = express() // declare use all file in project
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const Sequelize = require('sequelize')
const options = {
    operatorsAliases: false
}
const sequelize = new Sequelize('mysql://root@127.0.0.1/tutor4dev', options) //mysql://root:password@127.0.0.1/tutor4dev
//app.set('key','value')
app.set('sequelize', sequelize)
/*** 
* setup models
*/
require('./models/product')()
require('./models/customer')()
const User = require('./models/user')()
//User.sync({ force: true })

/**
 * setup cors
 */
const cors = require('./middlewares/cors')
const preflight = require('./middlewares/preflight')
app.use(cors, preflight)
const jwt = require('./middlewares/jwt')
/**
 * setup route
 */

app.use('/api/products', jwt, require('./routes/product'))
app.use('/api/customers', require('./routes/customer'))
app.use('/api/users', require('./routes/user'))

app.use(require('./middlewares/404'))
app.listen(3000)

console.log("app running : 3000")