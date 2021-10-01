const blog = require('./blog/blog');
const tag = require('./blog/tag');

module.exports = app => {
  app.get('/getBlogByTitle', blog.getBlogByTitle);
  app.get('/findAllBlog', blog.findAllBlog);
  app.get('/deleteBlogByTitle', blog.deleteBlogByTitle);
  app.post('/addBlog', blog.addBlog);

  app.get('/getTags', tag.getTags);
}