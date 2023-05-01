const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Messages = require('./messageModels')
// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');
// const { stringify } = require('postcss');
const messageSchema = new Schema({
  time: {type: Date, default: Date.now},
  createdBy: {type: String, required: true},
  audio: String,
  text: {type: String, required: true}
});


const userSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  conversations: [
    {
      botName: {type: String},
      messageHistory: [messageSchema]
    }
  ]
});

module.exports = mongoose.model('User', userSchema);