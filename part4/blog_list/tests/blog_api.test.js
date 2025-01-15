const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_test_helper')
const blog = require('../models/blog')

const api = supertest(app)

describe("testing with database that has blogs in it", () => { 
    beforeEach(async () => {
        await Blog.deleteMany({})

        let newBlog = new Blog(helper.initialBlogs[0])
        await newBlog.save()

        newBlog = new Blog(helper.initialBlogs[1])
        await newBlog.save()

        newBlog = new Blog(helper.initialBlogs[2])
        await newBlog.save()
    })

    describe("viewing blogs", () => {
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
    })

    
    describe("adding blogs", () => {
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
    })

    describe("deleting blogs", () => {
        test("deleting an existing blog returns 204", async () => {
            const response = await api.get("/api/blogs")
            const blogs = response.body
            const newestBlog = blogs[blogs.length - 1]

            await api
            .delete(`/api/blogs/${newestBlog.id}`)
            .expect(204)
        })

        test("deleting a blog from the database works", async () => {
            let response = await api.get("/api/blogs")
            let blogs = response.body
            const newestBlog = blogs[blogs.length - 1]

            await api
            .delete(`/api/blogs/${newestBlog.id}`)
            
            response = await api.get("/api/blogs/")
            blogs = response.body
            assert.equal(blogs.length, helper.initialBlogs.length-1)
        })

        test("deleting same blog twice doesn't affect database", async () => {
            let response = await api.get("/api/blogs")
            const blogs = response.body
            const newestBlog = blogs[blogs.length - 1]

            await api
            .delete(`/api/blogs/${newestBlog.id}`)

            response = await api.get("/api/blogs/")
            const blogs1 = response.body

            await api
            .delete(`/api/blogs/${newestBlog.id}`)
            .expect(204)

            response = await api.get("/api/blogs/")
            const blogs2 = response.body
            
            assert.deepEqual(blogs1,blogs2)
        })


    describe("updating blogs", () => {
        test("updating a blog in database returns it", async () => {
            const response = await api.get("/api/blogs/")
            const blogs = response.body

            const changeBlog = blogs[1]
            const newTitle = { title: "Changed Title" }
            changeBlog.title = newTitle.title

            await api
            .put(`/api/blogs/${changeBlog.id}`)
            .send(newTitle)
            .expect(changeBlog)
        })

        test("database reflects change after update", async () => {
            let response = await api.get("/api/blogs/")
            const blogs = response.body

            const newUrl = { url: "blogs.com/article10" }
            blogs[0].url = newUrl.url

            await api
            .put(`/api/blogs/${blogs[0].id}`)
            .send(newUrl)

            response = await api.get("/api/blogs/")
            const updatedBlogs = response.body
            assert.deepEqual(updatedBlogs, blogs)
        })
    })
    })
})

after(async () => {
    await mongoose.connection.close()
  })