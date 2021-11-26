import React, { useEffect, useState } from 'react';
import { EVENT_DISPLAY_FOOTER } from '../../utils/events';
import EventEmitter from '../../utils/EventEmitter';
import './footer.css';

const config = {
  github: "https://www.github.com/ienyh/ienyh-site",
  baidu: "https://tongji.baidu.com/web/35239738/overview/index",
  contact: "/pages/message",
}

const Footer = () => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    EventEmitter.on(EVENT_DISPLAY_FOOTER, (display) => {
      setDisplay(display);
    })
  }, []);

  return (
    <footer style={{ display: display ? 'flex' : 'none' }}>
      <div style={{ whiteSpace: "pre" }}>
        <a href={config.github} target="_blank" className="poptip" data-poptip="点击去往 github 项目地址">项目地址    </a>
        <a href={config.baidu} target="_blank">百度统计    </a>
        <a href={config.contact} >给我留言    </a>
      </div>
      <div>
        <span style={{ whiteSpace: "pre" }}>copyright@www.chenyh.site     </span>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
          豫ICP备2021020011号-1
        </a>
      </div>
      <div style={{ height: "32px" }}></div>
    </footer>
  )
}

export default Footer;
