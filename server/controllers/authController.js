const User = require("../../db/models/userModels");
const authController = {};

authController.createAccount = (req, res, next) => {
  const {userName, email, password} = req.body;
  User.create({
    userName: userName,
    email: email,
    password: password
  })
    .then((people) => {
      res.locals.newAccount = people;
      console.log('people:', people);
      return next()      
    })
    .catch((err) => {
      console.log('error:', err)
      return next({
        log: "Express error handler caught authController.createAccount controller",
        message: { err: "error occurred in createAccount" }, 
      })
    })
};
authController.loginAccount = (req, res, next) => {
  console.log('login controller entered')
  const { identification, password } = req.body;
  User.findOne({
    userName: identification,
    password: password
  })
  .then((account) => {
    // console.log(account)
    res.locals.foundAccount = account;
    return next();     
  })
  .catch((err) => {
    console.log(err)
    return next({
      log: "Express error handler caught authController.loginAccount controller",
      message: { err: "error occurred in loginAccount" }, 
    })
  })

};

module.exports = authController;