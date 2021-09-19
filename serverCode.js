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
    DBFindallTest: function (req, res) {
        console.log("DBFindallTest")
        return db.CryonicsModel
            .find()
            .catch(err => console.log(err));
    },
    DBFindFitbitUsers: function (req, res) {
        console.log("DBFindFitbitUsers")
        return db.CryonicsModel
            .find({"checkinDevices.fitbit.fitbitDeviceRegistered":"true"})
            .catch(err => console.log(err));
    },
};