const router = require("express").Router();
const { subscribeUser } = require("../controllers/newsletter.controller");

router.post("subscription", subscribeUser);

module.exports = router;