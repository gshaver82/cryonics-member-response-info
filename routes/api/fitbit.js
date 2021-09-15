const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api/fitbit route
router.route("/")
    .put(exampleController.putFitBitTokens)
router.route("/fitbitCheckin/")
    .put(exampleController.putFitBitTokens)
router.route("/:firebaseAuthID")
    .get(exampleController.fitbitGetAuthToken)


module.exports = router;