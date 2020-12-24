import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification';
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });

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

  const setNewMessage = (msg) => {

    setMessage(msg);
    setTimeout(() => {
      setMessage({
        text: "",
        isError: false,
      })
    }, 5000);
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    await loginService.logout();
    setUser(null);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const addBlog = async (event) => {
    try {
      event.preventDefault();
      const blogObj = {
        title, url, author
      };
  
      const newBlog = await blogService.create(blogObj);
      setBlogs(blogs.concat(newBlog));
      setNewMessage({ text: 'New Blog Added Successfully', isError: false });
    } catch (e) {
      setNewMessage({ text: 'Something went wrong', isError: true });
    }
    
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
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title:
      <input
        value={title}
        onChange={handleTitleChange}
        name='title'
      />
      <br></br>
      Author:
      <input
        value={author}
        onChange={handleAuthorChange}
        name='author'
      />
      <br></br>
      Url:
      <input
        value={url}
        onChange={handleUrlChange}
      />
      <br></br>
      <button type='submit'>Save</button>
    </form>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
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
        setNewMessage({ text: 'Could not login. Try again!', isError: true });
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification msg={message} />

      {user === null ?
        loginForm()
        : ( <div>
          <p>Loggin in as {user.name}</p>

          {blogForm()}
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