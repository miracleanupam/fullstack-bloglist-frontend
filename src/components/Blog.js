import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='blogPost'>
      {blog.title} {blog.author} <button type='button' onClick={toggleExpanded}>{isExpanded ? 'hide' : 'view'}</button>
      { isExpanded ? (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <p>{blog.user.name}</p>
        </div>
        ) : (<div></div>)}
    </div>
  );
};

export default Blog;
