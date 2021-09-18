import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const list = [
  {
    title: 'blog',
    path: '/pages/blog',
    icon: '',
  },
  {
    title: 'three',
    path: '/pages/three',
    icon: '',
  },
  // {
  //   title: '****',
  //   path: '/pages/blog3',
  //   icon: '',
  // },
]

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <span>chenyh</span>
        <ul className="menu">
          {
            list.map(item => {
              return <li className="item" key={ item.path }>
                <Link to={ item.path }>{ item.title }</Link>
              </li>
            })
          }
        </ul>
      </div>
    </header>
  )
}

export default Header;
