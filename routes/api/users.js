const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api/users route
router.route("/")
    .get(exampleController.findAll)

    router
    .route("/:_id")
    .get(exampleController.findById)
    .delete(exampleController.delete);

    
    router.route("/edit")
    .put(exampleController.edit)

    router.route("/getOneUserByFirebaseID/:firebaseUserID")
    .get(exampleController.findByFirebaseId)
    
module.exports = router;