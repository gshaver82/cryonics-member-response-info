const db = require("../models");
// const serverCode = require("../serverCode");

module.exports = {
    smsBlacklist: async function (req, res) {
        
        console.log("smsBlacklist")
        try {
            console.log("sms controller smsBlacklist ~ req.body", req.body)
        } catch (err) {
            return res.status(400).json({ error: 'Error ' })
        }
        try {
        } catch (err) {
            return res.status(400).json({ error: 'Error ' })
        }
        res.json(true)
    }
};

