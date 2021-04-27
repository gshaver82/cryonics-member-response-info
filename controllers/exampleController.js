const db = require("../models");
module.exports = {
    findAll: function (req, res) {
        db.exampleModel
            .find()
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

};
