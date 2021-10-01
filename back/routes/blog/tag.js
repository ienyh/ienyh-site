const consola = require("consola");
const Blog = require("../../models/blog");
const { responseClient } = require('../../utils/utils');

exports.getTags = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const resSet = new Set();
    Array.isArray(blogs) && blogs.forEach(blog => {
      const tmp = blog.keyword.map(str => str.toLowerCase());
      resSet.add(...tmp);
    })
    consola.success(`<getTags>: 查找标签`);
    responseClient(res, 1, null, Array.from(resSet));
  } catch (error) {
    responseClient(res, 0, null, error);
  }
}