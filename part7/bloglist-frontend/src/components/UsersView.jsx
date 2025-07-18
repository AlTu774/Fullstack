import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams
} from 'react-router-dom'

const UsersView = () => {
  const users = useSelector(state => state.users)
  const allUsers = users.map((user) => {
    return {
      ...user,
      blogsL: user.blogs.length
    }
  })
  const padding = {
    padding: 5
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>created blogs</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => {
            const link = '/users/'+user.id
            return (
              <tr key={user.id}>
                <td>
                  <Link style={padding} to={link}>{user.username}</Link>
                </td>
                <td>
                  {user.blogsL}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView