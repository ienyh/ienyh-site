import { get, post } from "./request";

/**
 * 添加一张卡片
 * @param {String} tableName
 * @param {Object} card
 */
export function addCardMessage(tableName, card) {
  return post("/addCardMessage", {
    tableName,
    ...card,
  });
}

/**
 * 查询一张卡片
 * @param {String} title
 */
export function queryCardMessage(title) {
  return get("/queryCardMessage", title);
}
