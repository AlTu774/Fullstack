import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationsReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import { Container } from '@mui/material'

const store = configureStore({
  reducer: {
    notification: notificationsReducer,
    blog: blogReducer,
    user: userReducer,
    users: usersReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Container>
      <App />
    </Container>
  </Provider>
)