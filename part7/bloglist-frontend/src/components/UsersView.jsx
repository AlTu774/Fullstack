import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead
} from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>  </TableCell>
              <TableCell>
              created blogs
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user) => {
              const link = '/users/'+user.id
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link style={padding} to={link}>{user.username}</Link>
                  </TableCell>
                  <TableCell>
                    {user.blogsL}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


export default UsersView