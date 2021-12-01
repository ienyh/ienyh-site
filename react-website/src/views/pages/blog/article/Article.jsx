import React, { useState, useEffect, useLayoutEffect, createRef, useRef } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';
import './article.css';
import { getBlogByTitle } from '../../../../apis/blogApis';
import EventEmitter from '../../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../../utils/events';
import BackToTop from '../../../../components/backtotop/Back';
import { getQueryProperty } from '../../../../utils/common';
import LocalStorage from '../../../../utils/LocalStorage';

const Article = (props) => {
  const { id } = props.match.params;
  const [blog, setBlog] = useState({});
  const articleRef = useRef();
  const directoryRef = useRef();

  // 网络请求 Article
  const fetchArticle = async () => {
    const res = await getBlogByTitle(decodeURI(id));
    if (res.code === 1 && res?.data) {
      const tmp = Object.assign(res.data, {
        create_time: dayjs(new Date(res.data.create_time)).format('YYYY-MM-DD HH:mm'),
      });
      setBlog(tmp);
      return tmp;
    }
  }
  
  // 重新从 dom 中提取目录
  const directory = (dom) => {
    if (dom?.children && directoryRef.current) {
      directoryRef.current.innerText = '';
      const article = dom;
      const children = article.children ?? article.childNodes;
      const fragment = new DocumentFragment();
      for (let i = 0, len = children.length; i < len; i++) {
        if (children[i] instanceof HTMLHeadingElement) {
          let name = children[i].nodeName.toLowerCase();
          if (name === 'h1' || name === 'h2' || name === 'h3') {
            let a = document.createElement('a');
            a.setAttribute('draggable', false);
            a.setAttribute('data-level', name);
            a.innerText = children[i].innerText;
            a.href = `#${children[i]?.id}`;
            a.title = children[i].innerText;
            fragment.appendChild(a);
          }
        }
      }
      directoryRef.current.appendChild(fragment);
    }
  }

  useEffect(() => {
    const mutationObserver = new MutationObserver(records => {
      setTimeout(() => {
        directory(records[0].target);
      }, 500);
    });
    mutationObserver.observe(articleRef.current, { attributes: true });
    return () => {
      mutationObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    document.title = id;
    fetchArticle()
      .then((res) => {
        EventEmitter.emit(EVENT_CHANGE_HEADER, {
          title: <h1>{ id }</h1>,
          text: res ? `${res.author} 发布于 ${res.create_time}` : null,
          backdrop: false,
        });

        // 切换后重新定位到文章开头
        // articleRef?.current && articleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollTo(0, 0);
      });
  }, [id]);

  useLayoutEffect(() => {
    directory(articleRef.current);
  }, [articleRef.current]);

  // 处理上一篇和下一篇点击事件
  const footerClickHandler = e => {
    const { target } = e;
    const index = parseInt(getQueryProperty('index'));
    const blogs = LocalStorage.get('blogs') || [];
    if (blogs.length === 0) {
      return;
    }
    if (target.classList.contains('left') || target.id === 'left') {
      const prevIndex = index === 0 ? blogs.length - 1 : index - 1;
      const prevPrevTitle = blogs?.[prevIndex === 0 ? blogs.length - 1 : prevIndex - 1]?.title;
      const prevNextTitle = id || blogs?.[prevIndex === blogs.length - 1 ? 0 : prevIndex + 1]?.title;
      props.history.push(`/pages/article/${encodeURI(getQueryProperty('prev'))}?index=${prevIndex}&prev=${prevPrevTitle}&next=${prevNextTitle}`);
    } else if (target.classList.contains('right') || target.id === 'right') {
      const nextIndex = index === blogs.length - 1 ? 0 : index + 1;
      const nextPrevTitle = id || blogs?.[nextIndex === 0 ? blogs.length - 1 : nextIndex - 1]?.title;
      const nextNextTitle = blogs?.[nextIndex === blogs.length - 1 ? 0 : nextIndex + 1]?.title;
      props.history.push(`/pages/article/${encodeURI(getQueryProperty('next'))}?index=${nextIndex}&prev=${nextPrevTitle}&next=${nextNextTitle}`);
    }
  }

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

      <article
        id={id}
        ref={articleRef}
        dangerouslySetInnerHTML={{ __html: blog.content }}
        className="markdown-body hljs article"
      ></article>

      <div className="article-footer" onClick={ footerClickHandler }>
        <div
          className="item left poptip"
          data-poptip={getQueryProperty('prev')}
        >
          <span id="left">{getQueryProperty('prev')}</span> 上一篇
        </div>
        <div
          className="item right poptip"
          data-poptip={getQueryProperty('next')}
        >
          下一篇 <span id="right">{getQueryProperty('next')}</span>
        </div>
      </div>

      <div
        ref={directoryRef}
        className="article-directory"
      ></div>

      {/* 返回顶部 */}
      <BackToTop></BackToTop>
    </div>
  )
}

export default Article;