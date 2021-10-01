const { mongoose } = require("../core/mongodb");

const blogSchema = new mongoose.Schema({

  // 文章标题
  title: { type: String, required: true, validate: /\S+/ },

  // 文章关键字（SEO） & 文章分类
  keyword: [{ type: String, default: '' }],

  // 作者
  author: { type: String },

  // 文章描述 摘要
  desc: { type: String, default: '' },

  // 文章内容
  content: { type: String, required: true, validate: /\S+/ },

  // 字数
  numbers: { type: String, default: 0 },

  // 图片 url
  img_url: { type: String },

  // 创建日期
  create_time: { type: Number, default: new Date().getTime() },

  // 最后修改日期
  update_time: { type: Number, default: new Date().getTime() },
});

// 文章模型
module.exports = mongoose.model('blog', blogSchema);