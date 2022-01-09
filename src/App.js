import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginService from './services/login'
import Togglable from './components/Toggeable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const BlogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      setBlogs(sortByLikes(await blogService.getAll()))
    }
    fetchBlogs()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const sortByLikes = (arrayB) => {
    return arrayB.sort((a,b) => {
      if (a.likes > b.likes) return -1
      if (a.likes < b.likes) return 1
      return 0
    })
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await LoginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (error) {
      setUsername('')
      setPassword('')
      setErrorMessage('Credenciales Invalidas')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const eliminarBlog = async (id) => {
    blogService.setToken(user.token)
    await blogService.delet(id)
    setBlogs(blogs.filter(e => e.id !== id))

  }

  const listBlogs = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} clickEliminar={eliminarBlog} userId={user.id} />
      )}
    </div>
  )

  const addBlog = async (blogNew) => {
    blogService.setToken(user.token)
    const returnBlog =  await blogService.create(blogNew)
    setBlogs(blogs.concat(returnBlog))
    BlogFormRef.current.toggleVisibility()
    console.log(returnBlog)

  }

  return (
    <div>
      <Notification message={errorMessage}  type='error' />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logout}>logout </button>
          <h2>blogs</h2>
          <Togglable buttonLabel='Agregar Blog' ref={BlogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <br/>
          {listBlogs()}

        </div>
      }
    </div>
  )
}

export default App