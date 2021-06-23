const router = require("express").Router();
const usersRoutes = require("./users");
const checkinRoutes = require("./checkin");

router.use("/checkin", checkinRoutes);
router.use("/users", usersRoutes);


module.exports = router;
