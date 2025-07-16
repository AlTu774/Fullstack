import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import PropTypes from 'prop-types'
import { setMessage, resetMessage } from './reducers/notificationReducer'
import { getAllBlogs, createBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const toggleRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
    dispatch(getAllBlogs())
  }, [])

  const logoutHandler = async () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  const loginHandler = async (event, username, password) => {
    event.preventDefault()
    const result = await loginService.login({ username, password })

    if (result === 401) {
      dispatch(setMessage({
        text: 'wrong username or password', color: 'red'
      }))
      setTimeout(() => {
        dispatch(resetMessage())
      }, 5000)
    } else {
      setUser(result.data)

      const loggedUser = JSON.stringify(result.data)
      window.localStorage.clear()
      window.localStorage.setItem('loggedUser', loggedUser)
      blogService.setToken(result.data.token)
    }
  }

  const createHandler = async (newBlog) => {
    dispatch(createBlog(newBlog))

    dispatch(setMessage({
      text: `a new blog ${newBlog.title} added by ${user.username}`,
      color: 'green'
    }))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)

    dispatch(getAllBlogs())
  }

  LoginForm.propTypes = {
    loginHandler: PropTypes.func.isRequired,
  }

  return (
    <div>
      {user === null ? (
        <LoginForm loginHandler={loginHandler} />
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.username} has logged in{' '}
            <button onClick={logoutHandler}>logout</button>{' '}
          </p>
          <Togglable
            buttonLabel={['create', 'cancel']}
            ref={toggleRef}
            state={true}
          >
            <CreateBlogForm createHandler={createHandler} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App