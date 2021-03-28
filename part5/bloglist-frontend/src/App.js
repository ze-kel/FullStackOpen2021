import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  const sortedblogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e)
      if (e.message.includes('401')) {
        handleMessage('Failed to authorize. Wrong login and/or password')
      }
    }
  }

  const handleLike = async (post) => {
    try {
      post.likes += 1
      const response = await blogService.update(post.id, post)
      const newblogs = blogs.map((item) =>
        item.id === post.id ? response : item
      )
      setBlogs(newblogs)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDelete = async (post) => {
    try {
      post.likes += 1
      await blogService.remove(post.id)
      const newblogs = blogs.filter((i) => i.id !== post.id)
      setBlogs(newblogs)
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('')
    window.localStorage.removeItem('loggedappUser')
    setUser(null)
  }

  const createBlog = async (entry) => {
    try {
      const newOne = await blogService.create(entry)
      setBlogs([...blogs, newOne])
      handleMessage(newOne.title + 'has been created')
      blogFormRef.current.toggleVisibility()
    } catch (e) {
      console.log(e)
    }
  }

  const handleMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <h2 id="importantMessage">{errorMessage}</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} is logged in</p>
          <button onClick={handleLogout}>Log out</button>
          {blogForm()}
          {sortedblogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikeFunc={handleLike}
              handleDeletionFunc={handleDelete}
              currentUser={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
