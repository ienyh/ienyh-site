const mysql = require("mysql");

// mysql 配置
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  port: 3306,
  database: "personal-site",
});

// 连接 mysql 数据库
connection.connect(function (error) {
  if (error) {
    return console.log(error.message);
  }
  console.log("connected the database successfully (mysql)");
});

module.exports = connection;
