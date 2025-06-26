import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const currentFilter =  useSelector(state => state.filter)
  const anecdotesStore = useSelector(state => {
    if (currentFilter) {
      return state.anecdote.filter(a => a.content.toLowerCase().includes(currentFilter.toLowerCase()))
    }
    return state.anecdote
  })
  let anecdotes = anecdotesStore.sort((a, b) => a.value - b.value)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList