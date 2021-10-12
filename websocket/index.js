const ws = require('nodejs-websocket');

const users = [];

const server = ws.createServer(conn => {
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
    let data;
    if (typeof result === 'object' && res !== null) {
      data = JSON.parse(result);
    } else {
      data = result;
    }
    broadcast(server, data);
  });
});

// 广播
const broadcast = (server, info) => {
  server.connections.forEach(function (conn) {
    conn.sendText(JSON.stringify(info));
  });
}

server.listen(9001); // port 9001
