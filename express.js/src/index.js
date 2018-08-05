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

/**
 * setup route
 */


app.get('/', (req, res) => {
    res.json([1, 2, 3, 4, 5])
})
//const router = require('./routes/product')
app.use('/api/products', require('./routes/product'))
app.use('/api/customers', require('./routes/customer'))

app.use(require('./middlewares/404'))
app.listen(3000)

console.log("app running : 3000")