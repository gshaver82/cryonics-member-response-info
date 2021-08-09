const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api/fitbitRoutes route
router.route("/")
    .put(exampleController.PostForAuthToken)

    
module.exports = router;