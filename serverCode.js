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


// thirtySecondsTimer = setInterval(function () {
//     console.log("thirtySecondsTimer");
//     const db = require("./models");
//     db.CryonicsModel
//         .find()
//         .then(console.log("--------------interval run"))
//         .then(dbModelDataResult => console.log((dbModelDataResult)))
//         .catch(err => res.status(422).json(err));
// }, 120000);


// pseudo code 
// for those in DB who have signed up for server alerts
// check DB for auth key

// run api to get heartrate, if expired expired_token..
// {
//     "errors": [
//       {
//         "errorType": "expired_token",
//         "message": "Access token expired: eyJhbGciOi.....EpUlpc"
//       }
//     ]
//   }
//   if error type is expired_token, run the refresh api and get the new auth key
//   store that auth key in the DB

//   use finalized auth key to run api to check for heartrate. 
//   check heartrate for time since last reading
//   https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json
//   curl -X GET "https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json" -H  "accept: application/json" -H  "authorization: Bea... eyJhbGciOiJI......2bHXHI"

