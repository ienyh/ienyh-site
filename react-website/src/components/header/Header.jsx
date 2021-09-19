import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const list = [
  {
    title: '搜索',
    path: '/pages/blog',
    icon: '/src/assets/icons/search.svg',
  },
  {
    title: '首页',
    path: '/index',
    icon: '/src/assets/icons/home.svg',
  },
  {
    title: '归档',
    path: '/pages/blog3',
    icon: '/src/assets/icons/document.svg',
  },
  {
    title: '音乐',
    path: '/pages/blog4',
    icon: '/src/assets/icons/music.svg',
  },
  {
    title: '标签',
    path: '/pages/blog5',
    icon: '/src/assets/icons/discount.svg',
  },
  {
    title: '工具',
    path: '/pages/blog6',
    icon: '/src/assets/icons/tool.svg',
  },
  {
    title: '图片',
    path: '/pages/blog7',
    icon: '/src/assets/icons/picture.svg',
  },
  {
    title: '关于',
    path: '/pages/blog8',
    icon: '',
  },
  {
    title: 'three',
    path: '/pages/three9',
    icon: '',
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
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      if (t <= 4) setMask(false);
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
                <img src={item.icon || "/src/assets/icons/link.svg"} />
                <Link to={ item.path }>{ item.title }</Link>
                <div className="line"></div>
              </li>
            })
          }
          <li>
            <Link to="/pages/admin">站长</Link>
            <img src={"/src/assets/icons/arrow-right.svg"} style={{
              width: '16px',
              height: '16px',
              marginLeft: "4px",
            }} />
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
