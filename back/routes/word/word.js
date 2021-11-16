const consola = require('consola');
const Word = require("../../models/word");
const { responseClient, save, find } = require('../../utils/utils');

/**
 * GET
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllWords = async (req, res) => {
  try {
    const words = await Word.find();
    consola.success('<getAllWords>: 查询所有留言成功');
    responseClient(res, 1, "查询所有留言成功", words);
  } catch (error) {
    consola.error('<getAllWords>: 查询所有留言失败');
    responseClient(res, 0, "查询所有留言失败", error);
  }
}

/**
 * POST
 * @param {*} req 
 * @param {*} res 
 */
exports.addWord = async (req, res) => {
  const { uid, time, message, people_name = '', people_gender = '', people_email = '' } = req.body;
  if (time && message) {
    const word = new Word({ uid, time, message, people_name, people_gender, people_email });
    try {
      const result = await save(word);
      consola.success('<addWord>: 添加留言成功');
      responseClient(res, 1, "添加留言成功", result);
    } catch (error) {
      consola.success('<addWord>: 添加留言失败');
      responseClient(res, 1, "添加留言失败", error);
    }
  }
}
