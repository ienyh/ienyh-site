import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './blog.css';
import BlogCard from './components/BlogCard';
import { get } from '../../../utils/request';
import EventEmitter from '../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../utils/constant';
import LocalStorage from '../../../utils/LocalStorage';

const Blog = (props) => {
  const [list, setList] = useState([]);

  // 向服务器请求数据
  const fetch = async () => {
    const { data } = await get('/findAllBlog');
    const blogs = data instanceof Array && data.sort((a, b) => b.create_time - a.create_time);
    setList(blogs);
    LocalStorage.set('blogs', blogs, 3600000); // 设置数据有效时长为一小时
  }

  const loadHandler = () => {
    fetch(); // 页面刷新则重新请求数据
  }

  useEffect(() => {
    // 发布事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: '归档' });

    // 如果本地有数据缓存则不向服务器请求数据
    const blogs = LocalStorage.get('blogs');
    if (blogs) setList(blogs);
    else fetch();

    window.addEventListener('load', loadHandler);

    return () => {
      window.removeEventListener('load', loadHandler);
    }
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