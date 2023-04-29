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
      console.log(people);
      return next()      
    })
    .catch((err) => {
      console.log(err)
      return next({
        log: "Express error handler caught authController.createAccount controller",
        message: { err: "error occurred in createAccount" }, 
      })
    })
  // , (err ,people) => {
  //   if (err) {
  //     return next({
  //       log: "Express error handler caught authController.createAccoutn controller",
  //       message: { err: "error occurred in createAccount" }, 
  //     })
  //   } 
  //   if (people) {
  //     res.locals.newAccount = people;
  //     console.log(people);
  //     return next()
  //   }
  // })
};
authController.loginAccount = (req, res, next) => {

};

module.exports = authController;