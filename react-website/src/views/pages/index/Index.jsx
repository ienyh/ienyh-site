import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './index.css';
import BlogCard from '../blog/components/BlogCard';
import Calendar from '../../../components/calendar/Calendar';
import { get } from '../../../utils/request';
import EventEmitter from '../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../utils/events';
import LocalStorage from '../../../utils/LocalStorage';
import Notification from '../../../components/notification/index';

import icon_announce from '../../../assets/icons/announce.svg';

const Index = (props) => {
  const [list, setList] = useState([]);
  const [tags, setTags] = useState([]);

  // 向服务器请求数据
  const fetchBlogs = async () => {
    const { data } = await get('/findAllBlog');
    const blogs = data instanceof Array && data.sort((a, b) => b.create_time - a.create_time);
    setList(blogs.slice(0, 5));
    LocalStorage.set('blogs', blogs, 7200000); // 设置数据有效时长为两小时
    Notification.success({ title: '请求博客数据成功', position: 'right' });
  }

  const fetchTags = async () => {
    try {
      const { data } = await get('/getTags');
      setTags(data.filter(i => i !== null));
      Notification.success({ title: '请求标签数据成功', position: 'right' });
    } catch (error) {
      Notification.error({ title: '请求标签数据失败', position: 'right' });
    }
  }

  const loadHandler = () => {
    fetchBlogs(); // 页面刷新则重新请求数据
  }

  useEffect(() => {
    // 发布事件
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: <h1>首页</h1>, backdrop: false });

    // 如果本地有数据缓存则不向服务器请求数据
    const blogs = LocalStorage.get('blogs');
    if (blogs) setList(blogs.slice(0, 5));
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
        <h2>Article<div className="bottom-line"></div></h2>
        {
          list.map((blog, index) =>
            <BlogCard
              id="card"
              {...blog}
              key={uuidv4()}
              animate
              prev={list[index === 0 ? list.length - 1 : index - 1]}
              next={list[index === list.length - 1 ? 0 : index + 1]}
              index={ index }
            />
          )
        }
        <div className="blogs-more">
          <span className="poptip" data-poptip="点击查看更多" onClick={() => { props.history.push('/pages/blog') }}> more</span>
        </div>
      </div>
      
      <div className="bar">
        <div className="card announce">
          <img src={icon_announce} draggable={false}/>
          <div>
            <span>这是一条替代通知</span>
            <span></span>
          </div>
        </div>
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

export default Index;