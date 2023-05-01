const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const cookieController = require("../controllers/cookieController");

//routers for login
router.post("/login", authController.loginAccount, cookieController.setSSIDCookie, (req, res) => {
  // console.log(res.locals.foundAccount)
  return res.status(200).json(res.locals.foundAccount);
});
//routers for signup
router.post("/signup", authController.createAccount, (req, res) => {
  return res.status(200).json(res.locals.newAccout);
});
module.exports = router;