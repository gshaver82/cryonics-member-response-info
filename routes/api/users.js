const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

// Matches with "/api/example/:userID"
// router
//     .route("/:userID")
//     .get(exampleController.findOneAndUpdate)



    // Matches with "/api/recipes"
router.route("/")
.get(exampleController.findAll)

// // Matches with "/api/recipes/:_id"
// router
// .route("/:_id")
// .get(exampleController.findById)
// .put(exampleController.update)
// .delete(exampleController.remove);

// // Matches with "/api/recipes/user/:userID"
// router
// .route("/user/:userID")
// .get(exampleController.findByuserID)


module.exports = router;