const db = require("../models");
module.exports = {
    findOneAndUpdate: function (req, res) {
        db.exampleModel
            .findOneAndUpdate(req)
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));
    },

};
