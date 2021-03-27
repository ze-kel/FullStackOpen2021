const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const helper = require('./test.helper')

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = helper.initialUsers.map(blog => new User(blog))
    const promises = userObjects.map(blog => blog.save())
    await Promise.all(promises)
})

describe('BASIC OPERATIONS', () => {
    test('users are returned as JSON', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('expect correct number of entries', async () => {
        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(helper.initialUsers.length)
    })

    test('the first username checks', async () => {
        const response = await api.get('/api/users')

        const usernames = response.body.map(r => r.username)
        expect(usernames).toContain(helper.initialUsers[0].username)
    })

    test('we can add users', async () => {
        const newUser = { username: "newuser", password: "1337" }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const updatedUsers = await api.get('/api/users')

        expect(updatedUsers.body.length).toBe(helper.initialUsers.length + 1)
        const usernames = updatedUsers.body.map(r => r.username)
        expect(usernames).toContain(newUser.username)
    })
})


describe('WRONG INPUTS', () => {
    test('no username', async () => {
        const newUser = { password: "1337" }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response.body.message.toLowerCase()).toContain("username")

        const updatedUsers = await api.get('/api/users')
        expect(updatedUsers.body.length).toBe(helper.initialUsers.length)
    })
    test('no password', async () => {
        const newUser = { username: "kirill" }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response.body.message.toLowerCase()).toContain("password")

        const updatedUsers = await api.get('/api/users')
        expect(updatedUsers.body.length).toBe(helper.initialUsers.length)
    })
    test('short username', async () => {
        const newUser = { username: "ki", password: "kirill" }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response.body.message.toLowerCase()).toContain("username")
        expect(response.body.message.toLowerCase()).toContain("short")

        const updatedUsers = await api.get('/api/users')
        expect(updatedUsers.body.length).toBe(helper.initialUsers.length)
    })
    test('short password', async () => {
        const newUser = { username: "kirill", password: "ki" }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        expect(response.body.message.toLowerCase()).toContain("password")
        expect(response.body.message.toLowerCase()).toContain("short")

        const updatedUsers = await api.get('/api/users')
        expect(updatedUsers.body.length).toBe(helper.initialUsers.length)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
