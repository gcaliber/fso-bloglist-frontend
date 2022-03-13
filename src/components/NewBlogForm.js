import React, { useState } from 'react'

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
        <input type="text" value={title} name="title"
        onChange={({ target }) => setTitle(target.value)}
        />
    </div>
    <div>
      author
        <input type="text" value={author} name="author"
        onChange={({ target }) => setAuthor(target.value)}
        />
    </div>
    <div>
      url
        <input type="text" value={url} name="url"
        onChange={({ target }) => setUrl(target.value)}
        />
    </div>
    <button type="submit">submit</button>
    </form>
)}

export default NewBlogForm