const express = require('express')
const router = express.Router()

const Food = require('../models/Food')

router.get('/foods', async (req, res) => {

    const foods = await Food.find().populate('nation')

    res.render('foods', { foods })

})

router.post('/foods', async (req, res) => {

    const food = new Food(req.body)

    await food.save()

    res.redirect('/page/foods')

})

router.get('/foods/delete/:id', async (req, res) => {

    await Food.findByIdAndDelete(req.params.id)

    res.redirect('/page/foods')

})

module.exports = router