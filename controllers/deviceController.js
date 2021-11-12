const db = require("../models");

module.exports = {
    putDeviceTest: function (req, res) {
        console.log("req.body", req.body)
        console.log("req.body.newArrayEntry", req.body.newArrayEntry)
        //get alert array 0
        //if active state = true, do nothing.
        //this means that an alert is already active and progressing through the stages. 
        //if active state false, then push to position 0 
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
    },


};