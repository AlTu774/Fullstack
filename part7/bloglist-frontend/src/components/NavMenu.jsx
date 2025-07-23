import { Link } from 'react-router-dom'

const NavMenu = ({ user, logoutHandler }) => {
  const style = {
    background: 'lightgray',
    padding: '5px',
    border: 'lightgray'
  }

  return (
    <div style={style}>
      <Link to={'/blogs'}> blogs </Link>
      <Link to={'/users'}> users </Link>
      {user.username} has logged in{' '}
      <button onClick={logoutHandler}>logout</button>{' '}
    </div>
  )
}

export default NavMenu