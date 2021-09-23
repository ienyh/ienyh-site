import React from 'react';
import './footer.css';

const config = {
  github: "https://www.github.com/ienyh/ienyh-site",
  baidu: "https://tongji.baidu.com/web/35239738/overview/index",
}

const Footer = () => {
  return (
    <footer>
      <div style={{ whiteSpace: "pre" }}>
        <a href={config.github} target="_blank">项目地址    </a>
        <a href={config.baidu} target="_blank">百度统计    </a>
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
