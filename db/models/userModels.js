const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Messages = require('./messageModels')


const userSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  conversations: [
    {
      botName: {type: String},
      messageHistory: [{type: mongoose.ObjectId, ref:'Message'}]
    }
  ]
});

module.exports = mongoose.model('User', userSchema);