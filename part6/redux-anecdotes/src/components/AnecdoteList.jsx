import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Notification from '../components/Notification'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const currentFilter =  useSelector(state => state.filter)
  const anecdotesStore =
   useSelector(state => {
    if (currentFilter) {
      return state.anecdote.filter(a => a.content.toLowerCase().includes(currentFilter.toLowerCase()))
    }
    return state.anecdote
  })
  const anecdotesSCopy = [...anecdotesStore] 
  let anecdotes = anecdotesSCopy.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()
  
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList