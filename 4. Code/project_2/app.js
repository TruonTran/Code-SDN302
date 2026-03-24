require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const nationRoute = require('./routes/nations')
const pageRoute = require('./routes/pages')

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

app.use('/auth', authRoute)
app.use('/api/v1/nations', nationRoute)
app.use('/page', pageRoute)

app.listen(process.env.PORT, () => {
    console.log("Server running")
})