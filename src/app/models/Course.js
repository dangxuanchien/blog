const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name: { type: String, default: 'Chien', maxLength: 255 },
  description: { type: String, maxLength: 255},
  image: { type: String, maxLength: 255},
  createAt: { type: Date, defaults: Date.now },
  updateAt: { type: Date, defaults: Date.now },
});

module.exports = mongoose.model('Course', Course);
