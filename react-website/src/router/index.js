import Index from "../views/index/Index";
import Pages from '../views/pages/Pages';
import NotFound from '../views/others/404';
import Blog from '../views/pages/blog/Blog';
import Three from '../views/pages/three/Three';
import UpLoad from "../views/pages/admin/upload/Upload";
import Admin from "../views/pages/admin/Admin";
import Article from '../views/pages/blog/article/Article';
import Music from "../views/pages/music/Music";
import Search from "../views/pages/search/Search";
import PagesIndex from '../views/pages/index/Index';
import About from "../views/pages/about/About";
import Manage from "../views/pages/admin/manage/Manage";
import Message from "../views/pages/message/Message";

const routes = [
  // {
  //   path: '/',
  //   component: Index,
  //   exact: true,
  //   title: '首页',
  // },
  // {
  //   path: '/index',
  //   component: Index,
  //   exact: true,
  //   title: '首页',
  // },
  {
    path: '/',
    component: Pages,
    exact: false,
    title: '页面',
    children: [
      {
        path: '/',
        component: PagesIndex,
        exact: true,
        title: 'PagesIndex',
      },
      {
        path: '/index',
        component: PagesIndex,
        exact: true,
        title: 'PagesIndex',
      },
      {
        path: '/pages',
        component: PagesIndex,
        exact: true,
        title: 'PagesIndex',
      },
      {
        path: '/pages/index',
        component: PagesIndex,
        exact: true,
        title: 'PagesIndex',
      },
      {
        path: '/pages/blog',
        component: Blog,
        exact: true,
        title: '博客',
      },
      {
        path: '/pages/article/:id',
        component: Article,
        exact: true,
        title: 'article',
      },
      {
        path: '/pages/music',
        component: Music,
        exact: true,
        title: 'music',
      },
      {
        path: '/pages/search',
        component: Search,
        exact: true,
        title: 'search',
      },
      {
        path: '/pages/about',
        component: About,
        exact: true,
        title: 'about',
      },
      {
        path: '/pages/three',
        component: Three,
        exact: true,
        title: 'three',
      },
      {
        path: '/pages/message',
        component: Message,
        exact: true,
        title: 'message',
      },
      {
        path: '/pages/admin',
        component: Admin,
        exact: false,
        title: 'admin',
        children: [
          {
            path: '/pages/admin/upload',
            component: UpLoad,
            exact: true,
            title: 'upload',
          },
          {
            path: '/pages/admin/manage',
            component: Manage,
            exact: true,
            title: 'manage',
          },
        ]
      },
    ]
  },
  {
    path: '/404',
    component: NotFound,
    exact: false,
    title: '404',
  },
]

export default routes;
