import Index from "../views/index/Index";
import Pages from '../views/pages/Pages';
import NotFound from '../views/others/404';
import Blog from '../views/pages/blog/Blog';
import Three from '../views/pages/three/Three';
import UpLoad from "../views/pages/admin/upload/Upload";
import Admin from "../views/pages/admin/Admin";

const routes = [
  {
    path: '/',
    component: Index,
    exact: true,
    title: '首页',
  },
  {
    path: '/index',
    component: Index,
    exact: true,
    title: '首页',
  },
  {
    path: '/pages',
    component: Pages,
    exact: false,
    title: '页面',
    children: [
      {
        path: '/pages',
        component: Blog,
        exact: true,
        title: '博客',
      },
      {
        path: '/pages/blog',
        component: Blog,
        exact: true,
        title: '博客',
      },
      {
        path: '/pages/three',
        component: Three,
        exact: true,
        title: 'three',
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
