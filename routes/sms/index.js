const router = require("express").Router();
const smsRoutes = require("./sms");

router.use("/", smsRoutes);
module.exports = router;