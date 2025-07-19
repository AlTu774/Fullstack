import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogsView = () => {
  const blogs = useSelector(state => state.blog)
  const blogStyle = {
    outline: 'black',
    outlineStyle: 'solid',
    padding: '10px',
    marginTop: '10px',
  }

  return (
    <div>
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