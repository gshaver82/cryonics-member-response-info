const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api route
router.route("/")
    .get(exampleController.findAll)
    .put(exampleController.update)

    router
    .route("/:_id")
    .get(exampleController.findById)
    .delete(exampleController.delete);

module.exports = router;