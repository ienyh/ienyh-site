const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const studentRouter = require("./src/studentRouter");
const courseRouter = require("./src/courseRouter");
const scoreRouter = require("./src/scoreRouter");

// express实例化
const app = express();
// 端口号
const port = 8001;

/**
 * 中间件 middleware: cors
 * 用于解决跨域问题
 */
app.use(cors());

/**
 * express无法解析request.body
 * 所以需要使用中间件middleware: body-parser
 * `cnpm install body-parser`
 */
// parse application/x-www-form-urlencoded 解析表单
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 解析JSON
app.use(bodyParser.json());

/**
 * 路由
 * /student
 * /course
 * /score
 */
app.use("/student", studentRouter);
app.use("/course", courseRouter);
app.use("/score", scoreRouter);

/**
 * 监听port端口，开启服务器
 */
app.listen(port, () => {
  console.log(`Student server listening on port ${port}!`);
});
