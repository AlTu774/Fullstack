import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text:'',
  color:''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state=initialState, action) {
      return action.payload
    },
    resetMessage(state=initialState, action) {
      return initialState
    }
  }
})

export const { setMessage, resetMessage } = notificationSlice.actions
export default notificationSlice.reducer