import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotesStore = useSelector(state => state.sort((a,b) => b.votes-a.votes))
  let anecdotes = anecdotesStore.sort((a, b) => a.value - b.value)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: {
        id: id
      }
    })
  }

  const createHandler = (event) => {
    event.preventDefault()
    dispatch({
      type: 'NEW_ANECDOTE',
      payload: {
        content: event.target.content.value
      }
    })
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
      <h2>create new</h2>
      <form onSubmit={createHandler}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App