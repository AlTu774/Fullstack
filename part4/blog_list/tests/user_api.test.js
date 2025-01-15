const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcyrpt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe("one user in database initially", () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcyrpt.hash("pass123",10)
        const firstUser = new User({
            name: "User11",
            username: "first123",
            passwordHash: passwordHash
        })

        await firstUser.save()
    })


    describe("viewing users", () => {
        test("GET request sends the user in database", async () => {
            const response = await api.get('/api/users')
            .expect('Content-Type', /application\/json/)

            const user = response.body[0]

            assert.equal("first123", user.username)
        })
    })


    describe("adding new users", () => {
        test("when a new user is added successfully, the new user info is returned", async () => {
            const newUser = {
                name: "newbie1",
                username: "2nd123",
                password: "newpass1223"
            }

            const response = await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            const returnedUser = response.body

            assert.deepEqual({ name: newUser.name, username: newUser.username},
                {name: returnedUser.name, username: returnedUser.username})
        })

        test("a new added user is saved to the database", async () => {
            const newUser = {
                name: "newbie1",
                username: "2nd123",
                password: "newpass1223"
            }

            await api.post('/api/users').send(newUser)

            const response = await api.get('/api/users')
            const users = response.body

            assert.equal(users.length, 2)

            const newestUser = users[users.length-1]

            assert.deepEqual({ name: newUser.name, username: newUser.username},
                {name: newestUser.name, username: newestUser.username})
        })

        test("if new created user doesn't have an unique username, error is returned", async () => {
            const newUser = {
                name: "newbie1",
                username: "first123",
                password: "newpass1223"
            }

            await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/users')
            const users = response.body

            assert.equal(users.length, 1)
        })

        test("new user's password or username being shorter than 3 letters causes error", async () => {
            const newUser1 = {
                name: "newbie1",
                username: "us",
                password: "newpass1223"
            }

            await api.post('/api/users')
            .send(newUser1)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            
            let response = await api.get('/api/users')
            let users = response.body

            assert.equal(users.length, 1)

            const newUser2 = {
                name: "newbie2",
                username: "first123",
                password: "11"
            }

            await api.post('/api/users')
            .send(newUser2)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            response = await api.get('/api/users')
            users = response.body

            assert.equal(users.length, 1)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
  })