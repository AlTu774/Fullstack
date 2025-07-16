import Togglable from './Togglable'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const handleLikeClick = async () => {
    dispatch(addLike(blog))
  }

  const handleRemoveClick = async () => {
    dispatch(removeBlog(blog, user))
  }

  const blogStyle = {
    outline: 'black',
    outlineStyle: 'solid',
    padding: '10px',
    marginTop: '10px',
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='testBlog'>
        {blog.title} {blog.author}
      </div>
      <div>
        <Togglable buttonLabel={['view', 'hide']} ref={null} state={false}>
          <div data-testid='toggletest'>
            <p>{blog.url}</p>
            <p data-testid='likes'>
              {blog.likes}
              <button onClick={async () => handleLikeClick()}>like</button>
            </p>
            <p>{blog.user.username}</p>
            {user.username === blog.user.username ? (
              <button onClick={async () => handleRemoveClick()}>remove</button>
            ) : null}
          </div>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
