const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('entries', { url: 1, title: 1, author: 1, id: 1 })
    response.json(users)
})



usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.username || !body.password) {
        response.status(400).send({ message: "Must provide both username and password" })
    }
    if (body.username.length < 3) {
        response.status(400).send({ message: "Username too short" })
    }
    if (body.password.length < 3) {
        response.status(400).send({ message: "Password too short" })
    }

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter