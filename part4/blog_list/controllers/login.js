const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const content = request.body
    const username = content.username

    let user = await User.findOne({ username })
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(content.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'invalid username or password' })
    }

    user = {
        username: user.username,
        id: user.id
    } 
  
    const token = jwt.sign(user, process.env.SECRET)
    response.status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter