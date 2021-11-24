const { mongoose } = require("../core/mongodb");

const wordSchema = new mongoose.Schema({

  uid: { type: Number, require: true },

  time: { type: Number, default: Date.now(), required: true },

  message: { type: String, required: true },

  device_info: { type: String, required: true },

  people_name: { type: String, require: false },

  people_gender: { type: String, require: false },

  people_email: { type: String, require: false },
  
});

module.exports = mongoose.model('word', wordSchema);
