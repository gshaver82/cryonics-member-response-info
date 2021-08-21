const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api/fitbit route
router.route("/")
    // .put(exampleController.postForAuthToken)
    .put(exampleController.putFitBitTokens)

module.exports = router;