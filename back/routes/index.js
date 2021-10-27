const jwt = require('express-jwt');
const blog = require('./blog/blog');
const tag = require('./blog/tag');
const user = require('./user/user');
const { SECRET_KEY } = require('../token/token');

module.exports = app => {

  // token 验证
  app.use(
    jwt({ secret: SECRET_KEY, algorithms: ['HS256'] })
      .unless({
        // 白名单 不进行验证
        path: [
          '/getBlogByTitle',
          '/findAllBlog',
          '/getTags',
          '/login',
        ]
      })
  );

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.json({ code: 0, mes: '验证错误', data: {} });
    }
  });

  app.get('/getBlogByTitle', blog.getBlogByTitle);
  app.get('/findAllBlog', blog.findAllBlog);
  app.get('/deleteBlogByTitle', blog.deleteBlogByTitle);
  app.post('/addBlog', blog.addBlog);

  app.get('/getTags', tag.getTags);

  app.post('/login', user.login);
  app.post('/addUser', user.addUser);
}