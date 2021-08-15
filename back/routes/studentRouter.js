const connection = require("./connect");
const express = require("express");
const router = express.Router();

// [Object: null prototype] {
//   number: '2018199031',
//   name: 'chenyh',
//   gender: '男',
//   birthday: '2000-05-08',
//   class: '2018199',
//   major: '软件工程',
//   department: '信息工程'
// }

/**
 * @api {get} /queryAll queryAllStudents 查询所有学生信息
 * @apiName queryAllStudents
 * @apiGroup student
 */
router.get("/queryAll", (request, response) => {
  connection.query(`SELECT * FROM students`, (error, result) => {
    if (error) {
      console.log("[SELECT ERROR]: " + error.message);
      throw error;
    }
    response.send({ errCode: 0, message: "[SELECT SUCCESSFULLY]", result });
  });
});

/**
 * @api {post} /queryStudent queryStudentByNumber 按学号查询一个学生
 * @apiName queryStudentByNumber
 * @apiGroup student
 */
router.post("/queryStudent", (request, response) => {
  let { number } = request.body;
  new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM students WHERE snumber = ?`,
      number,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  })
    .then((result) => {
      /** 如果result.length == 0，代表查询不到此学生 */
      if (result.length == 0) {
        response.send({
          errCode: -1,
          message: "[SELECT FAILED]: THIS STUDENT DOESN'T EXIST",
        });
        console.log("[SELECT FAILED]: THIS STUDENT DOESN'T EXIST");
      } else {
        response.send({ errCode: 0, message: "[SELECT SUCCESSFULLY]", result });
        console.log("[SELECT SUCCESSFULLY]");
      }
    })
    .catch((error) => {
      response.send({
        errCode: -1,
        message: "[SELECT ERROR]: " + error.message,
      });
      console.log("[SELECT ERROR]: " + error.message);
    });
});

/**
 * @api {post} /creat creatStudent 往表中增加一个学生
 * @apiName creatStudent
 * @apiGroup student
 */
router.post("/creat", (request, response) => {
  const student = request.body;
  const creatSqlParams = [
    student.number,
    student.name,
    student.gender,
    student.birthday,
    student.class,
    student.major,
    student.department,
  ];
  let creatSql = `INSERT INTO students (snumber, sname, sgender, sbirthday, sclass, smajor, sdepartment) VALUES (?, ?, ?, ?, ?, ?, ?)`;
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
      console.log("[CREATED SUCCESSFULLY]");
      response.send({ errCode: 0, message: "[CREATED SUCCESSFULLY]" });
    })
    .catch((error) => {
      console.log("[CREATE ERROR]: " + error.message);
      response.send({
        errCode: -1,
        message: "[CREATE ERROR]: " + error.message,
      });
    });
});

/**
 * @api {post} /delete deleteStudent 按学号在表中删除一个学生
 * @apiName deleteStudent
 * @apiGroup student
 */
router.post("/deleteByNumber", (request, response) => {
  const { number } = request.body;
  // console.log(number);
  let delSql = `DELETE FROM students WHERE snumber = '${number}'`;
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
       * result.affectedRows == 0 时说明表中没有此学生
       */
      if (result.affectedRows == 0) {
        response.send({
          errCode: -1,
          message: "[DELETE FAILED]: THIS STUDENT DOESN'T EXIST",
        });
        console.log("[DELETE FAILED]: THIS STUDENT DOESN'T EXIST");
      } else {
        response.send({ errCode: 0, message: "[DELETE SUCCESSFULLY]" });
        console.log("[DELETE SUCCESSFULLY]");
      }
    })
    .catch((error) => {
      response.send({
        errorCode: -1,
        message: "[DELETE ERROR]: " + error.message,
      });
      console.log("[DELETE ERROR]: " + error.message);
    });
});

/**
 * @api {post} /update updateStudent 修改一个学生的数据
 * @apiName updateStudent
 * @apiGroup student
 */
router.post("/update", (request, response) => {
  const student = request.body;
  let updateSql = `UPDATE students SET sname = ?, sgender = ?, sbirthday = ?, sclass = ?, smajor = ?, sdepartment = ? WHERE snumber = ?`;
  const updateSqlParams = [
    student.name,
    student.gender,
    student.birthday,
    student.class,
    student.major,
    student.department,
    student.number,
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
       * result.changedRows == 0 时说明表中没有行改变，没有此学生
       */
      if (result.affectedRows == 0) {
        response.send({
          errCode: -1,
          message: "[UPDATE FAILED]: THIS STUDENT DOESN'T EXIST",
        });
        console.log("[UPDATE FAILED]: THIS STUDENT DOESN'T EXIST");
      } else {
        console.log("[UPDATE SUCCESSFULLY]");
        response.send({ errCode: 0, message: "[UPDATE SUCCESSFULLY]" });
      }
    })
    .catch((error) => {
      console.log("[UPDATE ERROR]: " + error.message);
      response.send({
        errCode: -1,
        message: "[UPDATE ERROR]: " + error.message,
      });
    });
});

module.exports = router;
