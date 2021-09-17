const blog = require('./blog/blog');

module.exports = app => {
  app.get('/getBlogByTitle', blog.getBlogByTitle);
  app.get('/findAllBlog', blog.findAllBlog);
  app.get('/deleteBlogByTitle', blog.deleteBlogByTitle);
  app.post('/addBlog', blog.addBlog);
}