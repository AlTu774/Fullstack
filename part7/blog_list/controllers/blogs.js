const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/',  async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })

     response.json(blogs)
  })
  

blogsRouter.post('/', middleware.userExtractor,async (request, response) => {
  const content = request.body
  const user = request.user

  if (content.likes == undefined) {
    content.likes = 0
  }

  if ((content.title == undefined) || (content.url == undefined)) {
    response.status(400).end()

  } else {
    content.user = user.id
    const blog = new Blog(content)
    const result = await blog.save()
    
    const blogs = await Blog.find({})
    const newestBlog = blogs[blogs.length-1]
    user.blogs = user.blogs.concat(newestBlog.id)
    await user.save()
  
    response.status(201).json(result)
  }
  })

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const deleteId = request.params.id
  const user = request.user
  const blog = await Blog.findById(deleteId)
  if (blog == undefined) {
    response.status(204).end()
  }

  if (blog.user == user.id) {
    await Blog.findByIdAndDelete(deleteId)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'unauthorized to delete blog' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const changeId = request.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(changeId, request.body, {new: true})
  .populate("user", { username: 1, name: 1 })

  response.json(updatedBlog)
})

module.exports = blogsRouter