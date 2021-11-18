const router = require("express").Router();
const deviceRoutes = require("./device");

router.use("/device", deviceRoutes);
router.use("/ClearFBAlert", deviceRoutes);
module.exports = router;