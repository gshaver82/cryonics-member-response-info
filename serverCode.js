const db = require("./models");

let twilioOutboundCount = 0;
var self = module.exports = {
    // startup: function () {
    //     console.log("serverCode startup")
    // }, 
    FBAlertChain: async function (user) {
        console.log("**************FBAlertChain incoming user data is for user ", user.name)
        let updatedUser = ''
        let i = 0;
        let FBAlertInterval = setInterval(alertLogic, 60000);
        alertLogic()
        async function alertLogic() {
            try {
                updatedUser = await db.CryonicsModel
                    .findOne({ firebaseAuthID: user.firebaseAuthID }).lean().exec()
                    .catch(err => res.status(422).json(err));
                console.log("^^^^^^^^FBAlertInterval " + i + " index " + updatedUser.alertStage.length + " user.alertStage.length ")
                if (i >= updatedUser.alertStage.length) {
                    console.log("i >= user.alertStage.length, clearing interval")
                    clearInterval(FBAlertInterval)
                } else if (updatedUser.checkinDevices.fitbit.alertArray[0].activeState === true) {
                    if (!updatedUser.checkinDevices.fitbit.alertArray[0].stage[i] && updatedUser.alertStage[i]) {
                        updatedUser.checkinDevices.fitbit.alertArray[0].stage[i] = Date.now()
                        temp = await db.CryonicsModel
                            .findOneAndUpdate(
                                { firebaseAuthID: updatedUser.firebaseAuthID },
                                updatedUser,
                                { new: true, }).lean().exec()
                            .catch(err => res.status(422).json(err));

                        let lat = user.checkinDevices.fitbit.alertArray[0].lat ? user.checkinDevices.fitbit.alertArray[0].lat : 0
                        let long = user.checkinDevices.fitbit.alertArray[0].long ? user.checkinDevices.fitbit.alertArray[0].long : 0
                        let googleMapsURL = " "
                        if (lat !== 0 && long !== 0) { googleMapsURL = "https://www.google.com/maps/place/" + lat + "+" + long + " " }
                        const txtBody = "Fitbit  WATCH alert " + (i + 1) + " for " + user.name.toUpperCase() + " " +
                            googleMapsURL +
                            "Please check your watch, or check up on that person. " +
                            "Click here to CLEAR THIS ALERT. " +
                            "https://cryonics-member-response-info.herokuapp.com/FBAlertClear/" + user._id + " Reply STOP to unsubscribe"
                        const txtNum = user.alertStage[i].num
                        if (updatedUser.signedUpForAlerts === true && txtNum != "none" && txtNum != "-1none" && txtNum != "" && txtNum != "-1") {
                            self.twilioOutboundTxt(user, txtBody, txtNum, user.alertStage[i].method)
                        } else {
                            console.log("alerts triggered, but not sent because signedUpForAlerts == false or invalid phone number in profile")
                            console.log("txtNum, txtBody", txtNum, txtBody)
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
        }
    },
    // FBSyncAlertChain: async function (user) {
    //     console.log("@@@@@@@@FBSyncAlertChain incoming user data is for user ", user)
    //     let updatedUser = ''
    //     let i = 0;
    //     let FBSyncAlertInterval = setInterval(async function () {
    //         try {
    //             console.log("^^^^^^^^FBSyncAlertInterval " + i + " index " + user.alertStage.length + " user.alertStage.length ")
    //             updatedUser = await db.CryonicsModel
    //                 .findOne({ firebaseAuthID: user.firebaseAuthID }).lean().exec()
    //                 .catch(err => res.status(422).json(err));
    //             // console.log("updatedUser", updatedUser)
    //             if (i >= user.alertStage.length) {
    //                 console.log("i >= user.alertStage.length, clearing interval")
    //                 clearInterval(FBSyncAlertInterval)
    //             } else if (updatedUser.checkinDevices.fitbit.syncAlertArray[0].activeState === true) {
    //                 // console.log(i, " Index---alert array and alert stage IF",
    //                 //     updatedUser.checkinDevices.fitbit.alertArray[0].stage[i],
    //                 //     updatedUser.alertStage[i])
    //                 if (!updatedUser.checkinDevices.fitbit.syncAlertArray[0].stage[i] &&
    //                     updatedUser.alertStage[i]) {
    //                     updatedUser.checkinDevices.fitbit.syncAlertArray[0].stage[i] = Date.now()
    //                     temp = await db.CryonicsModel
    //                         .findOneAndUpdate(
    //                             { firebaseAuthID: updatedUser.firebaseAuthID },
    //                             updatedUser,
    //                             {
    //                                 new: true,
    //                             }).lean().exec()
    //                         .catch(err => res.status(422).json(err));
    //                     const txtBody = "Fitbit  SYNC alert " + (i + 1) + " for " + user.name.toUpperCase() +
    //                         " Please sync your fitbit, or check up on that person. Click the link to send no further alert text/calls for this alert. " +
    //                         "https://cryonics-member-response-info.herokuapp.com/FBAlertClear/" + user._id + " Reply STOP to unsubscribe"
    //                     const txtNum = user.alertStage[i].num
    //                     if (updatedUser.signedUpForAlerts === true && txtNum != "none" && txtNum != "-1none" && txtNum != "" && txtNum != "-1") {
    //                         self.twilioOutboundTxt(user.name, txtBody, txtNum, user.alertStage[i].method || "txt")
    //                     } else {
    //                         console.log("FBSyncAlertInterval alerts triggered, but not sent because signedUpForAlerts == false or number is none")
    //                         console.log(txtNum, txtBody)
    //                     }
    //                 }

    //             } else {
    //                 console.log("FBSyncAlertInterval active state not true (or something else), clearing interval")
    //                 clearInterval(FBSyncAlertInterval)
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             console.log("FBSyncAlertInterval try catch error. Clearing interval")
    //             clearInterval(FBSyncAlertInterval)
    //         }
    //         i++;
    //     }, 60000);
    // },
    twilioOutboundTxt: function (user, txtBody, txtNum, callOrTxt) {
        console.log("twilioOutboundCount", twilioOutboundCount)
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        let twiml = "<Response><Gather action='https://cryonics-member-response-info.herokuapp.com/sms/" + user._id + "' method='GET'>" +
            "<Say>An alert has been generated for " + user.name + " Press any number to clear this alert</Say></Gather>" +
            "<Say>We didn't receive any input. The next number in line will be called with this alert. </Say></Response>"
        console.log("twiml", twiml)
        if (twilioOutboundCount == 90 || twilioOutboundCount == 150 || twilioOutboundCount == 160 || twilioOutboundCount == 170) {
            client.messages
                .create({
                    body: "twilioOutboundCount is " + twilioOutboundCount + " texts/calls will stop going out at 170",
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: process.env.PHONE
                })
                .then(message => console.log(message.sid));
        }
        if (twilioOutboundCount < 170) {
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
                        twiml: twiml,
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
        // console.log(
        //     "####DBuserFitbitDevice firebaseAuthID, fitBitDevice[0].deviceVersion, fitBitDevice[0].batteryLevel",
        //     firebaseAuthID, fitBitDevice[0].deviceVersion, fitBitDevice[0].batteryLevel
        // )
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
    // putSyncAlert: async function (user) {
    //     console.log("$$$$$$$$$$$$$$$putSyncAlert function user.name", user.name)
    //     const syncAlertArray =
    //     {
    //         date: Date.now(),
    //         activeState: true,
    //         stage: []
    //     }
    //     try {
    //         update = await db.CryonicsModel
    //             .updateOne({ firebaseAuthID: user.firebaseAuthID },
    //                 {
    //                     $push: {
    //                         "checkinDevices.fitbit.syncAlertArray": {
    //                             $each: [syncAlertArray],
    //                             $position: 0,
    //                             $slice: 250
    //                         }
    //                     },
    //                 }
    //             ).exec()
    //     } catch (err) {
    //         console.log("ERROR putSyncAlert")
    //     }
    //     self.FBSyncAlertChain(user);
    // },
};