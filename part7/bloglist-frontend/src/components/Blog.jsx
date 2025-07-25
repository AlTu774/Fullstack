import { addLike, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogID = useParams().id
  const blogs = useSelector(state => state.blog)
  const blogL = blogs.filter(blog => blog.id === blogID)
  let blog = null

  if (blogL.length === 0) {
    return (<div></div>)
  } else {
    blog = blogL[0]
  }

  const handleLikeClick = async () => {
    dispatch(addLike(blog))
  }

  const handleRemoveClick = async () => {
    dispatch(removeBlog(blog, user))
    navigate('/')
  }
  console.log(blog, 'blog')

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <p>{blog.url}</p>
      <p data-testid='likes'>
        {blog.likes}
        <button onClick={async () => handleLikeClick()}>like</button>
      </p>
      <p>added by {blog.user.username}</p>
      {user.username === blog.user.username ? (
        <button onClick={async () => handleRemoveClick()}>remove</button>
      ) : null}
      <h2>comments</h2>
      {blog.comments.map(comment => {
        console.log(comment)
        return (
          <li key={comment.id}>{comment.text}</li>
        )
      })}
    </div>
  )
}

export default Blog
