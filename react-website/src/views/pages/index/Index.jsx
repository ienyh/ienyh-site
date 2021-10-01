import React, { useEffect, useState } from 'react';
import './index.css';
import { get } from '../../../utils/request';
import EventEmitter from '../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../utils/constant';
import LocalStorage from '../../../utils/LocalStorage';
import Typing from '../../../components/typing/typing';

const Index = () => {
  const [list, setList] = useState([]);

  // 向服务器请求数据
  const fetchBlogs = async () => {
    const { data } = await get('/findAllBlog');
    const blogs = data instanceof Array && data.sort((a, b) => b.create_time - a.create_time);
    setList(blogs);
    LocalStorage.set('blogs', blogs, 7200000); // 设置数据有效时长为两小时
  }

  const unloadHandler = () => {
    fetchBlogs(); // 页面刷新之前请求数据
  }

  useEffect(() => {
    // 发布事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, {
      title: <h1>Chenyh's Blog</h1>,
      backdrop: true,
      text: <Typing time={6000} circle>Start Coding Start Life</Typing>,
    });

    // 如果本地有数据缓存则不向服务器请求数据
    const blogs = LocalStorage.get('blogs');
    if (blogs) setList(blogs);
    else fetchBlogs();

    window.addEventListener('unload', unloadHandler);
    return () => {
      window.removeEventListener('unload', unloadHandler);
    }
  }, []);

  return (
    <div className="container">
      <div className="card">chenyh</div>
    </div>
  )
}

export default Index;
