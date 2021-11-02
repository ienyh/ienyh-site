const ws = require('nodejs-websocket');
const https = require('https');
const fs = require('fs');


const users = [];

// 创建 request 请求监听器
const processRequest = (req, res) => {
  res.writeHead(200);
  res.end("processRequest--\n");
}

const httpsServer = https.createServer({
  key: fs.readFileSync('./ssl/private.pem'),
  cert: fs.readFileSync('./ssl/file.crt'),
}, processRequest);

const server = ws.createServer({
    server: httpsServer,
}, conn => {
    console.log('asdasd');
    conn.on('connect', (code) => {
      console.log('开启连接', code)
    })

    conn.on('close', function (code) {
      console.log('关闭连接', code)
    })

    conn.on('error', function (code) {
      console.log('异常关闭', code)
    })

    conn.on('text', function (result) {
      console.log('接收到消息', result);
      const data = JSON.parse(result);
      broadcast(server, data);
  });
});

// 广播
const broadcast = (server, info) => {
  server.connections.forEach(function (conn) {
    conn.sendText(JSON.stringify(info));
  });
}


server.listen(9001);