import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import './manage.css';
import EventEmitter from '../../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../../utils/events';
import { HEADER_HEIGHT } from '../../../../utils/config';
import { get } from '../../../../utils/request';


const Manage = () => {
  const [blog, setBlog] = useState([]);

  // 向服务器请求数据
  const fetchBlogs = async () => {
    const { data } = await get('/findAllBlog');
    const blogs = data instanceof Array && data.sort((a, b) => b.create_time - a.create_time);
    console.log(blogs);
    setBlog(blogs);
    // LocalStorage.set('blogs', blogs, 7200000); // 设置数据有效时长为两小时
  }

  useEffect(() => {
    EventEmitter.emit(EVENT_CHANGE_HEADER, { headerHeight: HEADER_HEIGHT });
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <td colSpan={3}>标题</td>
            <td>作者</td>
            <td>时间</td>
            <td colSpan={2}>字数</td>
            <td>标签</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          {
            blog.map(item => {
              return <tr key={uuidv4()}>
                <td colSpan={3}>{ item.title }</td>
                <td>{ item.author }</td>
                <td colSpan={2}>{ dayjs(item.create_time).format('YYYY-MM-DD') }</td>
                <td>{ item.numbers }</td>
                <td>{ item.keyword }</td>
                <td>
                  <button>删除</button>
                  <button>确认</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Manage;
