const MongoClient = require('mongodb').MongoClient;
const CONFIG = require("../app.config.js");

MongoClient.connect(CONFIG.MONGODB_CONFIG.url, function (err, db) {
  if (err) throw err;
  console.log("mongodb connect succeed!");
  db.close();
});