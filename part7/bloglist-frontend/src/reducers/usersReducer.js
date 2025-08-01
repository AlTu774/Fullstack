import userService from '../services/user'
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers (state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer