import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './blog.css';
import BlogCard from './components/BlogCard';
import { get } from '../../../utils/request';

const Blog = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await get('/findAllBlog');
      const blogs = data instanceof Array && data.sort((a, b) => b.create_time - a.create_time);
      setList(blogs);
      console.log(blogs);
    }
    fetch()
      // .then(() => {
      //   // 确保滚动到正确的位置
      //   window.scrollTo(0, window.innerHeight - 60);
      // });
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
      <div className="bar card">
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