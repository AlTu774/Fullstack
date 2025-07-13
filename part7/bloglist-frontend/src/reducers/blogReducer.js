const initialState = []

const blogReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'GET':
    return action.payload
  case 'ADD':
    return state.concat(action.payload)
  default:
    return state
  }
}

export const setBlogs = (blogs) => {
  console.log(blogs)
  return {
    type: 'GET',
    payload: blogs
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD',
    payload: blog
  }
}

export default blogReducer