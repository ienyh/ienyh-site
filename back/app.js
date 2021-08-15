const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cardRouter = require("./src/router/cardRouter");

const app = express(); // express实例化
const port = 8001; // 端口号

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", cardRouter);

/**
 * 监听 port 端口，开启服务器
 */
app.listen(port, () => {
  console.log(`node server listening on port ${port}!`);
});
