const consola = require('consola');
const User = require("../../models/user");
const { responseClient, save, find } = require('../../utils/utils');
const { Jwt } = require('../../token/token');

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, mongodb_res) => {
    if (err) {
      consola.error('<login>: 查询用户失败');
      responseClient(res, 0, "登录用户失败", err);
    } else {
      if (mongodb_res?._id && mongodb_res?.username && mongodb_res?.password) {
        const { _id } = mongodb_res;
        responseClient(res, 1, `login success`, {
          token: new Jwt(_id).generateToken(),
        } ?? {});
      } else {
        responseClient(res, 0, "账号密码错误", {});
      }
    }
  })
}

exports.addUser = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    const mongodb_res = await save(user);
    responseClient(res, 1, "添加用户成功", mongodb_res);
  } catch (error) {
    responseClient(res, 0, "添加用户失败", error);
  }
}
