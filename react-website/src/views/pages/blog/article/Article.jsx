import React, { useState, useEffect, createRef } from 'react';
import dayjs from 'dayjs';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';
import './article.css';
import { getBlogByTitle } from '../../../../apis/blogApis';

const Article = (props) => {
  const { id } = props.match.params;
  const [html, setHtml] = useState({ __html: '' });
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const res = await getBlogByTitle(id);
      if (res.code === 1 && res?.data) {
        res?.data?.content && setHtml({ __html: res.data.content });
        setBlog(Object.assign(res.data, { create_time: dayjs(new Date(res.data.create_time)).format('YYYY-MM-DD HH:mm') }));
      }
    }
    fetch().then(() => {
      window.scrollTo(0, window.innerHeight - 60);
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
        dangerouslySetInnerHTML={html}
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