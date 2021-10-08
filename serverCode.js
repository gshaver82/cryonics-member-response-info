const db = require("./models");
module.exports = {
    startup: function () {
        console.log("server startup")        
    },
    twilioOutboundTxt: function (txtBody, txtNum) {

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: txtBody,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: txtNum
            })
            .then(message => console.log(message.sid));
        console.log(txtBody, "---server message sent---", txtNum)
    },
    fifteenMin: function () {
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
    DBFindFitbitUsers: function () {
        // console.log("DBFindFitbitUsers")
        return db.CryonicsModel
            .find({ "checkinDevices.fitbit.fitbitDeviceRegistered": "true" })
            .catch(err => console.log(err));
    },
    putFitBitServerCheckin: function (fitbitCheckinObjectForDB) {
        // console.log("🚀 ~ putFitBitManualCheckin")
        return db.CryonicsModel
            .updateOne({ firebaseAuthID: fitbitCheckinObjectForDB.firebaseAuthID },
                {
                    $push: {
                        "checkinDevices.fitbit.checkinArray": {
                            $each: [fitbitCheckinObjectForDB.newArrayEntry],
                            $position: 0,
                            $slice: 25
                        }
                    }
                }
            )
            .catch(err => console.log(err));
    },
    putFitBitTokens: function (fitbitObjectForDB) {
        console.log("serverCode putFitBitTokens req.body", fitbitObjectForDB)
        return db.CryonicsModel
            .updateOne({ firebaseAuthID: fitbitObjectForDB.firebaseAuthID },
                {
                    $set: {
                        "checkinDevices.fitbit.fitbitDeviceRegistered": fitbitObjectForDB.checkinDevices.fitbit.fitbitDeviceRegistered,
                        "checkinDevices.fitbit.authToken": fitbitObjectForDB.checkinDevices.fitbit.authToken,
                        "checkinDevices.fitbit.refreshToken": fitbitObjectForDB.checkinDevices.fitbit.refreshToken,
                    }
                }
            )
            .catch(err => console.log(err));
    },
};