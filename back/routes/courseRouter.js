const connection = require("./connect");
const express = require("express");
const router = express.Router();

/**
 * @api {get} /queryAll queryAllCourses 查询所有课程信息
 * @apiName queryAllCourses
 * @apiGroup course
 */
router.get("/queryAll", (request, response) => {
  connection.query(`SELECT * FROM courses`, (error, result) => {
    if (error) {
      console.log("[COURSE SELECT ERROR]: " + error.message);
      response.send({ errCode: -1, message: "[COURSE SELECT ERROR]" });
    } else {
      response.send({
        errCode: 0,
        message: "[COURSE SELECT SUCCESSFULLY]",
        result,
      });
    }
  });
});

/**
 * @api {post} /queryCourse queryCourseByNumber 按学号查询一个学生
 * @apiName queryCourseByNumber
 * @apiGroup course
 */
router.post("/queryCourse", (request, response) => {
  let { cnumber } = request.body;
  new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM courses WHERE cnumber = ?`,
      cnumber,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  })
    .then(result => {
      /** 如果result.length == 0，代表查询不到此课程 */
      if (result.length == 0) {
        response.send({
          errCode: -1,
          message: "[COURSE SELECT FAILED]: THIS COURSE DOESN'T EXIST",
        });
        console.log("[COURSE SELECT FAILED]: THIS COURSE DOESN'T EXIST");
      } else {
        response.send({
          errCode: 0,
          message: "[COURSE SELECT SUCCESSFULLY]",
          result,
        });
        console.log("[COURSE SELECT SUCCESSFULLY]");
      }
    })
    .catch(error => {
      response.send({
        errCode: -1,
        message: "[COURSE SELECT ERROR]: " + error.message,
      });
      console.log("[COURSE SELECT ERROR]: " + error.message);
    });
});

/**
 * @api {post} /creat creatCourse 往表中添加一门课程
 * @apiName creatCourse
 * @apiGroup course
 */
router.post("/creat", (request, response) => {
  const course = request.body;
  const creatSqlParams = [
    course.cid,
    course.cnumber,
    course.cname,
    course.cperiod,
    course.credit_point,
  ];
  let creatSql = `INSERT INTO courses (cid, cnumber, cname, cperiod, credit_point) VALUES (?, ?, ?, ?, ?)`;
  new Promise((resolve, reject) => {
    connection.query(creatSql, creatSqlParams, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
    .then(() => {
      console.log("[COURSE CREATED SUCCESSFULLY]");
      response.send({ errCode: 0, message: "[COURSE CREATED SUCCESSFULLY]" });
    })
    .catch(error => {
      console.log("[COURSE CREATE ERROR]: " + error.message);
      response.send({
        errCode: -1,
        message: "[COURSE CREATE ERROR]: " + error.message,
      });
    });
});

/**
 * @api {post} /deleteByNumber deleteCourse 按课程号在表中删除一门课程
 * @apiName deleteCourse
 * @apiGroup course
 */
router.post("/deleteByNumber", (request, response) => {
  const { cnumber } = request.body;
  // console.log(number);
  let delSql = `DELETE FROM courses WHERE cnumber = '${cnumber}'`;
  new Promise((resolve, reject) => {
    connection.query(delSql, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
    .then(result => {
      /**
       * result.affectedRows: sql语句执行后受影响行数
       * result.affectedRows == 0 时说明表中没有此学生
       */
      if (result.affectedRows == 0) {
        response.send({
          errCode: -1,
          message: "[COURSE DELETE FAILED]: THIS COURSE DOESN'T EXIST",
        });
        console.log("[COURSE DELETE FAILED]: THIS COURSE DOESN'T EXIST");
      } else {
        response.send({ errCode: 0, message: "[COURSE DELETE SUCCESSFULLY]" });
        console.log("[COURSE DELETE SUCCESSFULLY]");
      }
    })
    .catch(error => {
      response.send({
        errorCode: -1,
        message: "[COURSE DELETE ERROR]: " + error.message,
      });
      console.log("[COURSE DELETE ERROR]: " + error.message);
    });
});

/**
 * @api {post} /update updateCourse 修改一门课程的数据
 * @apiName updateCourse
 * @apiGroup course
 */
router.post("/update", (request, response) => {
  const course = request.body;
  const updateSqlParams = [
    course.cid,
    course.cname,
    course.cperiod,
    course.credit_point,
    course.cnumber,
  ];
  let updateSql = `UPDATE courses SET cid = ?, cname = ?, cperiod = ?, credit_point = ? WHERE cnumber = ?`;
  new Promise((resolve, reject) => {
    connection.query(updateSql, updateSqlParams, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
    .then(result => {
      /**
       * result.changedRows: sql语句执行后改变的行数
       * result.changedRows == 0 时说明表中没有行改变，没有此课程
       */
      if (result.affectedRows == 0) {
        response.send({
          errCode: -1,
          message: "[COURSE UPDATE FAILED]: THIS COURSE DOESN'T EXIST",
        });
        console.log("[COURSE UPDATE FAILED]: THIS COURSE DOESN'T EXIST");
      } else {
        console.log("[COURSE UPDATE SUCCESSFULLY]");
        response.send({ errCode: 0, message: "[COURSE UPDATE SUCCESSFULLY]" });
      }
    })
    .catch(error => {
      console.log("[COURSE UPDATE ERROR]: " + error.message);
      response.send({
        errCode: -1,
        message: "[COURSE UPDATE ERROR]: " + error.message,
      });
    });
});

module.exports = router;
