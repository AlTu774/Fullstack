import { Link } from 'react-router-dom'
import { AppBar,
  Toolbar,
  Button
} from '@mui/material'

const NavMenu = ({ user, logoutHandler }) => {

  return (
    <AppBar position='static' sx={{ background: 'gray' }}>
      <Toolbar>
        <Button>
          <Link to={'/blogs'}> blogs </Link>
        </Button>
        <Button>
          <Link to={'/users'}> users </Link>
        </Button>
        {user.username} has logged in{' '}
        <Button onClick={logoutHandler} name='logout'>LOGOUT</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavMenu