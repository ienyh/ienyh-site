import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './blog.css';
import BlogCard from './components/BlogCard';
import { get } from '../../../utils/request';

const Blog = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await get('/findAllBlog');
      setList(res.data);
    }
    fetch();
  }, []);

  return (
    <div className="blog container">
      <div className="blogs">
        <span style={{ fontSize: '1.4rem' }}>技术博文</span>
        <div className="bottom-line"></div>
        {
          list.map(blog => <BlogCard {...blog} key={uuidv4()} />)
        }
      </div>
      <div className="bar">
        <div>hello world</div>
        <div>hello world</div>
        <div>hello world</div>
        <div>hello world</div>
        <div>hello world</div>
      </div>
    </div>
  )
}

export default Blog;