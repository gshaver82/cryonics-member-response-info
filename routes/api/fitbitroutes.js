const router = require("express").Router();
const exampleController = require("../../controllers/exampleController");

//matches with /api/fitbitRoutes route
router.route("/")
    .put(exampleController.postForAuthToken)

    
module.exports = router;