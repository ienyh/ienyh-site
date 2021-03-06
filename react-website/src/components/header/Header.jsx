import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './header.css';
import Dropdown from '../dropdown/Dropdown';
import Typing from '../typing/typing';
import Modal from '../modal/Modal';
import EventEmitter from '../../utils/EventEmitter';
import { EVENT_CHANGE_HEADER } from '../../utils/events';
import { post } from '../../utils/request';
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
import { HEADER_HEIGHT } from '../../utils/config';
import LocalStorage from '../../utils/LocalStorage';
import { isLogined } from '../../utils/common';
import Notification from '../notification/index';

const list = [
  {
    title: '搜索',
    path: '/pages/search',
    icon: icon_search,
  },
  {
    title: '首页',
    path: '/pages/index',
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
  // {
  //   title: '标签',
  //   path: '/pages/blog5',
  //   icon: icon_discount,
  // },
  // {
  //   title: '工具',
  //   path: '/pages/blog6',
  //   icon: icon_tool,
  // },
  // {
  //   title: '图片',
  //   path: '/pages/blog7',
  //   icon: icon_picture,
  // },
  {
    title: '关于',
    path: '/pages/about_',
    icon: icon_link,
  },
  {
    title: '留言',
    path: '/pages/message',
    icon: icon_3d,
  },
];

const Header = props => {
  let defaultBarStatus = document.documentElement.clientWidth >= 1000;
  const [isBar, setIsBar] = useState(defaultBarStatus); // 表示导航栏两种状态
  const [mask, setMask] = useState(false); // 导航栏的背景遮罩
  const [modal, setModal] = useState(false); // Modal 开关
  const [header, setHeader] = useState({
    headerHeight: '100vh', // 100 vh
    backdrop: false,
    title: <h1>Chenyh's Blog</h1>,
    text: <Typing time={6000} circle>Start Coding Start Life</Typing>,
  });

  const switchBar = () => {
    if (!isBar) setIsBar(true);
    else setIsBar(false);
  }

  const scrollHandler = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop;
    if (t <= 10) setMask(false);
    else setMask(true);
  }

  // resize 时将导航栏设置为展开状态，防止出现 导航栏切换时错位的 bug
  const resizeHandler = () => {
    setIsBar(window.innerWidth >= 1000);
  }


  useEffect(() => {
    // 订阅事件
    EventEmitter.on(EVENT_CHANGE_HEADER, ({ headerHeight, title, text, backdrop = false }) => {
      if (headerHeight === HEADER_HEIGHT) {
        setHeader({
          headerHeight: HEADER_HEIGHT,
          backdrop: false,
          title: null,
          text: null,
        });
      } else {
        setHeader({
          headerHeight: headerHeight ?? '36vh',
          backdrop,
          title,
          text: text ?? <Typing time={6000}>Start Coding Start Life</Typing>,
        });
      }
    });
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
    return () => {
      EventEmitter.off(EVENT_CHANGE_HEADER);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  // 站长登录提交事件
  const loginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form[0].value.trim();
    const password = form[1].value.trim();
    if (username.length > 0 && password.length > 0) {
      const res = await post('/login', { username, password });
      if (res?.code === 1 && res?.data?.token) {
        LocalStorage.set('token', res.data.token);
        LocalStorage.set('isLogin', true, 1000 * 60 * 60 * 24);
        Notification.success({ title: '登录成功' });
      } else {
        Notification.error({
          title: '账号密码错误',
          content: '请重新输入',
          duration: 1000,
        });
      }
    } else {
      Notification.info({
        title: '未输入账号密码',
        content: '请重新输入',
        duration: 1000,
      });
    }
  }

  const navClickHandler = e => {
    if (e.target?.id === 'nav-menu') {
      setIsBar(true);
    } else {
      props?.history?.push(e.target?.id || '/pages');
      setIsBar(true);
    }
  }

  return (
    <div>
      <nav className="animated slideInDown">
        <h2 onClick={ () => { props.history.push('/pages/index') } }>Chenyh</h2>
        <ul
          id="nav-menu"
          className="nav-menu"
          style={{ transform: isBar ? 'none' : 'translateY(-100%)' }}
          onClick={navClickHandler}
        >
          {
            list.map(item => {
              return <li key={ item.path }>
                <img src={ item.icon || icon_link } />
                <div id={item.path}>{item.title}</div>
                <div className="line"></div>
              </li>
            })
          }
          <li className="hiddenInMobile">
            <Dropdown title={
              <div className="flex">
                <Link to="/pages/admin">站长</Link>
                <img src={ icon_arrow_right } className="dropdown-img"/>
              </div>
            } content={
              <>
                <li onClick={() => {
                  setModal(true);
                }}>站长登录</li>
                {
                  isLogined() ?
                    <>
                      <li><Link to="/pages/admin/manage">网站管理</Link></li>
                      <li>退出登录</li>
                    </> : null
                }
                
              </>
            } ></Dropdown>
          </li>
        </ul>
        {
          isBar ?
            <img src={ icon_menu } className="menu-img" onClick={switchBar} /> :
            <img src={ icon_menu_open } className="menu-img" onClick={switchBar}/>
        }
      </nav>
      {
        mask ? <div className="mask"></div> : null
      }
      <header
        className="animated fadeInDown"
        style={{
          height: header.headerHeight,
        }}
      >
        <div className="header-content">
          <div>
            {header.title}
          </div>
          <div className="h-text">
            { header.text ?? null }
          </div>
        </div>
        {/* 蒙版 */}
        <div className={ header.backdrop ? 'header-mask' : null }></div>
      </header>

      <Modal
        visible={modal}
        onClose={() => setModal(false)}
        title='站长登录'
      >
        <form onSubmit={loginSubmit} >
          <label>姓名: <input type="text"/></label>
          <label>密码: <input type="password" /></label>
          <input type="submit" value="登 录"/>
        </form>
      </Modal>
    </div>
  )
}

export default withRouter(Header);
