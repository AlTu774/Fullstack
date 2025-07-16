import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    resetUser(state, action) {
      return initialState
    }
  }
})

export const { setUser, resetUser } = userSlice.actions

export const loginUser = (user) => {
  return async dispatch => {
    const result = await loginService.login(user)
    if (result.status === 200) {
      await blogService.setToken(result.data.token)
      dispatch(setUser(result.data))
    } else {
      dispatch(setUser('failed'))
    }
  }
}

export const logoutUser = (user) => {
  return async dispatch => {
    blogService.setToken('')
    dispatch(resetUser())
  }
}

export default userSlice.reducer