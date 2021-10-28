import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './blog.css';
import BlogCard from './components/BlogCard';
import Calendar from '../../../components/calendar/Calendar';
import { get } from '../../../utils/request';
import EventEmitter from '../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../utils/events';
import LocalStorage from '../../../utils/LocalStorage';

const Blog = (props) => {
  const [list, setList] = useState([]);
  const [tags, setTags] = useState([]);

  // 向服务器请求数据
  const fetchBlogs = async () => {
    const { data } = await get('/findAllBlog');
    const blogs = data instanceof Array && data.sort((a, b) => b.create_time - a.create_time);
    setList(blogs);
    LocalStorage.set('blogs', blogs, 7200000); // 设置数据有效时长为两小时
  }

  const fetchTags = async () => {
    const { data } = await get('/getTags');
    setTags(data.filter(i => i !== null));
  }

  const loadHandler = () => {
    fetchBlogs(); // 页面刷新则重新请求数据
  }

  useEffect(() => {
    // 发布事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: <h1>归档</h1>, backdrop: true });

    // 如果本地有数据缓存则不向服务器请求数据
    const blogs = LocalStorage.get('blogs');
    if (blogs) setList(blogs);
    else fetchBlogs();

    fetchTags();

    window.addEventListener('load', loadHandler);
    return () => {
      window.removeEventListener('load', loadHandler);
    }
  }, []);

  return (
    <div className="blog container">
      <div className="blogs">
        {/* <div className="top-line"></div> */}
        <h2>Article<div className="bottom-line"></div></h2>
        
        {
          list.map((blog, index) =>
            <BlogCard
              id="card"
              { ...blog }
              key={ uuidv4() }
              animate
              // right={index % 2 === 0}
            />
          )
        }
      </div>
      
      <div className="bar">
        <h2>Tags<div className="bottom-line"></div></h2>
        <ul className="card">
          {
            tags.map(tag => {
              return <li key={uuidv4()}>
                {  tag.toString() }
              </li>
            })
          }
        </ul>
        <Calendar></Calendar>
      </div>
    </div>
  )
}

export default Blog;