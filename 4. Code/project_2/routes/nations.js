const express = require('express')
const router = express.Router()

const Nation = require('../models/Nation')
const Food = require('../models/Food')

const auth = require('../middleware/authMiddleware')

router.get('/', async (req, res) => {

    const nations = await Nation.find()

    res.json(nations)

})

router.get('/:id', async (req, res) => {

    const nation = await Nation.findById(req.params.id)

    res.json(nation)

})

router.post('/', auth, async (req, res) => {

    const nation = new Nation(req.body)

    await nation.save()

    res.json(nation)

})

router.put('/:id', auth, async (req, res) => {

    const nation = await Nation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.json(nation)

})

router.delete('/:id', auth, async (req, res) => {

    const foods = await Food.find({ nation: req.params.id })

    if (foods.length > 0) {
        return res.send("Cannot delete nation because it has associated foods")
    }

    await Nation.findByIdAndDelete(req.params.id)

    res.send("Deleted")

})

module.exports = router