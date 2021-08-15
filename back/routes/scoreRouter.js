const connection = require("./connect");
const express = require("express");
const router = express.Router();

/**
 * @api {get} /queryAll queryAllScores 查询所有成绩信息(附带学生姓名和课程名)
 * @apiName queryAllScores
 * @apiGroup score
 */
router.get("/queryAll", (request, response) => {
  let queryAllSql = `
    SELECT 
    scores.snumber, students.sname, scores.cnumber, courses.cname, scores.sc_score, scores.sc_mk_score
    FROM scores, students, courses
    WHERE scores.cnumber = courses.cnumber AND students.snumber = scores.snumber`;
  connection.query(queryAllSql, (error, result) => {
    if (error) {
      console.log("[SCORE SELECT ERROR]: " + error.message);
      response.send({ errCode: -1, message: "[SCORE SELECT ERROR]" });
    } else {
      console.log("[SCORE SELECT SUCCESSFULLY]");
      response.send({
        errCode: 0,
        message: "[SCORE SELECT SUCCESSFULLY]",
        result,
      });
    }
  });
});

/**
 * @api {post} /queryScores queryScoreByNumber 按学号查询一个学生的成绩
 * @apiName queryScoresByNumber
 * @apiGroup score
 */
router.post("/queryScores", (request, response) => {
  let { snumber } = request.body;
  let queryScoreByNumberSql = `
    SELECT 
      scores.snumber, students.sname, scores.cnumber, courses.cname, scores.sc_score, scores.sc_mk_score
    FROM 
      scores, students, courses
    WHERE 
      scores.cnumber = courses.cnumber AND students.snumber = scores.snumber AND scores.snumber = ?
  `;
  new Promise((resolve, reject) => {
    connection.query(queryScoreByNumberSql, snumber, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
    .then((result) => {
      /** 如果result.length == 0，代表查询不到此成绩记录 */
      if (result.length == 0) {
        response.send({
          errCode: -1,
          message: "[SCORE SELECT FAILED]: THESE SCORES DOESN'T EXIST",
        });
        console.log("[SCORE SELECT FAILED]: THESE SCORES DOESN'T EXIST");
      } else {
        response.send({
          errCode: 0,
          message: "[SCORE SELECT SUCCESSFULLY]",
          result,
        });
        console.log("[SCORE SELECT SUCCESSFULLY]");
      }
    })
    .catch((error) => {
      response.send({
        errCode: -1,
        message: "[SCORE SELECT ERROR]: " + error.message,
      });
      console.log("[SCORE SELECT ERROR]: " + error.message);
    });
});

/**
 * @api {post} /queryOneScore queryOneScoreByNumber 按学号和课程号查询一条成绩记录
 * @apiName queryOneScoreByNumber
 * @apiGroup score
 */
router.post("/queryOneScore", (request, response) => {
  const { snumber, cnumber } = request.body;
  const querySqlParams = [snumber, cnumber];
  let queryScoreByNumberSql = `
    SELECT 
      scores.snumber, students.sname, scores.cnumber, courses.cname, scores.sc_score, scores.sc_mk_score
    FROM 
      scores, students, courses
    WHERE 
      scores.cnumber = courses.cnumber AND students.snumber = scores.snumber AND scores.snumber = ? AND scores.cnumber = ?
  `;
  new Promise((resolve, reject) => {
    connection.query(queryScoreByNumberSql, querySqlParams, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
    .then((result) => {
      /** 如果result.length == 0，代表查询不到此成绩记录 */
      if (result.length == 0) {
        response.send({
          errCode: -1,
          message: "[SCORE SELECT FAILED]: THIS SCORE DOESN'T EXIST",
        });
        console.log("[SCORE SELECT FAILED]: THIS SCORE DOESN'T EXIST");
      } else {
        response.send({
          errCode: 0,
          message: "[SCORE SELECT SUCCESSFULLY]",
          result,
        });
        console.log("[SCORE SELECT SUCCESSFULLY]");
      }
    })
    .catch((error) => {
      response.send({
        errCode: -1,
        message: "[SCORE SELECT ERROR]: " + error.message,
      });
      console.log("[SCORE SELECT ERROR]: " + error.message);
    });
});

/**
 * @api {post} /creat creatScore 往成绩表中添加一条成绩数据
 * @apiName creatScore
 * @apiGroup score
 */
router.post("/creat", (request, response) => {
  const score = request.body;
  const creatSqlParams = [
    score.snumber,
    score.cnumber,
    score.sc_score,
    score.sc_mk_score,
  ];
  let creatSql = `INSERT INTO scores (snumber, cnumber, sc_score, sc_mk_score) VALUES (?, ?, ?, ?)`;
  new Promise((resolve, reject) => {
    connection.query(creatSql, creatSqlParams, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  })
    .then(() => {
      console.log("[SCORE CREATED SUCCESSFULLY]");
      response.send({ errCode: 0, message: "[SCORE CREATED SUCCESSFULLY]" });
    })
    .catch((error) => {
      console.log("[SCORE CREATE ERROR]: " + error.message);
      response.send({
        errCode: -1,
        message: "[SCORE CREATE ERROR]: " + error.message,
      });
    });
});

/**
 * @api {post} /deleteBySNumberAndCNumber deleteScore 按学号和课程号在成绩表中删除一条记录
 * @apiName deleteScore
 * @apiGroup score
 */
router.post("/deleteBySNumberAndCNumber", (request, response) => {
  const { snumber, cnumber } = request.body;
  // console.log(number);
  let delSql = `DELETE FROM scores WHERE cnumber = '${cnumber}' AND snumber = '${snumber}'`;
  new Promise((resolve, reject) => {
    connection.query(delSql, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
    .then((result) => {
      /**
       * result.affectedRows: sql语句执行后受影响行数
       * result.affectedRows == 0 时说明表中没有此记录
       */
      if (result.affectedRows == 0) {
        response.send({
          errCode: -1,
          message: "[SCORE DELETE FAILED]: THIS SCORE DOESN'T EXIST",
        });
        console.log("[SCORE DELETE FAILED]: THIS SCORE DOESN'T EXIST");
      } else {
        response.send({ errCode: 0, message: "[SCORE DELETE SUCCESSFULLY]" });
        console.log("[SCORE DELETE SUCCESSFULLY]");
      }
    })
    .catch((error) => {
      response.send({
        errorCode: -1,
        message: "[SCORE DELETE ERROR]: " + error.message,
      });
      console.log("[SCORE DELETE ERROR]: " + error.message);
    });
});

/**
 * @api {post} /update updateScore 按学号和课程号修改一条成绩记录
 * @apiName updateScore
 * @apiGroup score
 */
router.post("/update", (request, response) => {
  const score = request.body;
  let updateSql = `UPDATE scores SET sc_score = ?, sc_mk_score = ? WHERE snumber = ? AND cnumber = ?`;
  const updateSqlParams = [
    score.sc_score,
    score.sc_mk_score,
    score.snumber,
    score.cnumber,
  ];
  new Promise((resolve, reject) => {
    connection.query(updateSql, updateSqlParams, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
    .then((result) => {
      /**
       * result.changedRows: sql语句执行后改变的行数
       * result.changedRows == 0 时说明表中没有行改变，没有此记录
       */
      if (result.changedRows == 0) {
        response.send({
          errCode: -1,
          message: "[SCORE UPDATE FAILED]: THIS SCORE DOESN'T EXIST",
        });
        console.log("[SCORE UPDATE FAILED]: THIS SCORE DOESN'T EXIST");
      } else {
        console.log("[SCORE UPDATE SUCCESSFULLY]");
        response.send({ errCode: 0, message: "[SCORE UPDATE SUCCESSFULLY]" });
      }
    })
    .catch((error) => {
      console.log("[SCORE UPDATE ERROR]: " + error.message);
      response.send({
        errCode: -1,
        message: "[SCORE UPDATE ERROR]: " + error.message,
      });
    });
});

module.exports = router;
