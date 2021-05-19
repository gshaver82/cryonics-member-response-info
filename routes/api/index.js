const router = require("express").Router();
const usersRoutes = require("./users");
// Recipe routes
router.use("/users", usersRoutes);

module.exports = router;
