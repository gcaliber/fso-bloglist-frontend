import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
      title
        <input type="text" value={title} name="title" className="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
      author
        <input type="text" value={author} name="author" className="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
      url
        <input type="text" value={url} name="url" className="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" className="submit" id="create-blog-button">submit</button>
    </form>
  )}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm