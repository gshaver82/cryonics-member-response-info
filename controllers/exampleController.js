const db = require("../models");
const fetch = require("node-fetch");


module.exports = {
    postForAuthToken: function (req, res) {
        db.CryonicsModel
            .find()
            .then(dbModelDataResult => res.json(dbModelDataResult))
            .catch(err => res.status(422).json(err));

        // postForAuthToken: async function postData(fitbitAuthTokenNeededData) {
        //     console.log("inside example controller fitbitAuthTokenNeededData", fitbitAuthTokenNeededData)
        //     url = 'https://api.fitbit.com/oauth2/token' + '?clientId=' + fitbitAuthTokenNeededData.clientId
        //         + '&grant_type=' + fitbitAuthTokenNeededData.grant_type + '&redirect_uri=' + fitbitAuthTokenNeededData.redirect_uri
        //         + '&code=' + fitbitAuthTokenNeededData.code
        //     const response = await fetch(url, {
        //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //         // mode: 'cors', // no-cors, *cors, same-origin
        //         // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //         // credentials: 'same-origin', // include, *same-origin, omit

        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             'Authorization': fitbitAuthTokenNeededData.Authorization
        //             // 'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //         // redirect: 'follow', // manual, *follow, error
        //         // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //         // body: JSON.stringify(data) // body data type must match "Content-Type" header                
        //     });
        //     console.log("🚀 ~ postData ~ response.json()", response.body.json())
        //     return response.body.json(); // parses JSON response into native JavaScript objects

    },


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
    putcheckin: function (req, res) {
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
};
