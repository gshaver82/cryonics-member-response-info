const router = require("express").Router();
const deviceController = require("../../controllers/deviceController");

//matches with /cApi/device route
router.route("/")
    .put(deviceController.putDeviceAlert)
router
    .route("/:_id")
    .put(deviceController.putClearFBAlert)
module.exports = router;