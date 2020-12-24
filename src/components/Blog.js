import React, { useState } from 'react';

const Blog = ({ blog, increaseLikeByOne, handleBlogDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = () => {
    const newData = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    increaseLikeByOne(newData);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleBlogDelete(blog.id);
    }
  }

  return (
    <div className='blogPost'>
      {blog.title} {blog.author} <button type='button' onClick={toggleExpanded}>{isExpanded ? 'hide' : 'view'}</button>
      { isExpanded ? (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} <button type='button' onClick={handleLike}>Like</button></p>
          <p>{blog.user.name}</p>
          <button type='button' onClick={handleDelete}>Delete</button>
        </div>
        ) : (<div></div>)}
    </div>
  );
};

export default Blog;
