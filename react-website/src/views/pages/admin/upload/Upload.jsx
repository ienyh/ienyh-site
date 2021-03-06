import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './upload.css';
import { addBlog } from '../../../../apis/blogApis';
import markdownToHtml from '../../../../utils/markdown';

import EventEmitter from '../../../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../../../utils/events';
import { HEADER_HEIGHT } from '../../../../utils/config';

const UpLoad = (props) => {
  const { history } = props;
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    keyword: [],
    numbers: 0,
    desc: '',
    content: '',
    isReprint: false,
    reprint_url: '',
    img_url: '',
  });
  const [labels, setLabels] = useState([
    { name: 'javascript', checked: false },
    { name: 'html', checked: false },
    { name: 'css', checked: false },
    { name: '计算机网络', checked: false },
  ]);

  useEffect(() => {
    EventEmitter.emit(EVENT_CHANGE_HEADER, { headerHeight: HEADER_HEIGHT, });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(blog);
    const res = await addBlog({
      ...blog,
      reprint_url: blog.reprint_url.replaceAll('/', ' '),
      img_url: blog.img_url.replaceAll('/', ' '),
      keyword: labels.map(label => label.checked ? label.name : null).filter(str => str !== null),
      content: markdownToHtml(blog.content),
    })
    if (res.code === 1 && res.data) {
      history.push('/pages/');
    }
    console.log(res);
  }

  const FileChangeHandler = function (e) {
    const file = e?.target?.files?.[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      // const html = markdownToHtml(fileReader.result);
      setBlog({
        ...blog,
        content: fileReader.result,
      });
    });
    file && fileReader.readAsText(file);
  }

  const formItemChangeHandler = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  }

  const radioChangeHandler = (e) => {
    setBlog({ ...blog, isReprint: e.target.value === 'true' });
  }

  const checkboxChangeHandler = (e) => {
    setLabels(labels.map(label => {
      if (label.name === e.target.name) {
        return { name: label.name, checked: !label.checked };
      } else {
        return { name: label.name, checked: label.checked };
      }
    }));
  }

  return (
    <div className="container">
      <form className="form-flex" onSubmit={ submitHandler }>
        <span>Upload <input type="submit" value="submit" /></span>
        <label>
          标题：
          <input
            type="text"
            required
            placeholder="请输入标题"
            name="title"
            value={ blog.title }
            onChange={ formItemChangeHandler }
          />
        </label>
        <label>
          作者：
          <input
            type="text"
            required
            placeholder="请输入作者"
            name="author"
            value={ blog.author }
            onChange={ formItemChangeHandler }
          />
        </label>
        <fieldset className="fieldset-flex">
          是否转载：
          <label>
            <input
              type="radio"
              value="false"
              name="isReprint"
              onChange={ radioChangeHandler }
              checked={ !blog.isReprint }
            />
              原创
          </label>
          <label>
            <input
              type="radio"
              value="true"
              name="isReprint"
              onChange={ radioChangeHandler }
              checked={ blog.isReprint }
            />
              转载
          </label>

          {
            blog.isReprint ?
              <div>
                <input
                  type="text"
                  placeholder="转载 url"
                  name="reprint_url"
                  value={ blog.reprint_url }
                  onChange={ formItemChangeHandler }
                />
              </div> :
              null
          }
        </fieldset>
        <label>
          封面：
          <input
            type="text"
            required
            placeholder="请输入封面 url"
            name="img_url"
            value={ blog.img_url }
            onChange={ formItemChangeHandler }
          />
        </label>
        <fieldset className="label-container">
          请勾选标签:
          {
            labels.map(label => {
              return (
                <label className="label-checkbox" key={ uuidv4() }>
                  <input
                    type="checkbox"
                    name={ label.name }
                    value={ label.name }
                    checked={ label.checked }
                    onChange={ checkboxChangeHandler }
                  />
                  <div className='tab'>{ label.name }</div>
                </label>
              )
            })
          }
        </fieldset>
        <fieldset>
          摘要：
          <textarea name="desc" id="" cols="40" rows="4"></textarea>
        </fieldset>
        <div className="uploader">
          <input
            type="file"
            accept=".md"
            required
            onChange={ FileChangeHandler }
          />
        </div>
        <div className="edit">{ blog.content || '请上传 markdown 文档' }</div>
      </form>
    </div>
  )
}

export default UpLoad;
