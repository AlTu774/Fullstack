import axios from 'axios'

const login = async (credentials) => {
  try {
    const response = await axios.post('/api/login', credentials)
    return response
  } catch (exception) {
    return exception.response.status
  }
}

export default { login }
