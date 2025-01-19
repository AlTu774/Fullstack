const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/',  async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })

     response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const content = request.body
  const users = await User.find({})
  const user = users[0]
  content.user = user.id

  if (content.likes == undefined) {
    content.likes = 0
  }

  if ((content.title == undefined) || (content.url == undefined)) {
    response.status(400).end()

  } else {
    const blog = new Blog(content)
    const result = await blog.save()
    
    const blogs = await Blog.find({})
    const newestBlog = blogs[blogs.length-1]
    user.blogs = user.blogs.concat(newestBlog.id)
    await user.save()
  
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