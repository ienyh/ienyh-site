const CONFIG = require("../app.config.js");

const mongoose = require("mongoose");

// mongoose Promise
// mongoose.Promise = global.Promise;

// connect
const connect = () => {
  // console.log('CONFIG.MONGODB.uri :', CONFIG.MONGODB.uri)

  // 连接数据库
  mongoose.connect(CONFIG.MONGODB_CONFIG.url)
    .then(() => {
      console.log("数据库连接成功!");
    })
    .catch(console.log);

  // 连接错误
  mongoose.connection.on('error', error => {
    console.log('数据库连接失败!', error);
  });

  // 连接成功
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功!');
  });

  // 自增 ID 初始化
  // autoIncrement.initialize(mongoose.connection)

  // 返回实例
  return mongoose;
}

// mongoose
exports.mongoose = mongoose;
exports.connect = connect;