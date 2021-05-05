const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

// Matches with "/api/example/:userID"
router
    .route("/:userID")
    .get(exampleController.findOneAndUpdate)

module.exports = router;