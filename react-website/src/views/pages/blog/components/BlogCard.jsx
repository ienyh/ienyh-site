import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './BlogCard.css';

function Blog (props) {
  let { title, create_time, author, keyword, desc } = props;
  create_time = dayjs(new Date(create_time)).format('YYYY-MM-DD');
  return (
    <div className="blog-card">
      <div className="img-left">
        <img src="https://www.zhouxingxing.fun/img/header.png" alt="" />
      </div>
      <div className="title-right">
        <h1 className="title">
          <Link to={ `/pages/article/${title}` }>{ title }</Link>
        </h1>
        <div>{ author }</div>
        <div className="time">发布于 {create_time}</div>
        <div>归档：{ keyword }</div>
        <div>{ desc || '懒狗! 不写摘要的懒狗！！！' }</div>
      </div>
    </div>
  )
}

export default Blog;