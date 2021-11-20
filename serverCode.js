const db = require("./models");


let twilioOutboundCount = 0;
var self = module.exports = {
    startup: function () {
        console.log("serverCode startup")
    },
    FBAlertChain: async function (user) {
        console.log("**************FBAlertChain incoming user data is for user ", user)
        let updatedUser = ''
        let i = 0;
        // TODO declare interval outside this function so that it can be cleared in the case of multiple alerts
        //FIX possible duplicate intervals running. 
        //TODO maybe, in device controller, get the ID of the alert array. 
        //then in here search the array for that ID and work off of that
        //that way if double alerts come in, the link will clear only that one?
        let FBAlertInterval = setInterval(async function () {
            try {
                console.log("^^^^^^^^FBAlertInterval " + i + " index " + user.alertStage.length + " user.alertStage.length ")
                updatedUser = await db.CryonicsModel
                    .findOne({ firebaseAuthID: user.firebaseAuthID }).lean().exec()
                    .catch(err => res.status(422).json(err));
                // console.log("updatedUser", updatedUser)
                if (i >= user.alertStage.length) {
                    console.log("i >= user.alertStage.length, clearing interval")
                    clearInterval(FBAlertInterval)
                } else if (updatedUser.checkinDevices.fitbit.alertArray[0].activeState === true) {
                    // console.log(i, " Index---alert array and alert stage IF",
                    //     updatedUser.checkinDevices.fitbit.alertArray[0].stage[i],
                    //     updatedUser.alertStage[i])
                    if (!updatedUser.checkinDevices.fitbit.alertArray[0].stage[i] &&
                        updatedUser.alertStage[i]) {
                        updatedUser.checkinDevices.fitbit.alertArray[0].stage[i] = Date.now()
                        temp = await db.CryonicsModel
                            .findOneAndUpdate(
                                { firebaseAuthID: updatedUser.firebaseAuthID },
                                updatedUser,
                                {
                                    new: true,
                                }).lean().exec()
                            .catch(err => res.status(422).json(err));
                        const txtBody = "FB watch alert sent for " + user.name + " this is alert number " + (i + 1) +
                            "When the watch detects heart rate again it will begin monitoring again, and will send out more alerts if HR is not detected."
                            + " click this link to clear the alert status otherwise alerts will be sent to the next number down the line" +
                            "https://cryonics-member-response-info.herokuapp.com/FBAlertClear/" + user._id
                        const txtNum = user.alertStage[i].num
                        if (updatedUser.signedUpForAlerts === true || user.alertStage[i].num === "none") {
                            self.twilioOutboundTxt(txtBody, txtNum, user.alertStage[i].method || "txt")
                        } else {
                            console.log("alerts triggered, but not sent because signedUpForAlerts == false")
                            console.log(txtNum, txtBody)
                        }
                    }

                } else {
                    console.log("active state not true (or something else), clearing interval")
                    clearInterval(FBAlertInterval)
                }
            } catch (error) {
                console.error(error);
                console.log("try catch error. Clearing interval")
                clearInterval(FBAlertInterval)
            }
            i++;
        }, 60000);
    },
    FBSyncAlertChain: async function (user) {
        console.log("@@@@@@@@FBSyncAlertChain incoming user data is for user ", user)
        let updatedUser = ''
        let i = 0;
        let FBSyncAlertInterval = setInterval(async function () {
            try {
                console.log("^^^^^^^^FBSyncAlertInterval " + i + " index " + user.alertStage.length + " user.alertStage.length ")
                updatedUser = await db.CryonicsModel
                    .findOne({ firebaseAuthID: user.firebaseAuthID }).lean().exec()
                    .catch(err => res.status(422).json(err));
                // console.log("updatedUser", updatedUser)
                if (i >= user.alertStage.length) {
                    console.log("i >= user.alertStage.length, clearing interval")
                    clearInterval(FBSyncAlertInterval)
                } else if (updatedUser.checkinDevices.fitbit.syncAlertArray[0].activeState === true) {
                    // console.log(i, " Index---alert array and alert stage IF",
                    //     updatedUser.checkinDevices.fitbit.alertArray[0].stage[i],
                    //     updatedUser.alertStage[i])
                    if (!updatedUser.checkinDevices.fitbit.syncAlertArray[0].stage[i] &&
                        updatedUser.alertStage[i]) {
                        updatedUser.checkinDevices.fitbit.syncAlertArray[0].stage[i] = Date.now()
                        temp = await db.CryonicsModel
                            .findOneAndUpdate(
                                { firebaseAuthID: updatedUser.firebaseAuthID },
                                updatedUser,
                                {
                                    new: true,
                                }).lean().exec()
                            .catch(err => res.status(422).json(err));
                        const txtBody = "Fitbit alert " + (i + 1) + " Fitbit data has not been recieved for a while for " + user.name +
                            "Please sync your fitbit, and click this link to clear the alert status otherwise alerts will be sent to the next number down the line " +
                            "https://cryonics-member-response-info.herokuapp.com/FBAlertClear/" + user._id
                        const txtNum = user.alertStage[i].num
                        if (updatedUser.signedUpForAlerts === true || user.alertStage[i].num === "none" || user.alertStage[i].num === "-1none") {
                            self.twilioOutboundTxt(txtBody, txtNum, user.alertStage[i].method || "txt")
                        } else {
                            console.log("FBSyncAlertInterval alerts triggered, but not sent because signedUpForAlerts == false or number is none")
                            console.log(txtNum, txtBody)
                        }
                    }

                } else {
                    console.log("FBSyncAlertInterval active state not true (or something else), clearing interval")
                    clearInterval(FBSyncAlertInterval)
                }
            } catch (error) {
                console.error(error);
                console.log("FBSyncAlertInterval try catch error. Clearing interval")
                clearInterval(FBSyncAlertInterval)
            }
            i++;
        }, 200000);
    },
    twilioOutboundTxt: function (txtBody, txtNum, callOrTxt) {
        console.log("twilioOutboundCount", twilioOutboundCount)
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        if (twilioOutboundCount > 79 || twilioOutboundCount > 0) {
            client.messages
                .create({
                    body: "twilioOutboundCount is " + twilioOutboundCount,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: process.env.PHONE
                })
                .then(message => console.log(message.sid));
        }
        if (twilioOutboundCount < 120) {
            client.messages
                .create({
                    body: txtBody,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: txtNum
                })
                .then(message => console.log(message.sid));
            console.log(txtBody, "---server message sent---", txtNum)

            if (callOrTxt === "call") {
                client.calls
                    .create({
                        twiml: '<Response><Say>Minnesota Cryonics alert. Please check your text message</Say></Response>',
                        to: txtNum,
                        from: process.env.TWILIO_PHONE_NUMBER
                    })
                    .then(call => console.log(call.sid));
                console.log("---server phone out sent---", txtNum)
                twilioOutboundCount++
            }
            twilioOutboundCount++
        } else {
            console.log('twillio outbound count is too high for the day')
        }

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
        console.log("fitBitDevice inside servercode", fitBitDevice)
        console.log("fitBitDevice[0].batteryLevel", fitBitDevice[0].batteryLevel)
        return db.CryonicsModel
            .updateOne({ firebaseAuthID: firebaseAuthID },
                {
                    $set: {
                        "checkinDevices.fitbit.fbDeviceName": fitBitDevice[0].deviceVersion,
                        "checkinDevices.fitbit.fbDeviceBat": fitBitDevice[0].batteryLevel
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
    putSyncAlert: async function (user) {
        console.log("$$$$$$$$$$$$$$$putSyncAlert function user", user)
        const syncAlertArray =
        {
            date: Date.now(),
            activeState: true,
            stage: []
        }
        try {
            update = await db.CryonicsModel
                .updateOne({ "checkinDevices.fitbit.firebaseAuthID": req.body.firebaseAuthID },
                    {
                        $push: {
                            "checkinDevices.fitbit.syncAlertArray": {
                                $each: [syncAlertArray],
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
        self.FBSyncAlertChain(user);
    },
};