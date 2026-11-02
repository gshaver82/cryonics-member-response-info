const router = require("express").Router();
const deviceController = require("../../controllers/deviceController");


router.route("/")
    .put(deviceController.putDeviceAlert);



router.route("/:_id")
    .put(deviceController.putClearFBAlert);

module.exports = router;

