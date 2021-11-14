const db = require("../models");
const serverCode = require("../serverCode");

// delete: function (req, res) {
//     db.CryonicsModel
//         .findById({ _id: req.params._id })
//         .then(dbModelDataResult => dbModelDataResult.remove())
//         .then(dbModelDataResult => res.json(dbModelDataResult))
//         .catch(err => res.status(422).json(err));
// },

module.exports = {
    putDeviceTest: function (req, res) {
        console.log("req.body", req.body)
        console.log("req.body.newArrayEntry", req.body.newArrayEntry)
        //get alert array 0
        //if active state = true, do nothing.
        //this means that an alert is already active and progressing through the stages. 
        //if active state false, then push to position 0 
        req.body.newArrayEntry.stage1 = Date.now()
        db.CryonicsModel
            .updateOne({ "checkinDevices.fitbit.user_id": req.body.user_id },
                {

                    $push: {
                        "checkinDevices.fitbit.alertArray": {
                            $each: [req.body.newArrayEntry],
                            $position: 0,
                            $slice: 25
                        }
                    },
                }
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
        console.log("after response")
        // db.CryonicsModel
        //     .findOne({ "checkinDevices.fitbit.user_id": req.body.user_id })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log("data", data)
        //         const txtBody = "for user " + data.name + " Your fitbit watch has sent an alert as of " + req.body.newArrayEntry.date +
        //             " current date is " + Date.now();
        //         const txtNum = '-16126421533'
        //         if (data.signedUpForAlerts === true) {
        //             serverCode.twilioOutboundTxt(txtBody, txtNum)
        //             console.log("message sent due to user being signed up for alerts")
        //         } else {
        //             console.log("message not sent due to user not being signed up for alerts")
        //         }
        //     })
        //     .catch(err => res.status(422).json(err));

        const txtBody = "for user xxx Your fitbit watch has sent an alert as of " + req.body.newArrayEntry.date +
            " current date is " + Date.now();
        const txtNum = '-16126421533'
        serverCode.twilioOutboundTxt(txtBody, txtNum)
        console.log("message sent due to user being signed up for alerts")

    },
};