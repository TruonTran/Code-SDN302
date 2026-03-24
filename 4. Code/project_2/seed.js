const mongoose = require('mongoose')

const Nation = require('./models/Nation')
const Food = require('./models/Food')
const User = require('./models/User')

const nations = require('./data/nations.json')
const foods = require('./data/foods.json')
const users = require('./data/users.json')

mongoose.connect('mongodb://127.0.0.1:27017/SDN302_FA25_TranCE180829')

async function seed() {

    await Nation.insertMany(nations)

    await Food.insertMany(foods)

    await User.insertMany(users)

    console.log("Data imported")

    process.exit()

}

seed()