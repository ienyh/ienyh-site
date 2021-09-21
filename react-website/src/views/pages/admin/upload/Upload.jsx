import React, { useState, useEffect } from 'react';
import './upload.css';
import markdownToHtml from '../../../../utils/markdown';

const UpLoad = () => {

  const [blog, setBlog] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e);
  }

  const FileChangeHandler = function (e) {
    const file = e?.target?.files?.[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      // console.log(fileReader.result);
      // console.log(markdownToHtml(fileReader.result));
      const html = markdownToHtml(fileReader.result);
      setBlog({
        content: html,
      });
    });
    file && fileReader.readAsText(file);
  }

  return (
    <div className="container">
      <form className="form-flex" onSubmit={ submitHandler }>
        Upload
        <input type="text" required />
        <div className="uploader">
          <input type="file" accept=".md" onChange={ FileChangeHandler }/>
          <div>点击上传 markdown 文档</div>
        </div>
        <input type="submit" value="submit"/>
      </form>
    </div>
  )
}

export default UpLoad;
