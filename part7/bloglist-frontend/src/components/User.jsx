import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
  const userId = useParams().id
  const userL = users.filter(user => user.id === userId)
  if (userL.length === 0) {
    return null
  }
  const user = userL[0]

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs.map((blog) => {
        return(
          <li key={blog.id}>
            {blog.title}
          </li>
        )
      })}
    </div>
  )
}

export default User