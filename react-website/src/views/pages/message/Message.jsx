import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as timeago from 'timeago.js';
import './message.css';
import EventEmitter from '../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../utils/events';
import { get, post } from '../../../utils/request';
import { browser, clientOS, convertBase64UrlToBlob } from '../../../utils/common';
import Pagination from '../../../components/pagination/Pagination';
import Notification from '../../../components/notification';

import icon_avatar_temp from '../../../assets/icons/avatar_temp.svg';
import LocalStorage from '../../../utils/LocalStorage';

const Message = () => {
  const fileRef = useRef();
  const [comments, setComments] = useState([]);
  const [currents, setCurrents] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
    const { name, email, avatar } = LocalStorage.get('personal') || {};
    setAvatar(avatar || "");
    setName(name || "");
    setEmail(email || "");
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const comment = {
        message: form[0].value.trim(),
        people_name: form[1].value.trim(),
        email: form[2].value.trim(),
        device_info: browser() + ' ' + clientOS(),
        avatar: avatar,
      }
      const res = await post('/addWord', comment);
      if (res.code === 1 && res?.data) {
        setComments([comment, ...comments]);
        setCurrents([comment, ...comments].slice(0, 8));
        Notification.success('留言成功');
        form[0].value = '';
        LocalStorage.set('personal', { ...comment, name: name });
      }
    } catch (error) {
      console.log(error);
      Notification.error('留言失败');
    }
  }

  const pageChangeHandler = page => {
    const { current, pageSize, total } = page;
    setCurrents(comments.slice((current - 1) * pageSize, current * pageSize));
  }

  const fileChangeHandler = function (e) {
    const file = e?.target?.files?.[0];

    if (file?.size > 10000000) {
      Notification.error('图片过大');
      return;
    }

    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      const img = new Image();
      img.src = fileReader.result;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      img.addEventListener('load', function () {
        const x = this.width; // img 的宽
        const y = this.height; // img 的宽
        const canvasOffset = 300;
        // 宽 大于 高，则裁剪宽，反之裁剪高
        if (x > y) {
          canvas.width = canvasOffset;
          canvas.height = canvasOffset;
          ctx.drawImage(img, Math.round((x - y) / 2), 0, y, y, 0, 0, canvasOffset, canvasOffset); // 裁剪图片
        } else {
          canvas.width = canvasOffset;
          canvas.height = canvasOffset;
          ctx.drawImage(img, 0, Math.round((y - x) / 2), x, x, 0, 0, canvasOffset, canvasOffset);
        }
        const data = canvas.toDataURL(file.type, 1080 / Math.min(x, y) > 1 ? 1 : (1080 / Math.min(x, y)).toFixed(1)); // 通过 canvas 压缩成 Base64
        setAvatar(data);
      });
    });
    file && fileReader.readAsDataURL(file);
  }

  return <div className="message-container">
    <h2>Comments | {comments.length} 条评论</h2>
    <ul className="message-group">
      {
        currents.map((item, index) => {
          return <li className="message-item" key={uuidv4()}>
            <div className="message-info">
              <img src={ item.avatar || icon_avatar_temp } draggable={false}/>
              <div className="message-info-name">
                <h4>{ item.people_name }</h4>
                <span>发布于 {timeago.format(item.time, 'zh_CN')} (来自 { item.device_info }))</span>
              </div>
            </div>
            <div className="message-body">
              <input type="checkbox" id={ `readmore${index}` } />
              <label htmlFor={ `readmore${index}` }></label>
              <p className="message-content">{ item.message }</p>
            </div>
          </li>
        })
      }
    </ul>

    <Pagination pageSize={8} total={comments.length} onChange={pageChangeHandler}></Pagination>

    <div className="respond">
      <h2>respond me</h2>
      <form onSubmit={submit} >
        <textarea placeholder="说点什么 ..." required></textarea>
        <div className="bottom-info">
          <div className="poptip" data-poptip="点击上传图像">
            <img
              src={ avatar || icon_avatar_temp }
              draggable={ false }
              // title="点击上传图像"
              onClick={() => {
                fileRef?.current && fileRef.current.click();
              }}
              className="poptip"
              data-poptip="点击上传图像"
            />
          </div>
          <input
            type="text"
            placeholder="name *"
            required
            autoComplete="off"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email"
            autoComplete="off"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input type="submit" value="留 言"/>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={fileChangeHandler}
          style={{ display: 'none' }}
        />
      </form>
    </div>
  </div>
}

export default Message;