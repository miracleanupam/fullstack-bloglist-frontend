import React, { useState } from 'react';

const Blog = ({ blog, increaseLikeByOne }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = () => {
    console.log('like button press vayo');
    console.log(blog);
    const newData = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    console.log(newData);
    increaseLikeByOne(newData);
  }

  return (
    <div className='blogPost'>
      {blog.title} {blog.author} <button type='button' onClick={toggleExpanded}>{isExpanded ? 'hide' : 'view'}</button>
      { isExpanded ? (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} <button type='button' onClick={handleLike}>Like</button></p>
          <p>{blog.user.name}</p>
        </div>
        ) : (<div></div>)}
    </div>
  );
};

export default Blog;
