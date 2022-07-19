const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api/fitbit route
router.route("/")
    .put(exampleController.putFitBitTokens)
router.route("/fitbitCheckin/")
    .put(exampleController.putFitBitManualCheckin)
// router.route("/fitbitCheckin/device/")
//     .put(exampleController.putFitBitDeviceManualCheckin)
router.route("/:firebaseAuthID")
    .get(exampleController.fitbitGetAuthToken)


module.exports = router;