const router = require("express").Router();
const deviceController = require("../../controllers/deviceController");

//matches with /api/checkin route
router.route("/")
    // .get(exampleController.getcheckin)
    .put(deviceController.putDeviceTest)

module.exports = router;