import Notification from './Notification'
import { useState } from 'react'

const LoginForm = ({ loginHandler, message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (change, value) => {
    if (change === 'username') {
      setUsername(value)
    } else if (change === 'password') {
      setPassword(value)
    }
  }

  return(
    <div>
      <h1>Log in to the application</h1>
      <Notification message={message}/>
      <form onSubmit={(event) => loginHandler(event,username,password)}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => handleChange('username', target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => handleChange('password', target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )}

export default LoginForm