import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Index (props) {

  const [animate, setAnimate] = useState(false);

  const clickHandler = () => {
    setAnimate(true);
        setTimeout(() => {
          props.history.push('/pages');
        }, 500);
  }

  return (
    <div className="index" data-fade-out={animate}>
      <h3 className="" onClick={clickHandler}>Start Blog</h3>
    </div>
  )
}

export default Index;