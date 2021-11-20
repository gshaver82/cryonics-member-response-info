const db = require("../models");
const serverCode = require("../serverCode");

module.exports = {
    putDeviceTest: async function (req, res) {
        console.log("🚀 ~ putDeviceTest")
        let update
        let user
        try {
            
            console.log("🚀 ~ req.body.user_id", req.body.user_id)
            update = await db.CryonicsModel
                .updateOne({ "device controller checkinDevices.fitbit.user_id": req.body.user_id },
                    {
                        $push: {
                            "checkinDevices.fitbit.alertArray": {
                                $each: [req.body.newArrayEntry],
                                $position: 0,
                                $slice: 250
                            }
                        },
                    }
                ).exec()
        } catch (err) {
            return res.status(400).json({
                error: 'Error en STATUS1'
            })
        }
        try {
            
            console.log("🚀 ~ req.body.user_id", req.body.user_id)
            user = await db.CryonicsModel.findOne({ "device controller checkinDevices.fitbit.user_id": req.body.user_id }).exec()
        } catch (err) {
            return res.status(400).json({
                error: 'Error en STATUS2'
            })
        }
        // console.log("---first and then second DB call", update, user)
        // console.log("user.signedUpForAlerts", user.signedUpForAlerts)
        //TODO send over to server code and to interval alerts there??
        console.log("🚀 ~ user", user)
        console.log("user.checkinDevices.fitbit.user_id", req.body.user_id)
        if (user.checkinDevices.fitbit.user_id === req.body.user_id) {
            serverCode.FBAlertChain(user);
        } else {
            console.log("user not found or error retrieving user and matching with fitbit user id")
        }
        res.json({ update, user })
    },

    putClearFBAlert: function (req, res) {
        console.log("putClearFBAlert req.params._id", req.params._id)
        db.CryonicsModel
            .updateOne({ _id: req.params._id },
                {
                    $set: {
                        "checkinDevices.fitbit.alertArray.0.activeState": false,
                    }
                }
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
};

