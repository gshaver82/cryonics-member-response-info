const router = require("express").Router();
const smsController = require("../../controllers/smsController");

router
    .route("/")
    .post(smsController.smsBlacklist)
module.exports = router;