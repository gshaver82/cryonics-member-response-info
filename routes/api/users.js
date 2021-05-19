const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api route
router.route("/")
    .get(exampleController.findAll)
    .put(exampleController.update)


module.exports = router;