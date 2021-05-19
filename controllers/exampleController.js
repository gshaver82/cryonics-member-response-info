const db = require("../models");
module.exports = {
    findAll: function (req, res) {
        db.CryonicsModel
            .find()
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
    // findOneAndUpdate: function (req, res) {
    //     db.cryonicsModel
    //         .findOneAndUpdate(req)
    //         .then(dbModelDataResult => res.json(dbModelDataResult))
    //         .catch(err => res.status(422).json(err));
    // },

    // create: function (req, res) {
    //     db.CryonicsModel
    //         .create(req.body)
    //         .then(dbModelDataResult => res.json(dbModelDataResult))
    //         .catch(err => res.status(422).json(err));
    // },
    update: function (req, res) {
        console.log('req.firebaseAuthID')
        console.log(req.body)
        // console.log(res)


        //this will find one and update. if no record with that firebase auth id exists
        //this will create that record. if it does exist, itll update it. 
        db.CryonicsModel
            .findOneAndUpdate({ firebaseAuthID: req.body.firebaseAuthID }, req.body, {
                new: true,
                upsert: true,
            })
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },
};
