const router = require("express").Router();
const smsController = require("../../controllers/smsController");

router.route("/")
    .post(smsController.smsIncomingMsg)
router.route("/:id")
    .get(smsController.resToOUtboundCall)
module.exports = router;