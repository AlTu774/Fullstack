import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const CreateBlogForm = ({ createHandler }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const formHandler = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    await createHandler(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={formHandler}>
        <div>
          <TextField
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
          />
        </div>
        <div>
          <TextField
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
          />
        </div>
        <div>
          <TextField
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
          />
        </div>
        <Button type='submit' variant="outlined">submit</Button>
      </form>
    </div>
  )
}

export default CreateBlogForm
