import React, { useState } from 'react';

const BlogForm = ({
  addBlog,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const blogObj = {
      title, url, author
    };

    addBlog(blogObj);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
};

export default BlogForm;