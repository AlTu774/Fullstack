import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState,
  reducers: {
    updateAnecdote(state = initialState, action) {
      const changedAnecdote = action.payload
      //const rightA = state.find(a => a.id == action.payload)
      //const newVotes = rightA.votes+1
      //const changedAnecdote = {
      //  ...rightA,
      //  votes: newVotes
      //}
      //const changedAnecdote = anecdoteService.addLike(rightA.id)
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote )
    },
    appendAnecdote(state = initialState, action) {
      state.push(action.payload)
    },
    setAnecdotes(state = initialState, action) {
      return action.payload
    }
  }
})

export const { updateAnecdote, appendAnecdote ,setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  const newA = {
    content: content,
    votes: 0
  }
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(newA)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.addLike(id)
    dispatch(updateAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer