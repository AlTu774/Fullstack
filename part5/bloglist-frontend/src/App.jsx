import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({text:'', color:''})
  const toggleRef = useRef()
  
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
      setUser(result.data)

      const loggedUser = JSON.stringify(result.data)
      window.localStorage.clear()
      window.localStorage.setItem('loggedUser', loggedUser)

      blogService.setToken(result.data.token)
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
    toggleRef.current.toggleVisibility()
    setMessage({text:`a new blog ${result.title} added by ${user.username}`, color:"green"})
    setTimeout(() => {
      setMessage({text:'', color:''})
    }, 5000)
  }


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
      <LoginForm 
        loginHandler={loginHandler} 
        message={message} 
      />
       :
      <div>
        <h2>blogs</h2>
        <Notification message={message}/>
        <p>{user.username} has logged in <button onClick={logoutHandler}>logout</button> </p>
        <Togglable buttonLabel={["create","cancel"]} ref={toggleRef}>
          {createBlog()}
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        )}
      </div>
    }
    </div>
  )
}

export default App