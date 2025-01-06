const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_test_helper')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})

    let newBlog = new Blog(helper.initialBlogs[0])
    await newBlog.save()

    newBlog = new Blog(helper.initialBlogs[1])
    await newBlog.save()

    newBlog = new Blog(helper.initialBlogs[2])
    await newBlog.save()
})


test("there are 3 notes initially", async () => {
    const response =  await api.get("/api/blogs")
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 3)  
})

test("notes contain unique identifier id", async () => {
    const response = await api.get("/api/blogs")
    const blogs = response.body

    blogs.forEach(blog => {
        assert.notDeepEqual(blog.id, undefined)
    })
})

after(async () => {
    await mongoose.connection.close()
  })