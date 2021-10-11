import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';
import './article.css';
import { getBlogByTitle } from '../../../../apis/blogApis';
import EventEmitter from '../../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../../utils/constant';

const Article = (props) => {
  const { id } = props.match.params;
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const res = await getBlogByTitle(id);
      if (res.code === 1 && res?.data) {
        const tmp = Object.assign(res.data, { create_time: dayjs(new Date(res.data.create_time)).format('YYYY-MM-DD HH:mm') });
        setBlog(tmp);
        return tmp;
      }
    }
    fetch()
      .then((res) => {
        EventEmitter.emit(EVENT_CHANGE_HEADER, {
          title: <h1>{ id }</h1>,
          text: res ? `${res.author} 发布于 ${res.create_time}` : null,
          backdrop: true,
        });
      });
  }, []);

  return (
    <div className="container">
      <div className="article-header">
        <h3>{ blog.title }</h3>
        <h3>{ blog.author }</h3>
        <h3>{ blog.create_time }</h3>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        className="markdown-body hljs article"
      ></div>

      <div className="article-footer">
        <div className="item left">⬅️ Pymongo 去除数据</div>
        <div className="item right">利用 selenium 抓取 ➡️</div>
      </div>
    </div>
  )
}

export default React.memo(Article);