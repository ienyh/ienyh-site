import React from 'react';
import dayjs from 'dayjs';
import './BlogCard.css';

function Blog (props) {
  let { title, create_time } = props;
  create_time = dayjs(new Date(create_time)).format('YYYY-MM-DD');
  return (
    <div className="blog-card">
      <div className="title">{ title }</div>
      <div className="time">{ create_time }</div>
    </div>
  )
}

export default Blog;