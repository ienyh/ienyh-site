import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import ScrollReveal from 'scrollreveal';

import './BlogCard.css';
import { isPC } from '../../../../utils/common';
import tmp_img from '../../../../assets/imgs/tmp_blog.jpg';
import { BLOG_SCROLL_CONFIG } from '../../../../utils/config';

function Blog (props) {
  const cardRef = useRef();

  let { title, create_time, author, keyword, desc, head_img, right, animate = false } = props;
  create_time = dayjs(new Date(create_time)).format('YYYY-MM-DD HH:mm');

  const imgErrorHandler = (e) => {
    e.target.src = tmp_img;
  }

  useLayoutEffect(() => {
    animate && cardRef?.current && ScrollReveal().reveal(cardRef.current, BLOG_SCROLL_CONFIG);
  }, []);

  return (
    <div className="blog-card" ref={ cardRef } style={{ flexDirection: right ? 'row-reverse' : null }}>
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
          <div className='tabs-container'>
            {
              Array.isArray(keyword) ?
                keyword.map(item => {
                  return <div className='tab' key={uuidv4()}>
                    { item }
                  </div>
                }) :
                null
            }
          </div>
          {
            isPC() ?
              <div className="desc">{desc || '懒狗! 不写摘要的懒狗！！！'}</div> :
              null
          }
      </div>
    </div>
  )
}

export default Blog;