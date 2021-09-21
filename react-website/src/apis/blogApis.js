import { get, post } from "../utils/request.js";

/**
 * 添加一篇博客
 * @param {Object} blog
 */
export function addBlog (blog) {
  return post("/addBlog", { ...blog });
}

/**
 * 查询一篇博客
 * @param {String} title
 */
export function getBlogByTitle (title) {
  return get("/getBlogByTitle", { title });
}

/**
 * 查询所有博客
 * @param {String} title
 */
export function getBlogs () {
  return get("/findAllBlog");
}

