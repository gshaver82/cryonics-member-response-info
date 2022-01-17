const router = require("express").Router();
const smsController = require("../../controllers/smsController");

router
    .route("/:_id")
    .put(smsController.smsBlacklist)
module.exports = router;