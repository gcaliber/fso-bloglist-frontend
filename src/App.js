import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    try {
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }
    catch (exception) {
      console.log(exception)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log(exception)
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.clear()
      blogService.setToken('')
      setUser(null)
    }
    catch (exception) {
      setNotification({ message: exception.message, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log(exception)
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setNotification({ message: `a new blog ${blog.title} by ${blog.author} added`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification({ message: exception.message, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log(exception)
    }
  }

  const handleLikeUpdate = async (id, blog) => {
    const updatedBlog = await blogService.update(id, blog)
    setBlogs(blogs.map(b => updatedBlog.id === b.id ? updatedBlog : b))
  }

  const handleRemoveBlog = async ({ id, title, author }) => {

    if (window.confirm(`Really delete "${title}"?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => id !== b.id))
        setNotification({ message: `${title} by ${author} removed`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
      catch (exception) {
        console.log(exception)
        if (exception.message === 'Request failed with status code 401') {
          exception.message = 'You may only remove blogs you have added.'
        }
        setNotification({ message: exception.message, type: 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              id="username"
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              id="password"
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        <b>{user.name} logged in <button onClick={handleLogout}>logout</button></b>
      </p>

      <Togglable buttonLabelOn='create new' buttonLabelOff='cancel'>
        <h2>create new</h2>
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
      <br />

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLikes={handleLikeUpdate} handleRemove={handleRemoveBlog} />
        )}
    </div>
  )
}

export default App