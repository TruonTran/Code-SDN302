const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {

    try {

        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({ message: "No token" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        req.user = user
        next()

    } catch (err) {

        res.status(401).json({ message: "Invalid token" })

    }

}

module.exports = authMiddleware