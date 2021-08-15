const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cardRouter = require("./src/router/cardRouter");

const app = express(); // express实例化
const port = 8001; // 端口号

/**
 * 中间件 middleware: cors
 * 用于解决跨域问题
 */
app.use(cors());

/**
 * express 无法解析 request.body
 * 所以需要使用中间件 middleware: body-parser
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
// app.use("/student", studentRouter);
// app.use("/course", courseRouter);
// app.use("/score", scoreRouter);
app.use("/api", cardRouter);

/**
 * 监听 port 端口，开启服务器
 */
app.listen(port, () => {
  console.log(`node server listening on port ${port}!`);
});
