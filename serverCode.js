const db = require("./models");
var self = module.exports = {
    startup: function () {
        console.log("serverCode startup")
    },
    FBAlertChain: function (user) {
        console.log("FBAlertChain incoming user data is for user ", user.name)

        //user should have the new checkinDevices.fitbit.alertArray
        //start interval?
        //if stage 1 has no date, get stage1Alert.num and active state === true and then call/text ---- stage 2 etc. 
        //if active state is now false, cancel interval
        //date.now() and put that into checkin devices--fitbit--alert array
        //set interval for 3 min and run above loop again.
        // 
        // if (user.signedUpForAlerts === true && user.stage1Alert.num != "none") {
        //     serverCode.twilioOutboundTxt(txtBody, user.stage1Alert.num)
        //     console.log("message sent due to user being signed up for alerts")
        // } else {
        //     console.log("message not sent due to user not being signed up for alerts")
        // }

        //TODO if alert status active, make background red on webpage.
        let updatedUser = ''
        var FBAlertInterval = setInterval(async function () {
            console.log("FBAlertAction")
            try {
                updatedUser = await db.CryonicsModel
                    .findOne({ firebaseAuthID: user.firebaseAuthID }).exec()
                    .catch(err => res.status(422).json(err));
                console.log("updatedUser FBAlertAction--------", updatedUser)
                console.log("updatedUser updatedUser.fitbit.alertArray--------", updatedUser.fitbit.alertArray)
                console.log("updatedUser updatedUser.fitbit.alertArray[0]--------", updatedUser.fitbit.alertArray[0])
                console.log("updatedUser updatedUser.fitbit.alertArray[0].activeState--------", updatedUser.fitbit.alertArray[0].activeState)
                if (updatedUser.fitbit.alertArray[0].activeState === true) {
                    console.log("active state true")
                    if (updatedUser.signedUpForAlerts === true && updatedUser.fitbit.alertArray[0].stage1 === 0) {
                        updatedUser.fitbit.alertArray[0].stage1 = Date.now()
                        temp = await db.CryonicsModel
                            .findOneAndUpdate(
                                { firebaseAuthID: updatedUser.firebaseAuthID },
                                updatedUser.body,
                                {
                                    new: true,
                                }).exec()
                            .catch(err => res.status(422).json(err));
                        const txtBody = "FB watch alert sent for " + user.name
                        const txtNum = user.stage1Alert.num
                        self.twilioOutboundTxt(txtBody, txtNum)
                    }
                    //TODO expand else statements here to chain through all stages

                } else {
                    console.log("active state not true, clearing interval")
                    clearInterval(FBAlertInterval)
                }
            } catch (error) {
                console.error(error);
                console.log("try catch error")
                clearInterval(FBAlertInterval)
                // expected output: ReferenceError: nonExistentFunction is not defined
                // Note - error messages will vary depending on browser
            }
        }, 60000);
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
    DBuserFitbitDevice: function (firebaseAuthID, fitBitDevice) {
        // console.log("fitBitDevice inside servercode", fitBitDevice)
        return db.CryonicsModel
            .updateOne({ firebaseAuthID: firebaseAuthID },
                {
                    $set: {
                        "text1": fitBitDevice[0].deviceVersion, "text2": fitBitDevice[0].batteryLevel
                    }
                }
            )
            .catch(err => console.log(err));
    },
    DBuserAlertDatecode: function (firebaseAuthID) {
        console.log("DBAlertDatecode function, setting firebaseAuthID ", firebaseAuthID)
        return db.CryonicsModel
            .updateOne({ firebaseAuthID: firebaseAuthID },
                {
                    $set: {
                        "textToUserDatecode": Date.now()
                    }
                }
            )
            .catch(err => console.log(err));
    },
    DBuserAlertEmerDatecode: function (firebaseAuthID) {
        console.log("DBAlertDatecode function, setting firebaseAuthID ", firebaseAuthID)
        return db.CryonicsModel
            .updateOne({ firebaseAuthID: firebaseAuthID },
                {
                    $set: {
                        "textToEmerContactDatecode": Date.now()
                    }
                }
            )
            .catch(err => console.log(err));
    },
    DBFindFitbitUsers: function () {
        // console.log("DBFindFitbitUsers")
        return db.CryonicsModel
            .find({
                "checkinDevices.fitbit.fitbitDeviceRegistered": "true"
            })
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
                    },
                }
            )
            .catch(err => console.log(err));
    },
    textDateCodeReset: function (firebaseAuthID) {
        // console.log("🚀 ~ putFitBitManualCheckin")
        return db.CryonicsModel
            .updateOne({ firebaseAuthID: firebaseAuthID },
                {
                    $set: {
                        "textToUserDatecode": 0,
                        "textToEmerContactDatecode": 0,
                        "textToAdminDatecode": 0
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