import { useState } from 'react'

const CreateBlogForm = ({ createHandler, }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const formHandler = async (event) => {
    event.preventDefault()
    const newBlog = {
      title:title,
      author:author,
      url:url
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
          title
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm