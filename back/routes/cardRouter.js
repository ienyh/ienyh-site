const connection = require("../connect");
const express = require("express");
const router = express.Router();

/**
 * @api {get} /queryCardMessage  查询所有信息
 * @apiName queryCardMessage
 * @apiGroup cardRouter
 */
router.get("/queryAllCardMessage", (request, response) => {
  connection.query(`SELECT * FROM ${tableName}`, (error, result) => {
    if (error) {
      console.log("[SELECTED ERROR]: " + error.message);
      response.send({ status: -1, message: "[SELECTED ERROR]" });
    } else {
      response.send({
        status: 0,
        message: "[SELECTED SUCCESSFULLY]",
        data: result,
      });
    }
  });
});

/**
 * @api {get} /queryCardMessage  查询一条信息
 * @apiName queryCardMessage
 * @apiGroup cardRouter
 */
router.get("/queryCardMessage", (request, response) => {
  const { title } = request;
  connection.query(
    `
      SELECT * FROM front_document WHERE title = '${title}'
      UNION ALL
      SELECT * FROM front_framework WHERE title = '${title}'
      UNION ALL
      SELECT * FROM front_library WHERE title = '${title}'
      UNION ALL
      SELECT * FROM front_resource WHERE title = '${title}'
    `,
    (error, result) => {
      if (error) {
        console.log("[SELECTED ERROR]: " + error.message);
        response.send({
          status: -1,
          message: "[SELECTED ERROR]" + error.message,
        });
      } else {
        console.log(result);
        response.send({
          status: 0,
          message: "[SELECTED SUCCESSFULLY]",
          data: result,
        });
      }
    }
  );
});

/**
 * @api {get} /addCardMessage  向指定表中添加一条信息
 * @apiName addCardMessage
 * @apiGroup cardRouter
 */
router.post("/addCardMessage", (request, response) => {
  console.log(request.body);
  const { tableName, url, icon, title, info } = request.body;
  const sql = `INSERT INTO ${tableName} (url, icon, title, info) VALUES (?, ?, ?, ?)`;

  new Promise((resolve, reject) => {
    connection.query(sql, [url, icon, title, info], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
    .then(() => {
      response.send({ status: 0, message: "[CREATED SUCCESSFULLY]" });
    })
    .catch(error => {
      response.send({
        status: -1,
        message: "[CREATE ERROR]: " + error.message,
      });
    });
});

module.exports = router;
