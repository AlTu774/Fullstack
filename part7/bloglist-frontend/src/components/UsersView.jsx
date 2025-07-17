import { useSelector } from 'react-redux'

const UsersView = () => {
  const users = useSelector(state => state.users)
  const allUsers = users.map((user) => {
    return {
      ...user,
      blogsL: user.blogs.length
    }
  })

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
            return (
              <tr key={user.id}>
                <td>
                  {user.username}
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