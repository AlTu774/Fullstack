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

  if ((content.title == undefined) || (content.url == undefined)) {
    response.status(400).end()

  } else {
    const blog = new Blog(content)
    const result = await blog.save()
  
    response.status(201).json(result)
  }
  })

blogsRouter.delete('/:id', async (request, response) => {
  const deleteId = request.params.id
  await Blog.findByIdAndDelete(deleteId)
  
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const changeId = request.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(changeId, request.body, {new: true})

  response.json(updatedBlog)
})

module.exports = blogsRouter