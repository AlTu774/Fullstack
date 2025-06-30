import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
        id: action.payload.id,
        content: action.payload.content,
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer