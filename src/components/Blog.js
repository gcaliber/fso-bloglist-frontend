import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikes, handleRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showDetails = { display: detailsVisible ? '' : 'none' }
  const showRemoveButton = { display: user.id === blog.user.id ? '' : 'none' }

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

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button
        onClick={toggleVisibility}>{detailsVisible ? 'hide' :'view'}
      </button>
      <div style={showDetails} className='blog__details'>
        {blog.url}<br />
          likes {blog.likes} <button id='like' onClick={addLike}>like</button><br />
        {blog.user.name}<br />
        <div style={showRemoveButton}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog