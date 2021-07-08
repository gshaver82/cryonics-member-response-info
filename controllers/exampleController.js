const db = require("../models");
module.exports = {
    findAll: function (req, res) {
        db.CryonicsModel
            .find()
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

    create: function (req, res) {
        console.log("🚀 ~ file: exampleController.js ~ line 20 ~ req.body", req.body)
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
        // console.log("🚀 ~ file: exampleController.js ~ line 24 ~ edit")
        // console.log("🚀 ~ file: exampleController.js ~ line 20 ~ req.body", req.body)
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

    delete: function (req, res) {
        console.log("🚀 ~ file: exampleController.js ~ line 35 ~ req.params._id", req.params._id)
        db.CryonicsModel
            .findById({ _id: req.params._id })
            .then(dbModelDataResult => dbModelDataResult.remove())
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
    putcheckin: function (req, res) {
        console.log("🚀 ~ file: exampleController.js ~ line 46 ~ req.body.firebaseAuthID", req.body.firebaseAuthID)
        db.CryonicsModel
            .findOneAndUpdate({ firebaseAuthID: req.body.firebaseAuthID },
                req.body,
                {
                    new: true
                }
            )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
    getcheckin: function (req, res) {
        console.log("🚀 ~ file: exampleController.js ~ line 52 ~ getcheckin")
    },
};
