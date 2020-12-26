import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
  };

  return (
    <div className='blogPost'>
      {blog.title} {blog.author} <button className='blog-expand-toggle' type='button' onClick={toggleExpanded}>{isExpanded ? 'hide' : 'view'}</button>
      { isExpanded ? (
        <div>
          <p>{blog.url}</p>
          <p><span className='blog-likes-count'>{blog.likes}</span> <button className='blog-like' type='button' onClick={handleLike}>Like</button></p>
          <p>{blog.user.name}</p>
          <button className='blog-delete' type='button' onClick={handleDelete}>Delete</button>
        </div>
      ) : (<div></div>)}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLikeByOne: PropTypes.func.isRequired,
  handleBlogDelete: PropTypes.func.isRequired,
};

export default Blog;
