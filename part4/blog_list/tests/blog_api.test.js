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

    assert.strictEqual(response.body.length, helper.initialBlogs.length)  
})

test("notes contain unique identifier id", async () => {
    const response = await api.get("/api/blogs")
    const blogs = response.body

    blogs.forEach(blog => {
        assert.notDeepEqual(blog.id, undefined)
    })
})

test("adding a blog to the database works", async () => {
    const blog = {
        title: "New Blog",
        author: "User3",
        url: "blogs.com/article2",
        likes: 2
    }
    
    await api
    .post("/api/blogs")
    .send(blog)

    const response = await api.get("/api/blogs")
    
    assert.strictEqual(response.body.length, helper.initialBlogs.length+1)  
})

test("the right blog gets added to the database", async () => {
    const blog = {
        title: "New Blog",
        author: "User3",
        url: "blogs.com/article2",
        likes: 2
    }
    
    await api
    .post("/api/blogs")
    .send(blog)

    const response = await api.get("/api/blogs")
    const newestBlog = response.body[response.body.length-1]

    assert.equal(newestBlog.title, blog.title)
    assert.equal(newestBlog.author, blog.author)
    assert.equal(newestBlog.url, blog.url)
    assert.equal(newestBlog.likes, blog.likes)
})

test("if added blog doesn't have likes -property then likes is 0", async () => {
    const blog = {
        title: "New Blog",
        author: "User3",
        url: "blogs.com/article4"
    }

    await api
    .post("/api/blogs")
    .send(blog)
    
    const response = await api.get("/api/blogs")
    const newestBlog = response.body[response.body.length-1]

    assert.deepEqual(newestBlog.likes, 0)
})

test("a blog without title properties will receive status code 400", async () => {
    const blogNoTitle = {
        author: "User3",
        url: "blogs.com/article2",
        likes: 2
    }

    await api
    .post("/api/blogs")
    .send(blogNoTitle)
    .expect(400)
})

test("a blog without url properties will receive status code 400", async () => {
    const blogNoURL = {
        title: "New Blog",
        author: "User3",
        likes: 3
    }

    await api
    .post("/api/blogs")
    .send(blogNoURL)
    .expect(400)
})



after(async () => {
    await mongoose.connection.close()
  })