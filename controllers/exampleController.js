const db = require("../models");

module.exports = {
    fitbitGetAuthToken: function (req, res) {
        db.CryonicsModel
            .findOne({ firebaseAuthID: req.params.firebaseAuthID })
            .then(dbModelDataResult => res.json(dbModelDataResult.checkinDevices.fitbit))
            .catch(err => res.status(422).json(err));
    },

    putFitBitTokens: function (req, res) {
        db.CryonicsModel
            .findOneAndUpdate({ firebaseAuthID: req.body.firebaseAuthID },
                {$set:{"checkinDevices.fitbit": req.body.checkinDevices.fitbit}}
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

    putFitBitManualCheckin: function (req, res) {
        db.CryonicsModel
            .findOneAndUpdate({ firebaseAuthID: req.body.firebaseAuthID },
                {$set:{"checkinDevices.fitbit.checkinArray": req.body.checkinDevices.fitbit.checkinArray}}
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

    putWebcheckIn: function (req, res) {
        db.CryonicsModel
            .findOneAndUpdate({ firebaseAuthID: req.body.firebaseAuthID },
                {$set:{"checkinDevices.WebsiteCheckIn.checkinArray": req.body.checkinDevices.WebsiteCheckIn.checkinArray}}
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

    create: function (req, res) {
        // console.log("🚀 ~ file: exampleController.js ~ line 20 ~ req.body", req.body)
        db.CryonicsModel
            .findOneAndUpdate(
                { firebaseAuthID: req.body.firebaseAuthID },
                req.body,
                {
                    new: true,
                    upsert: true
                })
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

    edit: function (req, res) {
        db.CryonicsModel
            .findOneAndUpdate(
                { firebaseAuthID: req.body.firebaseAuthID },
                req.body,
                {
                    new: true
                })
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
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
