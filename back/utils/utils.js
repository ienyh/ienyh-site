
const formatDate = () => { }

const responseClient = (res, resCode = 1, message = "服务端错误", data = {}) => {
  res.json({ code: resCode, message, data });
}

const save = (model) => {
  return new Promise((resolve, reject) => {
    model.save?.((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const find = (Model, opts) => {
  return new Promise((resolve, reject) => {
    Model.find?.(opts, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const deleteOne = (Model, opts) => {
  return new Promise((resolve, reject) => {
    Model.deleteOne?.(opts, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = {
  formatDate,
  responseClient,
  save,
  find,
  deleteOne,
}