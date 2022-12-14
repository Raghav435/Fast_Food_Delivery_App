const router = require("express").Router();

const { sendToAdminEmail } = require("../controllers/contact.controller");

router.post("/", sendToAdminEmail);

module.exports = router;