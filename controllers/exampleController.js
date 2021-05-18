const db = require("../models");
module.exports = {
    findAll: function (req, res) {
        db.CryonicsModel
            .find()
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    }
    // findOneAndUpdate: function (req, res) {
    //     db.cryonicsModel
    //         .findOneAndUpdate(req)
    //         .then(dbModelDataResult => res.json(dbModelDataResult))
    //         .catch(err => res.status(422).json(err));
    // },
    // create: function (req, res) {
    //     db.cryonicsModel
    //         .create(req.body)
    //         .then(dbModelDataResult => res.json(dbModelDataResult))
    //         .catch(err => res.status(422).json(err));
    // },

};
