import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';
import './article.css';
import { getBlogByTitle } from '../../../../apis/blogApis';
import EventEmitter from '../../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../../utils/events';
import Back from '../../../../components/backtotop/Back';

const Article = (props) => {
  const { id } = props.match.params;
  const [blog, setBlog] = useState({});
  const paths = window.location.pathname.split('/').filter(i => i !== '').map(i => decodeURIComponent(i));

  const fetchArticle = async () => {
    const res = await getBlogByTitle(id);
    if (res.code === 1 && res?.data) {
      const tmp = Object.assign(res.data, {
        create_time: dayjs(new Date(res.data.create_time)).format('YYYY-MM-DD HH:mm'),
      });
      setBlog(tmp);
      return tmp;
    }
  }

  useEffect(() => {
    fetchArticle()
      .then((res) => {
        EventEmitter.emit(EVENT_CHANGE_HEADER, {
          title: <h1>{ id }</h1>,
          text: res ? `${res.author} 发布于 ${res.create_time}` : null,
          backdrop: false,
        });
      });
  }, []);

  return (
    <div className="container article-container">
      {
        blog?.isReprint ? 
          <div className="reprint">
            <div>
              <span>转载自 </span>
              <a href={blog.reprint_url ?? "//chenyh.site"} target="_blank">{blog.reprint_url ?? "undefined -- null"}</a>
            </div>
          </div> 
          : null
      }

      {/* {
        paths.map(path => {
          return <span key={uuidv4()}>{ path }</span>
        })
      } */}

      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        className="markdown-body hljs article"
      ></div>

      <div className="article-footer">
        <div className="item left">⬅️ 上一篇</div>
        <div className="item right">下一篇 ➡️</div>
      </div>

      <Back></Back>
    </div>
  )
}

export default React.memo(Article);