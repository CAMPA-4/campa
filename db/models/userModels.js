const mongoose = require('mongooose');
const Schema = mongoose.Schema;
const Messages = require('./messageModels')
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');
const { stringify } = require('postcss');

const userSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  fullName: {type: String, required: true},
  phoneNumber: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  conversations: [
    {
      botName: {type: String, unique: true},
      messageHistory: [{type: mongoose.ObjectId, ref:'Message'}]
    }
  ]
});

module.exports = mongoose.model('User', userSchema);