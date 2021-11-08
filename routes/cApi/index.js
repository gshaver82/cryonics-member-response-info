const router = require("express").Router();
const deviceRoutes = require("./device");

router.use("/device", deviceRoutes);
module.exports = router;