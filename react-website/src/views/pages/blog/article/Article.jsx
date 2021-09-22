import React, { useState, useEffect } from 'react';
import './article.css';
import { getBlogByTitle } from '../../../../apis/blogApis';

const Article = (props) => {
  const { id } = props.match.params;
  const [html, setHtml] = useState({ __html: ''});

  useEffect(() => {
    const fetch = async () => {
      const res = await getBlogByTitle(id);
      console.log(res);
      if (res.code === 1 && res?.data) {
        res?.data?.content && setHtml({ __html: res.data.content });
      }
    }
    fetch().then(() => {
      window.scrollTo(0, window.innerHeight - 60);
    });
  }, []);

  return (
    <div className="container">
      <div className="article-header">header</div>
      <div dangerouslySetInnerHTML={ html } className="article"></div>
    </div>
  )
}

export default Article;