const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    if (!req.headers['authorization']) {
        res.status(401).end()
        return
    }
    const authToken = req.headers['authorization']
    try {
        jwt.verify(authToken, 'SECRET')
        next()
    } catch (error) {
        res.status(403).json({error:error.message}).end()
    }
}