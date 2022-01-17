const db = require("../models");
const serverCode = require("../serverCode");

module.exports = {
    smsBlacklist: async function (req, res) {
        try {
            console.log("sms controller smsBlacklist ~ req.body.user_id", req)
        } catch (err) {
            return res.status(400).json({ error: 'Error ' })
        }
        try {
            // user = await db.CryonicsModel.findOne({ "checkinDevices.fitbit.user_id": req.body.user_id }).exec()
        } catch (err) {
            return res.status(400).json({ error: 'Error ' })
        }
        res.json(true)
    }
};

