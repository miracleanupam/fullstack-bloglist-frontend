import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [blogFormVisible, setBlogFormVisible] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  
  const [message, setMessage] = useState({ text: '', isError: false });

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  

  const addBlog = async (blogObj) => {
    try {
      const newBlog = await blogService.create(blogObj);
      setBlogs(blogs.concat(newBlog));
      setNewMessage({ text: 'New Blog Added Successfully', isError: false });
    } catch (e) {
      setNewMessage({ text: 'Something went wrong', isError: true });
    }

  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log In</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancle</button>
        </div>
      </div>
    );
  };

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : ''};
    const showWhenVisible = { display: blogFormVisible ? '' : 'none'};

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Add Blog Post</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            addBlog={addBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>Cancle</button>
        </div>
      </div>
    )
  }

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
        : (<div>
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