const { hashSync } = require("bcrypt");
const User = require("../../db/models/userModels");
const authController = {};
const saltFactors = 5;
const bcrypt = require('bcrypt');

authController.createAccount = (req, res, next) => {
  const {userName, email, password} = req.body;

  bcrypt.hash(password, saltFactors, (error, hash) => {
    if (error) {
      return next({
        log: "Express error handler caught in bcrypt hashing",
        message: { err: "error occurred in bcrypt hashing" }, 
      })
    } 
    if (hash) {
      User.create({
        userName: userName,
        email: email,
        password: hash
      })
        .then((people) => {
          res.locals.newAccount = people;
          return next()      
        })
        .catch((err) => {
          return next({
            log: "Express error handler caught authController.createAccount controller",
            message: { err: "error occurred in createAccount" }, 
          })
        })
    }
  })
};
authController.loginAccount = (req, res, next) => {
  const { identification, password } = req.body;
  User.findOne({ $or: [
    { userName: identification }, 
    { email: identification }] })
  .then((account) => {
    if (!account) {
      return next({
        log: "account not found",
        message: {err: "account not found"} 
      })
    }
    bcrypt.compare(password, account.password, (err, result) => {
      if (err) {
        return next({
          log: "inputted password does not match account password",
          message: {err: "incorrect password"}
        })
      }
      if (result) {
        res.locals.foundAccount = account;
        return next()
      }
    })
  })
  .catch((err) => {
    return next({
      log: "Express error handler caught authController.loginAccount controller",
      message: { err: "error occurred in loginAccount" }, 
    })
  })

};

module.exports = authController;