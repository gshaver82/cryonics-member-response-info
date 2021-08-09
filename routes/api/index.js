const router = require("express").Router();
const usersRoutes = require("./users");
const checkinRoutes = require("./checkin");
const fitbitRoutes = require("./fitbitRoutes");

router.use("/checkin", checkinRoutes);
router.use("/users", usersRoutes);
router.use("/fitbit", fitbitRoutes);
module.exports = router;