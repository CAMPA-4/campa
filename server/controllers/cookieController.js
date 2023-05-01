const Cookie = require("../../db/models/sessionModels")
const User = require("../../db/models/userModels")
const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  try {
    if (res.locals.foundAccount) {
      res.cookie('ssid', res.locals.foundAccount._id, {httpOnly: true});
      return next();
    }
  } catch (err) {
    return next('setSSIDCokkie error occurred' + err) 
  }
}
module.exports = cookieController