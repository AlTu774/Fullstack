const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',  async (request, response) => {
    const blogs = await Blog.find({})

     response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const content = request.body
  if (content.likes == undefined) {
    content.likes = 0
  }

  const blog = new Blog(content)
  const result = await blog.save()
  
    response.status(201).json(result)
  })

module.exports = blogsRouter