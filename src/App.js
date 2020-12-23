import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    await loginService.logout();
    setUser(null);
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log('handlelogin ko error bata');
      console.log(e);
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      {user === null ?
        loginForm()
        : ( <div>
          <p>Loggin in as {user.name}</p>
          <button type='button' onClick={handleLogout}>Logout</button>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>)
      }
      
    </div>
  )
}

export default App