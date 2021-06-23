const router = require("express").Router();
const usersRoutes = require("./users");
const checkinRoutes = require("./checkin");

router.use("/users", usersRoutes);
router.use("/checkin", checkinRoutes);

module.exports = router;
