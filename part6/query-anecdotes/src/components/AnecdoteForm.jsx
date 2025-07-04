import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import MessageContext from "../messageContext"

const AnecdoteForm = () => {
  const [message, dispatch] = useContext(MessageContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn:  createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content: content,
      votes: 0
    })
    dispatch({
      type: "SET",
      payload: 'added anecdote "'+content+'"'
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
