const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "About Something",
        author: "User1",
        url: "blogs.com/article1",
        likes: 5
    },
    {
        title: "New Testing",
        author: "User2",
        url: "blogs.com/article2",
        likes: 2
    },
    {
        title: "Something Else",
        author: "User1",
        url: "blogs.com/article3",
        likes: 1
    }

]

beforeEach(async () => {
    await Blog.deleteMany({})

    let newBlog = new Blog(initialBlogs[0])
    await newBlog.save()

    newBlog = new Blog(initialBlogs[1])
    await newBlog.save()

    newBlog = new Blog(initialBlogs[2])
    await newBlog.save()
})

test("there are 3 notes initially", async () => {
    const response =  await api.get("/api/blogs")
    .expect('Content-Type', /application\/json/)
    console.log(response)
    assert.strictEqual(response.body.length, 3)  
})

after(async () => {
    await mongoose.connection.close()
  })