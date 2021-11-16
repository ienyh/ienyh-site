const consola = require('consola');
const jwt = require('express-jwt');
const blog = require('./blog/blog');
const tag = require('./blog/tag');
const user = require('./user/user');
const word = require('./word/word');
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
          '/addWord',
          '/getAllWords',
        ]
      })
  );

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.json({ code: 0, message: '验证错误' });
    } else {
      next(req, res);
    }
  });

  app.use((req, res, next) => {
    next();
    consola.info(`consola => [ ${req.route.path} ]`);
  })

  app.get('/getBlogByTitle', blog.getBlogByTitle);
  app.get('/findAllBlog', blog.findAllBlog);
  app.get('/deleteBlogByTitle', blog.deleteBlogByTitle);
  app.post('/addBlog', blog.addBlog);

  app.get('/getTags', tag.getTags);

  app.post('/login', user.login);
  app.post('/addUser', user.addUser);

  app.post('/addWord', word.addWord);
  app.get('/getAllWords', word.getAllWords);
}