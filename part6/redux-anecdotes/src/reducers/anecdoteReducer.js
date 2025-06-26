const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE': {
      const rightA = state.find(a => a.id == action.payload.id)
      const newVotes = rightA.votes+1
      const changedAnecdote = {
        ...rightA,
        votes: newVotes
      }
      return state.map(anecdote => anecdote.id !== rightA.id ? anecdote : changedAnecdote )
    }
    case 'NEW_ANECDOTE': {
      const newAnecdote = {
        content: action.payload.content,
        id: getId(),
        votes: 0
      }
      return state.concat(newAnecdote)
    }
  }
  console.log('state now: ', state)
  console.log('action', action)

  return state
}

export const filterReducer = (state = null, action) => {
  switch(action.type) {
    case 'TYPE': {
      return action.payload.text
    }
    default:
      return state
  }
}

export const filterAnecdotes = (text) => {
  return {
    type: 'TYPE',
    payload: {
      text: text
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id: id
    }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content: content
    }
  }
}