// src/pages/blog.tsx
import React from 'react';

const Blog = () => {
  return (
    <div className="flex flex-col">
      <div style={{ position: 'absolute', top: '80px' }}>
        <p>This is the blog page...</p>
      </div>
    </div>
  );
};

Blog.getInitialProps = async () => {
  return { hideFooter: false };
};

export default Blog;
