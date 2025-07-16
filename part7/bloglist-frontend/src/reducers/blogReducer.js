import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state=initialState, action) {
      state.push(action.payload)
    },
    setBlogs(state=initialState, action) {
      return action.payload
    }
  }
})

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    await blogService.addLike(blog)
    dispatch(getAllBlogs())
  }
}

export const removeBlog = (blog, user) => {
  return async dispatch => {
    await blogService.remove(blog, user)
    dispatch(getAllBlogs())
  }
}

export const { addBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer