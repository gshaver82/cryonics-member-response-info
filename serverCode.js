
const db = require("./models");
const crypto = require("crypto");
const admin = require("firebase-admin");

let twilioOutboundCount = 0;

const PAIRING_CODE_LIFETIME = 10 * 60 * 1000;

// The server stores new device information here.
const FITBIT_PATH = "checkinDevices.fitbit";

// =====================================================
// AUTHENTICATION HELPERS
// =====================================================

function hashDeviceToken(token) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}

// A six-digit pairing code has low entropy.
// Use a keyed hash so a stolen database alone cannot
// be used to brute-force the pairing codes offline.
function hashPairingCode(code) {
    if (!process.env.PAIRING_CODE_SECRET) {
        throw new Error("PAIRING_CODE_SECRET is not configured");
    }

    return crypto
        .createHmac(
            "sha256",
            process.env.PAIRING_CODE_SECRET
        )
        .update(code)
        .digest("hex");
}

function generateDisplayId() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
        result += alphabet[
            crypto.randomInt(0, alphabet.length)
        ];
    }

    return result;
}

// =====================================================
// SERVER DATABASE AND ALERT FUNCTIONS
// =====================================================

var self = module.exports = {

    // =================================================
    // VERIFY WEBSITE USER
    // =================================================

    verifyWebsiteUser: async function (websiteToken) {

        if (!websiteToken) return null;

        // Firebase Admin must be initialized elsewhere
        // with valid server-side credentials.
        const decodedToken = await admin
            .auth()
            .verifyIdToken(websiteToken, true);

        if (!decodedToken || !decodedToken.uid) {
            return null;
        }

        return db.CryonicsModel
            .findOne({
                firebaseAuthID: decodedToken.uid
            })
            .select("firebaseAuthID name")
            .lean()
            .exec();
    },

    // =================================================
    // GENERATE TEMPORARY PAIRING CODE
    // Called by POST /cApi/device/pair-code
    // =================================================

    createDevicePairingCode: async function (firebaseAuthID) {

        const pairingCode = crypto
            .randomInt(0, 1000000)
            .toString()
            .padStart(6, "0");

        const pairingCodeHash =
            hashPairingCode(pairingCode);

        const expiresAt = new Date(
            Date.now() + PAIRING_CODE_LIFETIME
        );

        const result = await db.CryonicsModel
            .updateOne(
                {
                    firebaseAuthID: firebaseAuthID
                },
                {
                    $set: {
                        [FITBIT_PATH + ".pairingCodeHash"]:
                            pairingCodeHash,

                        [FITBIT_PATH + ".pairingCodeExpiresAt"]:
                            expiresAt
                    }
                }
            )
            .exec();

        if (!result.n && !result.matchedCount) {
            throw new Error("User not found");
        }

        // Only return the raw code to the
        // authenticated website.
        return {
            pairingCode: pairingCode,
            expiresAt: expiresAt
        };
    },

    // =================================================
    // EXCHANGE PAIRING CODE FOR DEVICE TOKEN
    // Called by POST /cApi/device/pair
    // =================================================

    exchangeDevicePairingCode: async function (pairingCode) {

        if (!/^[0-9]{6}$/.test(pairingCode)) {
            return null;
        }

        const pairingCodeHash =
            hashPairingCode(pairingCode);

        const deviceToken = crypto
            .randomBytes(32)
            .toString("hex");

        const deviceTokenHash =
            hashDeviceToken(deviceToken);

        const displayId = generateDisplayId();

        const now = new Date();

        // Atomically consume the temporary code.
        // A second request using the same code
        // cannot successfully pair again.
        const updatedUser = await db.CryonicsModel
            .findOneAndUpdate(
                {
                    [FITBIT_PATH + ".pairingCodeHash"]:
                        pairingCodeHash,

                    [FITBIT_PATH + ".pairingCodeExpiresAt"]:
                        { $gt: now }
                },
                {
                    $set: {
                        [FITBIT_PATH + ".deviceTokenHash"]:
                            deviceTokenHash,

                        [FITBIT_PATH + ".displayId"]:
                            displayId,

                        [FITBIT_PATH + ".pairedAt"]:
                            now,

                        [FITBIT_PATH + ".deviceTokenRevoked"]:
                            false
                    },

                    $unset: {
                        [FITBIT_PATH + ".pairingCodeHash"]: "",

                        [FITBIT_PATH + ".pairingCodeExpiresAt"]: ""
                    }
                },
                {
                    new: true
                }
            )
            .select("firebaseAuthID")
            .lean()
            .exec();

        if (!updatedUser) {
            return null;
        }

        console.log(
            "Fitbit device successfully paired."
        );

        // The raw token is returned once to the
        // companion. MongoDB keeps only its hash.
        return {
            deviceToken: deviceToken,
            displayId: displayId
        };
    },

    // =================================================
    // VALIDATE DEVICE TOKEN
    // Called by PUT /cApi/device middleware
    // =================================================

    validateDeviceToken: async function (deviceToken) {

        if (
            typeof deviceToken !== "string" ||
            !/^[a-fA-F0-9]{64}$/.test(deviceToken)
        ) {
            return null;
        }

        const deviceTokenHash =
            hashDeviceToken(deviceToken);

        const user = await db.CryonicsModel
            .findOne({
                [FITBIT_PATH + ".deviceTokenHash"]:
                    deviceTokenHash,

                [FITBIT_PATH + ".deviceTokenRevoked"]:
                    false
            })
            .select(
                "firebaseAuthID " +
                "checkinDevices.fitbit.displayId"
            )
            .lean()
            .exec();

        if (!user) {
            return null;
        }

        return {
            firebaseAuthID: user.firebaseAuthID,
            displayId: user.checkinDevices.fitbit.displayId
        };
    },

    // =================================================
    // REVOKE A PAIRED WATCH
    // To be connected to the website later.
    // =================================================

    revokeDeviceToken: async function (firebaseAuthID) {

        return db.CryonicsModel
            .updateOne(
                {
                    firebaseAuthID: firebaseAuthID
                },
                {
                    $set: {
                        [FITBIT_PATH + ".deviceTokenRevoked"]:
                            true
                    }
                }
            )
            .exec();
    },

    // =================================================
    // EXISTING FITBIT ALERT ESCALATION
    // =================================================

    FBAlertChain: async function (user) {

        console.log(
            "**************FBAlertChain incoming user data is for user ",
            user.name
        );

        let updatedUser = "";
        let i = 0;

        let FBAlertInterval = setInterval(alertLogic, 60000);
        alertLogic();

        async function alertLogic() {
            try {
                updatedUser = await db.CryonicsModel
                    .findOne({
                        firebaseAuthID: user.firebaseAuthID
                    })
                    .lean()
                    .exec();

                console.log(
                    "^^^^^^^^FBAlertInterval " + i +
                    " index " + updatedUser.alertStage.length +
                    " user.alertStage.length "
                );

                if (i >= updatedUser.alertStage.length) {

                    console.log(
                        "i >= user.alertStage.length, clearing interval"
                    );

                    clearInterval(FBAlertInterval);

                } else if (
                    updatedUser.checkinDevices.fitbit
                        .alertArray[0].activeState === true
                ) {

                    if (
                        !updatedUser.checkinDevices.fitbit
                            .alertArray[0].stage[i] &&
                        updatedUser.alertStage[i]
                    ) {

                        updatedUser.checkinDevices.fitbit
                            .alertArray[0].stage[i] = Date.now();

                        const temp = await db.CryonicsModel
                            .findOneAndUpdate(
                                {
                                    firebaseAuthID:
                                        updatedUser.firebaseAuthID
                                },
                                updatedUser,
                                {
                                    new: true
                                }
                            )
                            .lean()
                            .exec();

                        let lat = user.checkinDevices.fitbit
                            .alertArray[0].lat
                            ? user.checkinDevices.fitbit
                                .alertArray[0].lat
                            : 0;

                        let long = user.checkinDevices.fitbit
                            .alertArray[0].long
                            ? user.checkinDevices.fitbit
                                .alertArray[0].long
                            : 0;

                        let googleMapsURL = " ";

                        if (lat !== 0 && long !== 0) {
                            googleMapsURL =
                                "https://www.google.com/maps/place/" +
                                lat + "+" + long + " ";
                        }

                        const txtBody =
                            "Fitbit WATCH alert " +
                            (i + 1) + " for " +
                            user.name.toUpperCase() + " " +
                            googleMapsURL +
                            "Please check your watch, or check up on that person. " +
                            "Click here to CLEAR THIS ALERT. " +
                            "https://cryonics-member-response-info.herokuapp.com/FBAlertClear/" +
                            user._id +
                            " Reply STOP to unsubscribe";

                        const txtNum = user.alertStage[i].num;

                        if (
                            updatedUser.signedUpForAlerts === true &&
                            txtNum != "none" &&
                            txtNum != "-1none" &&
                            txtNum != "" &&
                            txtNum != "-1"
                        ) {

                            self.twilioOutboundTxt(
                                user,
                                txtBody,
                                txtNum,
                                user.alertStage[i].method
                            );

                        } else {
                            console.log(
                                "alerts triggered, but not sent because signedUpForAlerts == false or invalid phone number in profile"
                            );

                            console.log(
                                "txtNum, txtBody",
                                txtNum,
                                txtBody
                            );
                        }
                    }

                } else {
                    console.log(
                        "active state not true (or something else), clearing interval"
                    );

                    clearInterval(FBAlertInterval);
                }

            } catch (error) {
                console.error(error);
                console.log(
                    "try catch error. Clearing interval"
                );
                clearInterval(FBAlertInterval);
            }

            i++;
        }
    },

    // =================================================
    // EXISTING TWILIO ALERT DELIVERY
    // =================================================

    twilioOutboundTxt: function (
        user,
        txtBody,
        txtNum,
        callOrTxt
    ) {

        console.log(
            "twilioOutboundCount",
            twilioOutboundCount
        );

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const client = require("twilio")(
            accountSid,
            authToken
        );

        let twiml =
            "<Response><Gather action='https://cryonics-member-response-info.herokuapp.com/sms/" +
            user._id +
            "' method='GET'>" +
            "<Say>An alert has been generated for " +
            user.name +
            " Press any number to clear this alert</Say></Gather>" +
            "<Say>We didn't receive any input. The next number in line will be called with this alert. </Say></Response>";

        console.log("twiml", twiml);

        if (
            twilioOutboundCount == 90 ||
            twilioOutboundCount == 150 ||
            twilioOutboundCount == 160 ||
            twilioOutboundCount == 170
        ) {

            client.messages
                .create({
                    body:
                        "twilioOutboundCount is " +
                        twilioOutboundCount +
                        " texts/calls will stop going out at 170",

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

            console.log(
                txtBody,
                "---server message sent---",
                txtNum
            );

            if (callOrTxt === "call") {

                client.calls
                    .create({
                        twiml: twiml,
                        to: txtNum,
                        from: process.env.TWILIO_PHONE_NUMBER
                    })
                    .then(call => console.log(call.sid));

                console.log(
                    "---server phone out sent---",
                    txtNum
                );

                twilioOutboundCount++;
            }

            twilioOutboundCount++;

        } else {
            console.log(
                "twillio outbound count is too high for the day"
            );
        }
    },

    // =================================================
    // EXISTING SERVER UPTIME HELPER
    // =================================================

    fifteenMin: function () {

        let hourcount = 0;
        let Fifteenmincount = 0;

        fifteenmincounttimer = setInterval(function () {

            Fifteenmincount++;

            let remainder = (Fifteenmincount % 4) * 15;

            remainder === 0
                ? hourcount++
                : remainder;

            console.log(
                "it has been " +
                hourcount +
                " hours, and " +
                remainder +
                " minutes since server start"
            );

        }, 900000);
    },

    // =================================================
    // LEGACY DATABASE FUNCTIONS — PRESERVED
    // =================================================

    DBuserFitbitDevice: function (
        firebaseAuthID,
        fitBitDevice
    ) {

        return db.CryonicsModel
            .updateOne(
                {
                    firebaseAuthID: firebaseAuthID
                },
                {
                    $set: {
                        "checkinDevices.fitbit.fbDeviceName":
                            fitBitDevice[0].deviceVersion,

                        "checkinDevices.fitbit.fbDeviceBat":
                            fitBitDevice[0].batteryLevel
                    }
                }
            )
            .catch(err => console.log(err));
    },

    DBFindFitbitUsers: function () {

        return db.CryonicsModel
            .find({
                "checkinDevices.fitbit.fitbitDeviceRegistered":
                    "true"
            })
            .catch(err => console.log(err));
    },

    putFitBitServerCheckin: function (
        fitbitCheckinObjectForDB
    ) {

        return db.CryonicsModel
            .updateOne(
                {
                    firebaseAuthID:
                        fitbitCheckinObjectForDB.firebaseAuthID
                },
                {
                    $push: {
                        "checkinDevices.fitbit.checkinArray": {
                            $each: [
                                fitbitCheckinObjectForDB.newArrayEntry
                            ],
                            $position: 0,
                            $slice: 25
                        }
                    }
                }
            )
            .catch(err => console.log(err));
    }

};
