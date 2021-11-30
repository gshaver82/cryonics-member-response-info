const router = require("express").Router();
const deviceController = require("../../controllers/deviceController");

//matches with /api/checkin route
router.route("/")
    // .get(exampleController.getcheckin)
    .put(deviceController.putDeviceTest)
router
    .route("/:_id")
    .put(deviceController.putClearFBAlert)
    .put(deviceController.putClearFBSyncAlert)
module.exports = router;