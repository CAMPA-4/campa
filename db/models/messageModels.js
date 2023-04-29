const mongoose = require('mongooose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const messageSchema = new Schema({
  time: Date,
  createdBy: {type: String, required: true, unique: true},
  audio: 'work in progress',
  text: {type: String, required: true}
});

module.exports = mongoose.model('Messages', messageSchema);