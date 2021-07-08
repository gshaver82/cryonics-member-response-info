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
        
        //TODO this works to create the record only if record not already created.

        //BUG the webcheckin date time displays CURRENT time on a refresh, not any data from DB
        //possibly as a result from the model having a default date.now?
        //but that was designed so that the data could be PUT in and date from THAT time would be frozen in
        //DB has no date created. 
            .findOneAndUpdate(
                { firebaseAuthID: req.body.firebaseAuthID },
                req.body,
                {
                    new: true,
                    upsert: true 
                }
            )

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
