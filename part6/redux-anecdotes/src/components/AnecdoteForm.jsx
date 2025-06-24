import useDispatch from 'react-redux'
import createAnecdote from './reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const createHandler = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.content.value))
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