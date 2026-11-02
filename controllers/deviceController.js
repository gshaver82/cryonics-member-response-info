

const db = require("../models");
const serverCode = require("../serverCode");

module.exports = {

    // =====================================================
    // RECEIVE WATCH EMERGENCY ALERT
    // PUT /cApi/device
    // =====================================================

    putDeviceAlert: async function (req, res) {

        // The bearer token was already validated in server.js.
        // The middleware attaches the authenticated identity
        // to req.pairedDevice.
        //
        // Never trust a user_id supplied in req.body.

        const firebaseAuthID = req.pairedDevice?.firebaseAuthID;

        if (!firebaseAuthID) {
            console.log(
                "[DEVICE] Missing authenticated device identity"
            );

            return res.status(401).json({
                error: "Device authentication required"
            });
        }

        // =================================================
        // VALIDATE INCOMING ALERT DATA
        // =================================================

        const newArrayEntry = req.body?.newArrayEntry;

        if (!newArrayEntry) {
            return res.status(400).json({
                error: "Missing alert data"
            });
        }

        const alertDate = new Date(newArrayEntry.date);

        if (isNaN(alertDate.getTime())) {
            return res.status(400).json({
                error: "Invalid alert date"
            });
        }

        const alertEntry = {
            date: alertDate,
            activeState: true,
            stage: []
        };

        // GPS is optional.
        // Validate latitude and longitude if supplied.

        const lat = newArrayEntry.lat;
        const long = newArrayEntry.long;

        if (
            typeof lat === "number" &&
            typeof long === "number" &&
            Number.isFinite(lat) &&
            Number.isFinite(long) &&
            lat >= -90 &&
            lat <= 90 &&
            long >= -180 &&
            long <= 180
        ) {
            alertEntry.lat = lat;
            alertEntry.long = long;
        }

        // =================================================
        // STORE ALERT IN MONGODB
        // =================================================

        let user;

        try {

            user = await db.CryonicsModel.findOneAndUpdate(
                {
                    firebaseAuthID: firebaseAuthID,

                    "checkinDevices.fitbit.deviceTokenRevoked":
                        false
                },
                {
                    $push: {
                        "checkinDevices.fitbit.alertArray": {
                            $each: [alertEntry],
                            $position: 0,
                            $slice: 250
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            ).exec();

        } catch (error) {

            console.error(
                "[DEVICE] Failed to store watch alert:",
                error
            );

            return res.status(500).json({
                error: "Unable to store emergency alert"
            });
        }

        if (!user) {
            console.log(
                "[DEVICE] User not found or device revoked"
            );

            return res.status(403).json({
                error: "Device is not authorized"
            });
        }

        // =================================================
        // START EXISTING TWILIO ESCALATION
        // =================================================

        try {

            // Existing function retained in serverCode.js.
            // It uses checkinDevices.fitbit.alertArray[0].
            //
            // No Fitbit OAuth or Fitbit cloud API is involved.

            serverCode.FBAlertChain(user);

        } catch (error) {

            console.error(
                "[DEVICE] Unable to start alert escalation:",
                error
            );

            return res.status(500).json({
                error: "Alert recorded but escalation failed"
            });
        }

        console.log(
            "[DEVICE] Emergency alert accepted for display ID:",
            req.pairedDevice.displayId
        );

        return res.status(200).json({
            success: true,
            message: "Emergency alert recorded"
        });
    },

    // =====================================================
    // CLEAR EXISTING FITBIT WATCH ALERT
    // PUT /cApi/device/:_id
    // =====================================================

    putClearFBAlert: async function (req, res) {

        // Preserved for compatibility with the existing
        // alert-clearing system.
        //
        // This route still uses the old authorization
        // middleware in routes/index.js.
        //
        // Its authentication can be migrated separately.

        const userId = req.params._id;

        let user;

        try {

            user = await db.CryonicsModel
                .findOne({ _id: userId })
                .exec();

        } catch (error) {

            console.error(
                "[DEVICE] Error finding user to clear alert:",
                error
            );

            return res.status(400).json({
                error: "Error finding user"
            });
        }

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        let watchalert = 0;
        let syncAlert = 0;

        try {

            // Clear most recent active watch alert.
            if (
                user.checkinDevices?.fitbit
                    ?.alertArray?.[0]?.activeState === true
            ) {

                watchalert = await db.CryonicsModel
                    .updateOne(
                        {
                            _id: userId
                        },
                        {
                            $set: {
                                "checkinDevices.fitbit.alertArray.0.activeState":
                                    false
                            }
                        }
                    )
                    .exec();
            }

            // Preserve legacy sync-alert clearing.
            if (
                user.checkinDevices?.fitbit
                    ?.syncAlertArray?.[0]?.activeState === true
            ) {

                syncAlert = await db.CryonicsModel
                    .updateOne(
                        {
                            _id: userId
                        },
                        {
                            $set: {
                                "checkinDevices.fitbit.syncAlertArray.0.activeState":
                                    false
                            }
                        }
                    )
                    .exec();
            }

        } catch (error) {

            console.error(
                "[DEVICE] Failed to clear alert:",
                error
            );

            return res.status(500).json({
                error: "Unable to clear alert"
            });
        }

        return res.status(200).json({
            watchalert,
            syncAlert
        });
    }
};

