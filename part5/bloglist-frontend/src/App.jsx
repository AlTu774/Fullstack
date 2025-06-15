import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text:'', color:'' })
  const toggleRef = useRef()

  useEffect(() => {
    blogService.getAll().then(newBlogs => {
      newBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs( newBlogs )
      //if (typeof toggleRef.current !== 'undefined') {
      //toggleRef.current.toggleVisibility()
      //}
    })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(newBlogs => {
      newBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs( newBlogs )
      //if (typeof toggleRef.current !== 'undefined') {
      //toggleRef.current.toggleVisibility()
      //}
    })
  }, [])


  const logoutHandler = async() => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  const loginHandler = async (event, username, password) => {
    event.preventDefault()
    const result = await loginService.login({ username, password })

    if (result === 401) {
      setMessage({ text:'wrong username or password', color:'red' })
      setTimeout(() => {
        setMessage({ text:'', color:'' })
      }, 5000)
    } else {
      setUser(result.data)

      const loggedUser = JSON.stringify(result.data)
      window.localStorage.clear()
      window.localStorage.setItem('loggedUser', loggedUser)
      blogService.setToken(result.data.token)
      //window.location.reload()
    }
  }

  const createHandler = async (newBlog) => {
    const result = await blogService.create(newBlog)
    const newBlogs = blogs.concat(result)
    setBlogs(newBlogs)
    //toggleRef.current.toggleVisibility()
    setMessage({ text:`a new blog ${ result.title } added by ${ user.username }`, color:'green' })
    setTimeout(() => {
      setMessage({ text:'', color:'' })
    }, 5000)

    blogService.getAll().then(newBlogs => {
      newBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs( newBlogs )
      //if (typeof toggleRef.current !== 'undefined') {
      //toggleRef.current.toggleVisibility()
      //}
    })
  }

  const handleLike = async(blog) => {
    await blogService.addLike(blog)
    const blogs = await blogService.getAll()
    return blogs
  }

  const updateBlogs = async() => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    setBlogs(blogs)
  }


  LoginForm.propTypes = {
    loginHandler: PropTypes.func.isRequired
  }

  Notification.prototype = {
    message: PropTypes.object.isRequired
  }


  return (
    <div>
      {user === null ?
        <LoginForm
          message={message}
          loginHandler={loginHandler}
        />
        :
        <div>
          <h2>blogs</h2>
          <Notification message={message}/>
          <p>{user.username} has logged in <button onClick={logoutHandler}>logout</button> </p>
          <Togglable buttonLabel={['create','cancel']} ref={toggleRef} state={true}>
            <CreateBlogForm createHandler={createHandler}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} updateBlogs={updateBlogs}/>
          )}
        </div>
      }
    </div>
  )
}

export default App