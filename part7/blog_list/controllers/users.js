const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const allUsers = await User.find({}).populate("blogs", { title:1, url:1, author:1 })
    
    response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
    const content = request.body

    if ((content.username.length < 3) || (content.password.length < 3)) {
        response.status(400).json({ error: 'username or password is too short' })
        return
    }

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