import React from 'react';
import './footer.css';

const config = {
  github: "https://github.com@ienyh",
}

const Footer = () => {
  return (
    <footer>
      <div>copyright@www.chenyh.site</div>
      <div><a href={ config.github } target="_blank">ienyh@github</a></div>
      <div>react</div>
    </footer>
  )
}

export default Footer;
