import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createMessage } from '../reducers/notificationReducer'
import Notification from '../components/Notification'

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
    const text = "you voted '"+anecdote.content+"'"
    dispatch(createMessage(text))
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