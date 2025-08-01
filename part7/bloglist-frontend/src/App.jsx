import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import PropTypes from 'prop-types'
import { setMessage, resetMessage } from './reducers/notificationReducer'
import { getAllBlogs, createBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import UsersView from './components/UsersView'
import BlogsView from './components/BlogsView'
import NavMenu from './components/NavMenu'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import User from './components/User'

const App = () => {
  const toggleRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser !== null) {
      const userStorage = JSON.parse(loggedUser)
      dispatch(setUser(userStorage))
      blogService.setToken(userStorage.token)
    }
    dispatch(getAllBlogs())
  }, [])


  useEffect(() => {
    if (user === 'failed') {
      dispatch(setMessage({
        text: 'wrong username or password', color: 'red'
      }))
      setTimeout(() => {
        dispatch(resetMessage())
        dispatch(setUser(null))
      }, 5000)
    } else {
      const loggedUser = JSON.stringify(user)
      window.localStorage.clear()
      window.localStorage.setItem('loggedUser', loggedUser)
    }
  }, [user])

  useEffect(() => {
    dispatch(getAllUsers())
  }, [blogs])


  const logoutHandler = async () => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }

  const loginHandler = async (event, username, password) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
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


  const Home = () => {
    return (
      <div>
        <h1>blog app</h1>
      </div>
    )
  }

  return (
    <Router>
      {user === null || user ==='failed' ? (
        <LoginForm loginHandler={loginHandler} />
      ) : (
        <div>
          <NavMenu user={user} logoutHandler={logoutHandler} />
          <Notification />
          <Routes>
            <Route path='/users/:id' element={<User />} />
            <Route path='/' element={<Home />} />
            <Route path='/blogs/:id' element={<Blog user={user}/>} />
            <Route path='/blogs' element={<BlogsView />} />
            <Route path='/users' element={<UsersView />}/>
          </Routes>
        </div>
      )}
    </Router>
  )

}

export default App