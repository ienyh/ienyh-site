import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as timeago from 'timeago.js';
import './message.css';
import EventEmitter from '../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../utils/events';
import { get, post } from '../../../utils/request';
import { browser, clientOS } from '../../../utils/common';
import Pagination from '../../../components/pagination/Pagination';
import Notification from '../../../components/notification';

const Message = () => {

  const [comments, setComments] = useState([]);
  const [currents, setCurrents] = useState([]);

  const fetchComments = async () => {
    const res = await get('/getAllWords');
    if (res.code === 1 && res?.data) {
      const temp = res.data.sort((a, b) => b.time - a.time);
      setComments(temp);
      setCurrents(temp.slice(0, 8));
    }
  }

  useEffect(() => {
    EventEmitter.emit(EVENT_CHANGE_HEADER, { title: <h1>留言板</h1>, headerHeight: '32vh', backdrop: true });
    fetchComments();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const comment = {
        message: form[0].value.trim(),
        people_name: form[1].value.trim(),
        email: form[2].value.trim(),
        device_info: browser() + clientOS(),
      }
      const res = await post('/addWord', comment);
      if (res.code === 1 && res?.data) {
        setComments([comment, ...comments]);
        setCurrents([comment, ...comments].slice(0, 8));
        Notification.success('留言成功');
        form[0].value = '';
      }
    } catch (error) {
      console.log(error);
      Notification.error('留言失败');
    }
  }

  const pageChangeHandler = (page) => {
    console.log(page);
    const { current, pageSize, total } = page;
    setCurrents(comments.slice((current - 1) * pageSize, current * pageSize));
  }

  return <div className="message-container">
    <h2>Comments | {comments.length} 条评论</h2>
    <ul className="message-group">
      {
        currents.map((item, index) => {
          return <li className="message-item" key={uuidv4()}>
            <div className="message-info">
              <img src="https://s3.mashiro.top/avatar/81e3b67f18b96d483095f468680337df?s=80&d=mm&r=g"/>
              <div className="message-info-name">
                <h4>{ item.people_name }</h4>
                <span>{ comments.length - index - 1 } 楼  发布于 {timeago.format(item.time, 'zh_CN')} (来自 {browser()}  {clientOS()})</span>
              </div>
            </div>
            <p className="message-body">{ item.message }</p>
          </li>
        })
      }
    </ul>

    <Pagination pageSize={8} total={comments.length} onChange={pageChangeHandler}></Pagination>

    <div className="respond">
      <h2>respond me</h2>
      <form onSubmit={submit}>
        <textarea placeholder="说点什么 ..." required></textarea>
        <div className="bottom-info">
          <img src="https://s3.mashiro.top/avatar/81e3b67f18b96d483095f468680337df?s=80&d=mm&r=g" draggable={false}/>
          <input type="text" placeholder="name *" required />
          <input type="text" placeholder="email" />
          <input type="submit" value="提 交"/>
        </div>
      </form>
    </div>
  </div>
}

export default Message;