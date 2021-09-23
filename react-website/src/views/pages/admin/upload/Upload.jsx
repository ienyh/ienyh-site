import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './upload.css';
import { addBlog } from '../../../../apis/blogApis';
import markdownToHtml from '../../../../utils/markdown';


const UpLoad = (props) => {
  const { history } = props;
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    keyword: [],
    numbers: 0,
    desc: '',
    content: '',
  });
  const [labels, setLabels] = useState([
    { name: 'javascript', checked: false },
    { name: 'html', checked: false },
    { name: 'css', checked: false },
  ]);

  useEffect(() => {
    window.scrollTo(0, window.innerHeight - 60);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await addBlog({
      ...blog,
      keyword: labels.map(label => label.checked ? label.name : null).filter(str => str !== null),
      content: markdownToHtml(blog.content),
    })
    if (res.code === 1 && res.data) {
      history.push('/pages/')
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
        <div className="label-container">
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
                  <span>{ label.name }</span>
                </label>
              )
            })
          }
        </div>
        <label>
          摘要：
          <input type="text" placeholder="请输入" />
        </label>
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
