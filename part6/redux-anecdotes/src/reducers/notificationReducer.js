import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state = initialState, action) {
      if (action.type == 'notification/notification') {
        return action.payload
        }
      return state
    }
  }
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer