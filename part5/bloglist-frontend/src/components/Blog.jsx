import Togglable from "./Togglable"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs, user }) => {

  const handleLikeClick = async() => {
    await blogService.addLike(blog)
    updateBlogs()
  }

  const updateBlogs = async() => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    setBlogs( blogs )
  }

  const handleRemoveClick = async() => {
    await blogService.remove(blog, user)
    updateBlogs()
  }

  const blogStyle = {
    outline: "black",
    outlineStyle: "solid",
    padding: "10px",
    marginTop: "10px"
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <div>
        <Togglable buttonLabel={["view","hide"]} ref={null}>
          <p>{blog.url}</p>
          <p>{blog.likes}<button onClick={async() => handleLikeClick()}>like</button></p>
          <p>{blog.user.username}</p>
          {(user.username == blog.user.username) ? <button onClick={async() => handleRemoveClick()}>remove</button> : null}
        </Togglable>
      </div>
    </div> 
  )
}

export default Blog