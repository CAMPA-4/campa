const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');


router.patch('/', chatController.postText, (req, res) => {
  res.status(200).send(res.locals.newMessage);
});

router.patch('/bot', chatController.postTextBot, (req, res) => {
  res.status(200).send(res.locals.newMessage);
});

router.get('/', chatController.getChats, (req, res) => {
  res.status(200).json(res.locals.chat)
})

router.post('/', chatController.postChats, (req, res) => {
  res.status(200).json(res.locals.chat)
})

module.exports = router;
