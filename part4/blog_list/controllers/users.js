const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const allUsers = await User.find({})
    
    response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
    const content = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(content.password, saltRounds)

    const newUser = new User({
        name: content.name,
        username: content.username,
        passwordHash: passwordHash
    })

    const savedUser = await newUser.save()
    response.status(201).send(savedUser)
})

module.exports = usersRouter    