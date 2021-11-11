const db = require("../models");

module.exports = {
    putDeviceTest: function (req, res) {
        console.log("req.body", req.body)
        db.CryonicsModel
            .updateOne({ "checkinDevices.fitbit.user_id": req.body.user_id },
                {
                    $set: {
                        "text3": "new data pushed as of " + Date.now()
                    }
                }
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },


};
