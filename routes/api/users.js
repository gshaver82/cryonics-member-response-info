const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api/users route
router.route("/")
    .get(exampleController.findAll)
    .put(exampleController.create)

    router
    .route("/:_id")
    .get(exampleController.findById)
    .delete(exampleController.delete);

    
    router.route("/edit")
    .put(exampleController.edit)


module.exports = router;