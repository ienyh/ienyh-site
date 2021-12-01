const consola = require('consola');
const Blog = require("../../models/blog");
const { responseClient, save, find, deleteOne } = require('../../utils/utils');

/**
 * @method POST
 * @param {*} req 
 * @param {*} res 
 */
exports.addBlog = async (req, res) => {
  const { title, content, author, numbers = 0, keyword, desc, img_url, isReprint, reprint_url } = req.body;
  const date = new Date().getTime(); 
  const blog = new Blog({
    title,
    content,
    author,
    desc,
    numbers,
    keyword,
    create_time: date,
    update_time: date,
    img_url, 
    isReprint, 
    reprint_url,
  });
  try {
    const mongodb_res = await save(blog);
    responseClient(res, 1, "添加博客成功", mongodb_res);
  } catch (error) {
    responseClient(res, 0, "添加博客失败", error);
  }
}

/**
 * 通过标题来查询一篇博客
 * @method GET
 * @param {*} req 
 * @param {*} res 
 */
exports.getBlogByTitle = (req, res) => {
  // GET
  const { title } = req.query;
  Blog.findOne({ title }, (err, mongodb_res) => {
    if (err) {
      consola.error('<getBlogByTitle>: 查询博客失败');
      responseClient(res, 0, "查找该博客失败", err);
    } else {
      const isRes = mongodb_res || (typeof mongodb_res === 'array' && mongodb_res.length > 0); 
      consola.success(`<getBlogByTitle>: 查找该博客${isRes ? '成功' : '失败'}`);
      responseClient(res, 1, `查找该博客${isRes ? '成功' : '失败'}`, mongodb_res ?? {});
    }
  });
}

/**
 * 查询所有博客
 * @method GET
 * @param {*} req 
 * @param {*} res 
 */
exports.findAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const basicBlogs = blogs.sort((a, b) => b.create_time - a.create_time).map((blog, index) => {
      // 这里过滤掉了 内容 content
      const { title, author, create_time, update_time, desc, keyword, numbers, isReprint, img_url, reprint_url } = blog;
      return {
        title,
        author,
        create_time,
        update_time,
        desc,
        keyword,
        numbers,
        isReprint,
        img_url,
        reprint_url,
        prev: blogs[index === 0 ? blogs.length - 1 : index - 1].title,
        next: blogs[index === blogs.length - 1 ? 0 : index + 1].title,
      };
    });
    consola.success('<findAllBlog>: 查询所有博客成功');
    responseClient(res, 1, "查询所有博客成功", basicBlogs);
  } catch (error) {
    consola.error('<findAllBlog>: 查询所有博客失败');
    responseClient(res, 0, "查询所有博客失败", error);
  }
}

/**
 * 通过标题来删除一篇博客
 * @method GET
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteBlogByTitle = async (req, res) => {
  const { title } = req.query;
  try {
    const mongodb_res = await deleteOne({ title });
    consola.success('<deleteBlog>: 删除博客成功');
    responseClient(res, 1, "删除博客成功", {});
  } catch (error) {
    consola.error('<deleteBlog>: 删除博客失败');
    responseClient(res, 0, "删除博客失败", error);
  }
}