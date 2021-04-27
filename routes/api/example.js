const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

// Matches with "/api/recipes"
router.route("/")
    .get(exampleController.findAll)


module.exports = router;