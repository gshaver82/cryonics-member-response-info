const db = require("./models");
module.exports = {
    startup: function (req, res) {
        console.log("server startup")
    },
    fifteenMin: function (req, res) {
        let hourcount = 0
        let Fifteenmincount = 0
        fifteenmincounttimer = setInterval(function () {
            Fifteenmincount++;
            let remainder = (Fifteenmincount % 4) * 15;
            remainder === 0 ? hourcount++ : remainder;
            console.log("it has been " + hourcount +
                " hours, and " + remainder + " minutes since server start");
        }, 900000);
    },
    DBFindFitbitUsers: function (req, res) {
        // console.log("DBFindFitbitUsers")
        return db.CryonicsModel
            .find({ "checkinDevices.fitbit.fitbitDeviceRegistered": "true" })
            .catch(err => console.log(err));
    },
    testfunc: function (req, res) {
        // console.log("DBFindFitbitUsers")
        return db.CryonicsModel
            .find({ "checkinDevices.fitbit.fitbitDeviceRegistered": "true" })
            .catch(err => console.log(err));
    },
    putFitBitManualCheckin: function (fitbitCheckinObjectForDB) {
        console.log("🚀 ~ putFitBitManualCheckin")
            return db.CryonicsModel
                .updateOne({ firebaseAuthID: fitbitCheckinObjectForDB.firebaseAuthID },
                    {
                        $push: {
                            "checkinDevices.fitbit.checkinArray": {
                                $each: [fitbitCheckinObjectForDB.newArrayEntry],
                                $position: 0,
                                $slice: 5
                            }
                        }
                    }
                )
                .catch(err => console.log(err));
        },
};