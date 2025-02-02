import Notification from "./Notification"

const LoginForm = ({loginHandler, message, handleChange, username, password}) => {
  
    return(
    <div>
      <h1>Log in to the application</h1>
      <Notification message={message}/>
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({target}) => handleChange("username", target.value)} 
        />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({target}) => handleChange("password", target.value)} 
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
    )}

export default LoginForm