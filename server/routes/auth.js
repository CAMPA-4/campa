const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")
//routers for login
router.get("/login", (req, res) => {
  return res.status(200).json("we have successfully logged in");
});
//routers for signup
router.post("/signup", authController.createAccount,(req, res) => {
  return res.status(200).json(res.locals.newAccout);
});
module.exports = router;