import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (blog) => {
  const copyBlog = {...blog}
copyBlog.likes = copyBlog.likes+1
  try {
    const request = await axios.put(baseUrl+'/'+blog.id, {likes:copyBlog.likes})
    return (request.data)
  } catch (exception) {
    return(exception.response.status)
  }
}

export default { 
  setToken,
  getAll,
  create,
  addLike
}