const db = require("../models");
module.exports = {
    findAll: function (req, res) {
        db.CryonicsModel
            .find()
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
    // update: function (req, res) {
    //     //this will find one and update. if no record with that firebase auth id exists
    //     //this will create that record. if it does exist, itll update it. 
    //     db.CryonicsModel
    //         .findOneAndUpdate({ firebaseAuthID: req.body.firebaseAuthID }, req.body, {
    //             upsert: true,
    //         })
    //         .then(dbModelDataResult => res.json(dbModelDataResult))
    //         .catch(err => res.status(422).json(err));
    // },
    create: function (req, res) {
        console.log("🚀 ~ file: exampleController.js ~ line 20 ~ req.body", req.body)
        db.CryonicsModel
            //TODO this needs to add a record ONLY if a record with that firebase auth does not exist
            //AND also handle the time stamp correctly

            //Currently handles time correctly, but will add new records with the same firebase auth
            .insertMany(req.body)
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

    //:id use req.params._id
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
    getcheckin: function (req, res) {
        console.log("🚀 ~ file: exampleController.js ~ line 37 ~ req", req.params)

    },
    putcheckin: function (req, res) {
        console.log("🚀 ~ file: exampleController.js ~ line 46 ~ req.body.firebaseAuthID", req.body.firebaseAuthID)
        //TODO make sure the website checking date is getting updated to the most recent. 
        db.CryonicsModel
            .findOneAndUpdate({ firebaseAuthID: req.body.firebaseAuthID },
                //this shows that the update is working
                // {name:"updated name"},
                { dateCreated: new Date().toISOString() },
            )
            // .updateOne({ firebaseAuthID: req.body.firebaseUserID },
            //     { name: "putcheckin Pushed" },
            // )
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
};
