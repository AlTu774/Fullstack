import { createSlice } from '@reduxjs/toolkit'
const initialState= null

const filterSlice = createSlice({
  name:'filter',
  initialState,
  reducers: {
    filterAnecdotes(state = null, action) {
      if (action.type == 'filter/filterAnecdotes') {
        return action.payload
        }
      return state
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer