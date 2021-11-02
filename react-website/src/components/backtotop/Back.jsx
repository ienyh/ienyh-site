import React, { useEffect, useState } from 'react';
import './back.css';
import icon_back_to_top from '../../assets/icons/backtotop.svg';

const Back = () => {
  const [canBack, setCanBack] = useState(false);

  const scrollHandler = () => {
    if (document.documentElement.scrollTop > 240) {
      setCanBack(true);
    } else {
      setCanBack(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  // 点击返回顶部
  const toTop = () => {
    // 优先使用 requestAnimationFrame, 降级处理使用 setInterval
    if (requestAnimationFrame && cancelAnimationFrame) {
      let top = document.documentElement.scrollTop;
      if (top >= 80) {
        document.documentElement.scrollTop -= 100;
        requestAnimationFrame(toTop);
      } else {
        document.documentElement.scrollTop = 0;
      }
    } else {
      let timer = setInterval(() => {
        let top = document.documentElement.scrollTop;
        if (top >= 80) {
          document.documentElement.scrollTop -= 100;
        } else {
          document.documentElement.scrollTop = 0;
          timer && clearInterval(timer);
        }
      }, 10);
    }
  }

  return <>
    <div
      className="back-to-top"
      onClick={toTop}
      style={{
        display: canBack ? '' : 'none'
      }}
    >
      <img src={icon_back_to_top} width="24px" height="24px"/>
      <span>Back</span>
    </div>
  </>
}

export default Back;