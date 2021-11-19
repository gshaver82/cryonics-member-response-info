const db = require("../models");
const serverCode = require("../serverCode");

module.exports = {
    putDeviceTest: async function (req, res) {
        let update
        let user
        try {
            update = await db.CryonicsModel
                .updateOne({ "checkinDevices.fitbit.user_id": req.body.user_id },
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
            user = await db.CryonicsModel.findOne({ "checkinDevices.fitbit.user_id": req.body.user_id }).exec()
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
        // const txtBody = "for user " + user.name + " Your fitbit watch has sent an alert as of " + req.body.newArrayEntry.date +
        //     " current date is " + Date.now();
        // if (user.signedUpForAlerts === true && user.stage1Alert.num != "none") {
        //     serverCode.twilioOutboundTxt(txtBody, user.stage1Alert.num)
        //     console.log("message sent due to user being signed up for alerts")
        // } else {
        //     console.log("message not sent due to user not being signed up for alerts")
        // }

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

