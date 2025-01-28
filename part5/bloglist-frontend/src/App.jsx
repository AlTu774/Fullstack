import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser= window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      setUser(user)

      const loggedUser = JSON.stringify(user)
      window.localStorage.setItem('loggedUser', loggedUser)

      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return(
    <div>
      <h1>Log in to the application</h1>
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({target}) => setUsername(target.value)} 
        />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({target}) => setPassword(target.value)} 
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>)
    }

  return (
    <div>
    {user === null ?
      loginForm() :
      <div>
      <h2>blogs</h2>
      <p>{user.username} has logged in <button onClick={logoutHandler}>logout</button> </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
    </div>
  )
}

export default App