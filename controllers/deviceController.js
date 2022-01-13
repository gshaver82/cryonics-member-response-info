const db = require("../models");
const serverCode = require("../serverCode");

module.exports = {
    putDeviceAlert: async function (req, res) {
        //this will put the alert into the database. 'update' will be the return from the alert n=1 modified etc.
        //user will be the full user thats returned after the update. that user after the update is then sent to the alert chain
        let update
        let user
        try {
            console.log("device controller putDeviceAlert ~ req.body.user_id", req.body.user_id)
            update = await db.CryonicsModel.updateOne({ "checkinDevices.fitbit.user_id": req.body.user_id }, {
                $push: {
                    "checkinDevices.fitbit.alertArray": {
                        $each: [req.body.newArrayEntry],
                        $position: 0,
                        $slice: 250
                    }
                },
            }).exec()
        } catch (err) {
            return res.status(400).json({ error: 'Error finding user to put alert to' })
        }
        try {
            user = await db.CryonicsModel.findOne({ "checkinDevices.fitbit.user_id": req.body.user_id }).exec()
        } catch (err) {
            return res.status(400).json({ error: 'Error finding updated user' })
        }
        if (user.checkinDevices.fitbit.user_id === req.body.user_id) {
            serverCode.FBAlertChain(user);
        } else {
            console.log("user not found or error retrieving user and matching with fitbit user id")
        }
        // res.json({ update, user })
        res.json(true)
    },
    putClearFBAlert: async function (req, res) {
        //This gets the user for the ID provided
        // then if that user has alert and sync array data, it will set the alerts to false.  
        let user = 0
        console.log("putClearFBAlert req.params._id", req.params._id)
        try {
            user = await db.CryonicsModel.findOne({ _id: req.params._id }).exec()
        } catch (err) {
            return res.status(400).json({ error: 'Error finding user to clear FBAlert' })
        }
        let watchalert = 0
        let syncAlert = 0
        user?.checkinDevices?.fitbit?.alertArray[0]?.activeState
            ? watchalert = await db.CryonicsModel.updateOne({ _id: req.params._id }, { $set: { "checkinDevices.fitbit.alertArray.0.activeState": false } }).exec()
            : console.log("not setting alert array to false. either doesnt exist, or is already false")

        user?.checkinDevices?.fitbit?.syncAlertArray[0]?.activeState
            ? syncAlert = await db.CryonicsModel.updateOne({ _id: req.params._id }, { $set: { "checkinDevices.fitbit.syncAlertArray.0.activeState": false } }).exec()
            : console.log("not setting alert array to false. either doesnt exist, or is already false")
        return res.json({ watchalert, syncAlert })
    },
};

