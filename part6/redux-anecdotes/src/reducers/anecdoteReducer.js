import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state = initialState, action) {
      const rightA = state.find(a => a.id == action.payload)
      const newVotes = rightA.votes+1
      const changedAnecdote = {
        ...rightA,
        votes: newVotes
      }
      return state.map(anecdote => anecdote.id !== rightA.id ? anecdote : changedAnecdote )
    },
    createAnecdote(state = initialState, action) {
      const newA = {
        content: action.payload,
        votes: 0
      }
      state.push(newA)
    },
    setAnecdotes(state = initialState, action) {
      return action.payload
    }
  }
})


export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer