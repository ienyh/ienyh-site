import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import './BlogCard.css';
import { isPC } from '../../../../utils/common';
import tmp_img from '../../../../assets/imgs/tmp_blog.jpg';

function Blog (props) {
  let { title, create_time, author, keyword, desc, head_img } = props;
  create_time = dayjs(new Date(create_time)).format('YYYY-MM-DD HH:mm');

  const imgErrorHandler = (e) => {
    e.target.src = tmp_img;
  }

  return (
    <div className="blog-card">
      <div className="img-left">
        {
          head_img ?
            <img src={`${head_img}`} onError={imgErrorHandler} alt="head_img" /> :
            <img src={tmp_img} alt="tmp_img" />
        }
      </div>
      <div className="title-right">
        <h1 className="title">
          <Link to={ `/pages/article/${title}` }>{ title }</Link>
        </h1>
        <div className="time">{ author } 发布于 {create_time}</div>
        {
          isPC() ?
            <>
              
              <div>归档：{ keyword }</div>
              <div>{ desc || '懒狗! 不写摘要的懒狗！！！' }</div>
            </> : null
        }
      </div>
    </div>
  )
}

export default Blog;