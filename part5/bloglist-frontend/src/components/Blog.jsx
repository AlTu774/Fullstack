import Togglable from "./Togglable"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs }) => {
  const handleClick = async() => {
    await blogService.addLike(blog)
    const blogs = await blogService.getAll()
    setBlogs( blogs )
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
          <p>{blog.likes}<button onClick={async() => handleClick()}>like</button></p>
          <p>{blog.user.username}</p>
        </Togglable>
      </div>
    </div> 
  )
}

export default Blog