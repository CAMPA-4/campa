const express = require('express');
const router = express.Router();

//routers for login
router.get('/login', (req,res) => {
  return res.status(200).json('we have successfully logged in')
})
//routers for signup
router.post('/signup', (req,res) => {
  return res.status(200).json('we have successfully signed up')
})