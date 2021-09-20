import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Dropdown from '../dropdown/Dropdown';
/** 导入 icon */
import search from '../../assets/icons/search.svg';
import link from '../../assets/icons/link.svg';
import arrow_right from '../../assets/icons/arrow-right.svg';
import home from '../../assets/icons/home.svg';
import document from '../../assets/icons/document.svg';
import music from '../../assets/icons/music.svg';
import discount from '../../assets/icons/discount.svg';
import tool from '../../assets/icons/tool.svg';
import picture from '../../assets/icons/picture.svg';

const list = [
  {
    title: '搜索',
    path: '/pages/blog',
    icon: search,
  },
  {
    title: '首页',
    path: '/index',
    icon: home,
  },
  {
    title: '归档',
    path: '/pages/blog3',
    icon: document,
  },
  {
    title: '音乐',
    path: '/pages/blog4',
    icon: music,
  },
  {
    title: '标签',
    path: '/pages/blog5',
    icon: discount,
  },
  {
    title: '工具',
    path: '/pages/blog6',
    icon: tool,
  },
  {
    title: '图片',
    path: '/pages/blog7',
    icon: picture,
  },
  {
    title: '关于',
    path: '/pages/blog8',
    icon: null,
  },
  {
    title: 'three',
    path: '/pages/three9',
    icon: null,
  },
]

const Header = () => {
  const [isBar, setIsBar] = useState(true);
  const [mask, setMask] = useState(false);

  const switchBar = () => {
    if (!isBar) setIsBar(true);
    else setIsBar(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', e => {
      let t = document?.documentElement?.scrollTop || document?.body?.scrollTop;
      console.log(t);
      if (t <= 5) setMask(false);
      else setMask(true);
    });
  }, []);

  return (
    <div>
      <nav className="animated slideInDown">
        <h1>陈一航</h1>
        <ul className="nav-menu" style={{ transform: isBar ? 'none' : 'translateX(100%)' }}>
          {
            list.map(item => {
              return <li key={ item.path }>
                <img src={ item.icon || link } />
                <Link to={ item.path }>{ item.title }</Link>
                <div className="line"></div>
              </li>
            })
          }
          <li>
            <Link to="/pages/admin">站长</Link>
            <img src={ arrow_right } style={{
              width: '16px',
              height: '16px',
              marginLeft: "4px",
            }} />
          </li>
          <li>
            <Dropdown title="站长" content={
              <>
                <div style={{ marginBottom: "8px" }}>upload</div>
                <div>exit</div>
              </>
            } ></Dropdown>
          </li>
        </ul>
        {
          !isBar ?
            <img src="/src/assets/icons/menu.svg" className="menu-img" onClick={switchBar} /> :
            <img src="/src/assets/icons/menu-open.svg" className="menu-img" onClick={switchBar}/>
        }
      </nav>
      {
        mask ? <div className="mask"></div> : null
      }
      <header>
        <div className="header-content animated fadeInUp">
          <h1>Chenyh's Blog</h1>
          <p className="h-text">start coding</p>
        </div>
      </header>
    </div>
  )
}

export default Header;
