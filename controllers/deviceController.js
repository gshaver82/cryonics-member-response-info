const db = require("../models");

module.exports = {
    putDeviceTest: function (req, res) {
        console.log("req.body", req.body)
        console.log("req.body.newArrayEntry", req.body.newArrayEntry)
        db.CryonicsModel
            .updateOne({ "checkinDevices.fitbit.user_id": req.body.user_id },
                {
                    $set: {
                        "text3": "new data pushed as of " + Date.now()
                    },
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
    },


};