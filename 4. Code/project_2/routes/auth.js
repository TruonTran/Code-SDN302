const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')

router.post('/login', async (req, res) => {

    const { name, key } = req.body

    const user = await User.findOne({ name })

    if (!user) {
        return res.send("User not found")
    }

    const isMatch = await bcrypt.compare(key, user.key)

    if (!isMatch) {
        return res.send("Wrong password")
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    )

    res.json({ token })

})

module.exports = router