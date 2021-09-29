const jwt = require('jsonwebtoken');

const SECRET_KEY = 'chenyh!1119';

class Jwt {

  data;

  constructor (data) {
    this.data = data;
  }

  generateToken () {
    const data = this.data;
    const token = jwt.sign({
      data,
    }, SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 7, // "24h" token有效期
      algorithm: "HS256", // 默认使用 "HS256" 算法
    });
    return token;
  }

  verifyToken () {
    
  }

}