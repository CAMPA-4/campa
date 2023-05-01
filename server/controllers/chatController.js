const mongoose = require('mongoose');
const User = require('../../db/models/userModels');
// const Message = require('../../db/models/messageModels');

module.exports = {
  postText: async (req, res, next) => {
    // console.log('input controller')
    const { user, input, botName } = req.body;
    const newMessage = {
      createdBy: user,
      audio: '',
      text: input,
    };

    User.findOneAndUpdate(
      { userName: user, 'conversations.botName': botName },
      { $push: { 'conversations.$.messageHistory': newMessage } },
      { new: true }
    )
      .then((updatedUser) => {
        let updatedConvo;
        updatedUser.conversations.forEach(convo => {
          if(convo.botName === botName) updatedConvo = convo
        })
        console.log("UPDATED CONVO",updatedConvo)
        res.locals.newMessage = updatedConvo;
        next();
      })
      .catch((err) => next({ err }));
    // console.log("NEW MESSAGE: ",message)
    // const userFromDB = await User.findOne({ userName: user });

    // userFromDB.conversations.forEach((convo) => {
    //   if (convo.botName === botName) {
    //       convo.messageHistory.push(message);
    //       res.locals.newMessage = convo
    //   }
    // });
    // userFromDB
    //   .save()
    //   .then((updatedUser) => {
    //     next();
    //   })
    //   .catch((err) => next({ err }));
  },

  getChats: async (req, res, next) => {
    const { user } = req.body;

    const userData = await User.find({ userName: user });
    // console.log(userData);
    res.locals.chats = userData;
    next();
  },

  postChats: async (req, res, next) => {
    const { user } = req.body;
    console.log('USER RECIEVED IN POST CHARTS:', user);
    User.findOneAndUpdate(
      { userName: user },
      {
        conversations: [
          {
            botName: 'BOT1',
            messageHistory: [],
          },
          {
            botName: 'BOT2',
            messageHistory: [],
          },
        ],
      },
      { new: true }
    )
      .then((update) => {
        console.log(update);
        res.locals.chat = update;
        next();
      })
      .catch((err) =>
        next({
          log: 'Express error handler caught chatController.postCharts',
          status: 400,
          message: { err: 'An error occurred chatController.postCharts' + err },
        })
      );
  },
};
