const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api/checkin route
router.route("/")
    .get(exampleController.getcheckin)
    .put(exampleController.putcheckin)


module.exports = router;