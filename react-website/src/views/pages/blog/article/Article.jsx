import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'github-markdown-css/github-markdown.css';
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
      <div dangerouslySetInnerHTML={ html } className="markdown-body article"></div>
    </div>
  )
}

export default Article;