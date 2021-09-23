import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Dropdown from '../dropdown/Dropdown';
import Typing from '../typing/typing';
/** 导入 icon */
import icon_search from '../../assets/icons/search.svg';
import icon_link from '../../assets/icons/link.svg';
import icon_arrow_right from '../../assets/icons/arrow-right.svg';
import icon_home from '../../assets/icons/home.svg';
import icon_document from '../../assets/icons/document.svg';
import icon_music from '../../assets/icons/music.svg';
import icon_discount from '../../assets/icons/discount.svg';
import icon_tool from '../../assets/icons/tool.svg';
import icon_picture from '../../assets/icons/picture.svg';
import icon_3d from '../../assets/icons/3d.svg';
import icon_menu from '../../assets/icons/menu.svg';
import icon_menu_open from '../../assets/icons/menu-open.svg';


const list = [
  {
    title: '搜索',
    path: '/pages/search',
    icon: icon_search,
  },
  {
    title: '首页',
    path: '/index',
    icon: icon_home,
  },
  {
    title: '归档',
    path: '/pages/blog',
    icon: icon_document,
  },
  {
    title: '音乐',
    path: '/pages/music',
    icon: icon_music,
  },
  {
    title: '标签',
    path: '/pages/blog5',
    icon: icon_discount,
  },
  {
    title: '工具',
    path: '/pages/blog6',
    icon: icon_tool,
  },
  {
    title: '图片',
    path: '/pages/blog7',
    icon: icon_picture,
  },
  {
    title: '关于',
    path: '/pages/three',
    icon: icon_link,
  },
  {
    title: 'three',
    path: '/example/index.html',
    icon: icon_3d,
    external: true,
    comment: '测试多页面',
  },
];

const Header = () => {
  let defaultBarStatus = document.documentElement.clientWidth >= 1000;
  const [isBar, setIsBar] = useState(defaultBarStatus); // 表示导航栏两种状态
  const [mask, setMask] = useState(false); // 导航栏的背景遮罩

  const switchBar = () => {
    if (!isBar) setIsBar(true);
    else setIsBar(false);
  }

  const scrollHandler = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop;
    if (t <= 5) setMask(false);
    else setMask(true);
  }

  // resize 时将导航栏设置为展开状态，防止出现 导航栏切换时错位的 bug
  const resizeHandler = () => {
    setIsBar(true);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  return (
    <div>
      <nav className="animated slideInDown">
        <h1>Chenyh</h1>
        <ul className="nav-menu" style={{ transform: isBar ? 'none' : 'translateX(100%)' }}>
          {
            list.map(item => {
              return <li key={ item.path }>
                <img src={ item.icon || icon_link } />
                {
                  item?.external ?
                    <a href={item.path} >{item.title}</a> :
                    <Link to={item.path}>{item.title}</Link>
                }
                <div className="line"></div>
              </li>
            })
          }
          <li></li>
          <li className="hiddenInMobile">
            <Dropdown title={
              <div className="flex">
                <Link to="/pages/admin">站长</Link>
                <img src={ icon_arrow_right } className="dropdown-img"/>
              </div>
            } content={
              <>
                <div style={{ marginBottom: "8px" }}>
                  <Link to="/pages/admin/upload">upload</Link>
                </div>
                <div>exit</div>
              </>
            } ></Dropdown>
          </li>
        </ul>
        {
          !isBar ?
            <img src={ icon_menu } className="menu-img" onClick={switchBar} /> :
            <img src={ icon_menu_open } className="menu-img" onClick={switchBar}/>
        }
      </nav>
      {
        mask ? <div className="mask"></div> : null
      }
      <header className="animated fadeInDown">
        <div className="header-content">
          <h1>Chenyh's Blog</h1>
          <span className="h-text">
            <Typing time={ 6000 } circle>Start Coding Start Life</Typing>
          </span>
        </div>
      </header>
    </div>
  )
}

export default Header;
