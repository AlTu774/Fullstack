import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({text:'', color:''})

  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs ) 
    )
  }, [])


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }


  const loginHandler = async (event) => {
    event.preventDefault()
    const result = await loginService.login({username, password})

    if (result == 401) {
      setMessage({text:'wrong username or password', color:"red"})
      setTimeout(() => {
        setMessage({text:'', color:''})
      }, 5000)
    } else {
    setUser(user)

    const loggedUser = JSON.stringify(user)
    window.localStorage.clear()
    window.localStorage.setItem('loggedUser', loggedUser)

    blogService.setToken(user.token)
    setUsername('')
    setPassword('')
    }
  }

  const createHandler = async (event) => {
    event.preventDefault()

    const newBlog = {
      title:title,
      author:author,
      url:url
    }

    const result = await blogService.create(newBlog)
    const newBlogs = blogs.concat(result)
    setBlogs(newBlogs)
    setAuthor('')
    setTitle('')
    setUrl('')
    setMessage({text:`a new blog ${result.title} added by ${user.username}`, color:"green"})
    setTimeout(() => {
      setMessage({text:'', color:''})
    }, 5000)
  }

  const loginForm = () => {
    return(
    <div>
      <h1>Log in to the application</h1>
      <Notification message={message}/>
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
    </div>
    )}


  const createBlog = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={createHandler}>
          <div>
            title
            <input
            type='text'
            value={title}
            name="title"
            onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
            type='text'
            value={author}
            name="author"
            onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
            type='text'
            value={url}
            name="url"
            onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  } 


  return (
    <div>
    {user === null ?
      loginForm() :
      <div>
        <h2>blogs</h2>
        <Notification message={message}/>
        <p>{user.username} has logged in <button onClick={logoutHandler}>logout</button> </p>
        {createBlog()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
    </div>
  )
}

export default App