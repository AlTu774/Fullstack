import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createMessage(state = initialState, action) {
      return action.payload
    },
    removeMessage(state = initialState, action) {
      return null
    }
  }
})

export const { createMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer