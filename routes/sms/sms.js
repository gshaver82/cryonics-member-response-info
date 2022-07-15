const router = require("express").Router();
const smsController = require("../../controllers/smsController");

router.route("/")
    .post(smsController.smsIncomingMsg)
router.route("/:_id")
    .get(smsController.resToOUtboundCall)
module.exports = router;