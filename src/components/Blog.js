import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    const updatedBlog = {
      user: blog.user.id,
      author: blog.author,
      url: blog.url,
      title: blog.title,
      likes: blog.likes + 1
    }
    handleLikes(blog.id, updatedBlog)
  }

  const removeBlog = () => {
    handleRemove(blog)
  }

  // change visibility of remove button so it only shows on blogs you added
  return (
    <div style={blogStyle}>
        {blog.title} {blog.author} 
        <button 
          onClick={toggleVisibility}>{detailsVisible ? 'hide' :'view'}
        </button>
        <div style={showWhenVisible}>
          {blog.url}<br />
          likes {blog.likes} <button onClick={addLike}>like</button><br />
          {blog.user.name}<br />
          <button onClick={removeBlog}>remove</button><br />
        </div>
    </div>  
  )
}
export default Blog