let mysql = require("mysql");

/**
 * mysql配置
 */
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "student_manage_system",
});

connection.connect(function (error) {
  if (error) {
    return console.log(error.message);
  }
  console.log("connected the database(mysql)");
});

module.exports = connection;

// connection.destroy();
// connection.end(function (err) {
//   if (err) {
//     return console.log("error:" + err.message);
//   }
//   console.log("Closed the database connection.");
// });
