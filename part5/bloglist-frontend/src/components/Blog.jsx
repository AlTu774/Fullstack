import Togglable from "./Togglable"

const Blog = ({ blog }) => {
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
          <p>{blog.likes}</p>
          <p>{blog.user.username}</p>
        </Togglable>
      </div>
    </div> 
  )
}

export default Blog