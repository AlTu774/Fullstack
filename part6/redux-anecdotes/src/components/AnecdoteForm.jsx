import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const createHandler = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.content.value))

    /*
    const newA = {
      content: event.target.content.value,
      votes: 0
    }
    anecdoteService.createAnecdote(newA).then(anecdote => dispatch(createAnecdote(anecdote)))
    */
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={createHandler}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm