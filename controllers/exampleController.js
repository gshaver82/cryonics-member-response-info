const db = require("../models");

module.exports = {
    currentStatusNote: function (req, res) {
        console.log("🚀 ~ currentStatusNote")
        
        console.log(req.body.firebaseAuthID , req.body.currentStatusNote)
        db.CryonicsModel
            .updateOne({ firebaseAuthID: req.body.firebaseAuthID },
                {
                    $push: {
                        "pubNotes": {
                            $each: [{note:req.body.currentStatusNote}],
                            $position: 0,
                            $slice: 25
                        }
                    },
                }
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
    fitbitGetAuthToken: function (req, res) {
        db.CryonicsModel
            .findOne({ firebaseAuthID: req.params.firebaseAuthID })
            .then(dbModelDataResult => res.json(dbModelDataResult.checkinDevices.fitbit))
            .catch(err => res.status(422).json(err));
    },

    putFitBitTokens: function (req, res) {
        // console.log("🚀 ~ putFitBitTokens")
        db.CryonicsModel
            .updateOne({ firebaseAuthID: req.body.firebaseAuthID },
                {
                    $set: {
                        "checkinDevices.fitbit.fitbitDeviceRegistered": req.body.checkinDevices.fitbit.fitbitDeviceRegistered,
                        "checkinDevices.fitbit.authToken": req.body.checkinDevices.fitbit.authToken,
                        "checkinDevices.fitbit.refreshToken": req.body.checkinDevices.fitbit.refreshToken,
                        "checkinDevices.fitbit.user_id": req.body.checkinDevices.fitbit.user_id,
                    }
                }
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

    putFitBitManualCheckin: function (req, res) {
        // console.log("🚀 ~ putFitBitManualCheckin")
        db.CryonicsModel
            .updateOne({ firebaseAuthID: req.body.firebaseAuthID },
                {
                    $push: {
                        "checkinDevices.fitbit.checkinArray": {
                            $each: [req.body.newArrayEntry],
                            $position: 0,
                            $slice: 25
                        }
                    },
                }
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
    putFitBitManualDeviceCheckin: function (req, res) {
        console.log("🚀 ~ putFitBitManualCheckin req.body", req.body)
        db.CryonicsModel
        .updateOne({ firebaseAuthID: firebaseAuthID },
            {
                $set: {
                    "fbDeviceName": req.body.deviceVersion, "fbDeviceBat": req.body.batteryLevel
                }
            }
        )
        .then(dbModelDataResult => res.json(dbModelDataResult))
        .catch(err => console.log(err));
    },
    putWebcheckIn: function (req, res) {
        db.CryonicsModel
            .updateOne({ firebaseAuthID: req.body.firebaseAuthID },
                {
                    $push: {
                        "checkinDevices.WebsiteCheckIn.checkinArray": {
                            $each: [req.body.newCheckinData],
                            $position: 0,
                            $slice: 5
                        }
                    }
                }
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },


    findAll: function (req, res) {
        db.CryonicsModel
            .find()
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

    edit: function (req, res) {
        //if incoming user exists with alert data, but no name, change only alert data
        //else if it has alert data and name, its an edit from profile and change what profile would change
        // != null allows false to be translated as true for the IF statement
        if (req.body.signedUpForAlerts != null && !req.body.name) {
            db.CryonicsModel
                .findOneAndUpdate({ firebaseAuthID: req.body.firebaseAuthID },
                    { $set: { "signedUpForAlerts": req.body.signedUpForAlerts } },
                    {
                        new: true,
                    })
                .then(dbModelDataResult => res.json(dbModelDataResult))
                .catch(err => res.status(422).json(err));
        } else if (req.body.name) {
            db.CryonicsModel
                .findOneAndUpdate({ firebaseAuthID: req.body.firebaseAuthID },
                    {
                        $set: {
                            "name": req.body.name,
                            "dateCreated": req.body.dateCreated,
                            "description": req.body.description,
                            "group": req.body.group,
                            "cryonicsProvider": req.body.cryonicsProvider,
                            "photoURL": req.body.photoURL,
                            "signedUpForAlerts": req.body.signedUpForAlerts,
                            "alertStage": req.body.alertStage,
                            "checkinDevices": req.body.checkinDevices,
                        }
                    },
                    {
                        new: true,
                        upsert: true
                    })
                .then(dbModelDataResult => res.json(dbModelDataResult))
                .catch(err => res.status(422).json(err));
        } else {
            console.log("error editing")
        }
    },

    findById: function (req, res) {
        db.CryonicsModel
            .findById(req.params._id)
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

    findByFirebaseId: function (req, res) {
        db.CryonicsModel
            .findOne({ firebaseAuthID: req.params.firebaseUserID })
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
    delete: function (req, res) {
        db.CryonicsModel
            .findById({ _id: req.params._id })
            .then(dbModelDataResult => dbModelDataResult.remove())
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },


};
