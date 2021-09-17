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
    <div className="blog">
      <span>123</span>
      {
        list === [] ?
          list.map(blog => <BlogCard {...blog} key={uuidv4()} />) :
          <h2>没有数据</h2>
      }
    </div>
  )
}

export default Blog;