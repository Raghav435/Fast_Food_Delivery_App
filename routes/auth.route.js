const router = require("express").Router();
const {
  login,
  signUp,
  validateEmailToken,
  sendConfirmationEmail,
  sendResetPasswordEmail,
  resetPassword,
  logout,
  getSession,
} = require("../controllers/auth.controller");
const { checkDuplicatedEmail } = require("../middlwares/verifySignup");

const { checkIsValidUser } = require("../middlwares/userValidator");

router.post("/signup", [checkDuplicatedEmail, checkIsValidUser], signUp);
router.get("/verification/:token", validateEmailToken);
router.get("/logout", logout);
router.get("/session", getSession);
router.post("/forgotPassword", sendResetPasswordEmail);
router.post("/resetPassword/:token", resetPassword);
router.post("/confirmation", sendConfirmationEmail);
router.post("/login", login);
module.exports = router;
