import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, getAllBlogs } from '../reducers/blogReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'
import { useRef } from 'react'

const BlogsView = () => {
  const dispatch = useDispatch()
  const toggleRef = useRef()
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const blogStyle = {
    outline: 'black',
    outlineStyle: 'solid',
    padding: '10px',
    marginTop: '10px',
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


  return (
    <div>
      <Togglable
        buttonLabel={['create', 'cancel']}
        ref={toggleRef}
        state={true}
      >
        <CreateBlogForm createHandler={createHandler} />
      </Togglable>
      {blogs.map((blog) => {
        const url = '/blogs/'+blog.id
        return (
          <div style={blogStyle} key={blog.id}>
            <Link to={url}>{blog.title} {blog.author}</Link>
          </div>
        )
      })
      }
    </div>
  )
}

export default BlogsView