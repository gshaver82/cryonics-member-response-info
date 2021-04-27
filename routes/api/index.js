const router = require("express").Router();
const exampleRoutes = require("./example");
// Recipe routes
router.use("/example", exampleRoutes);

module.exports = router;
