import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './blog.css';
import BlogCard from './components/BlogCard';
import Calendar from '../../../components/calendar/Calendar';
import Pagination from '../../../components/pagination/Pagination';
import { get } from '../../../utils/request';
import EventEmitter from '../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../utils/events';
import LocalStorage from '../../../utils/LocalStorage';
import Notification from '../../../components/notification/index';

const Blog = () => {
  const [list, setList] = useState([]);
  const [tags, setTags] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]); // 所有博客

  // 向服务器请求数据
  const fetchBlogs = async () => {
    const { data } = await get('/findAllBlog');
    const blogs = data instanceof Array && data.sort((a, b) => b.create_time - a.create_time);
    setAllBlogs(blogs);
    setList(blogs.slice(0, 5));
    LocalStorage.set('blogs', blogs, 7200000); // 设置数据有效时长为两小时
    Notification.success({ title: '请求博客数据成功', duration: 2000 });
  }

  const fetchTags = async () => {
    try {
      const { data } = await get('/getTags');
      setTags(data.filter(i => i !== null));
      Notification.success({ title: '请求标签数据成功', duration: 2000 });
    } catch (error) {
      Notification.error({ title: '请求标签数据失败' });
    }
  }

  const loadHandler = () => {
    fetchBlogs(); // 页面刷新则重新请求数据
  }

  useEffect(() => {
    // 发布事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: <h1>归档</h1>, backdrop: false });

    // 如果本地有数据缓存则不向服务器请求数据
    const blogs = LocalStorage.get('blogs');
    if (blogs) {
      setAllBlogs(blogs);
      setList(blogs.slice(0, 5));
    }
    else fetchBlogs();

    fetchTags();

    window.addEventListener('load', loadHandler);
    return () => {
      window.removeEventListener('load', loadHandler);
    }
  }, []);

  const pageChangeHandler = (page) => {
    const { current, pageSize, total } = page;
    console.log(page);
    setList(allBlogs.slice((current - 1) * pageSize, current * pageSize));
  }

  return (
    <div className="blog container">
      <div className="blogs">
        <h2>Article<div className="bottom-line"></div></h2>
        {
          list.map((blog, _index) =>
            <BlogCard
              id="card"
              { ...blog }
              key={ uuidv4() }
              animate
            />
          )
        }
        <Pagination total={ Array.isArray(allBlogs) ? allBlogs.length : 0} pageSize={5} onChange={pageChangeHandler}/>
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