const db = require("../models");
// const serverCode = require("../serverCode");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const deviceController = require("./deviceController");

module.exports = {
    smsIncomingMsg: async function (req, res) {
        let incText = ''
        console.log("smsIncomingMsg")
        try {
            console.log("####################testing VARIABLES req.body, req.body.Body", req.body, req.body.Body)
            incText = req.body.Body.toLowerCase();
            const twiml = new MessagingResponse();
            if (incText == 'hello') {
                twiml.message('Hi!');
            } else if (incText == 'bye') {
                twiml.message('Goodbye');
            } else if (incText == 'test') {
                twiml.message('we think the number you texted us with is '+ req.body.From);
            } else {
                twiml.message(
                    'No Body param match, Twilio sends this in the request to your server. req.body.Body is ' + incText
                );
            }

            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
        } catch (err) {
            return res.status(400).json({ error: 'Error sending text' })
        }
    },
    resToOUtboundCall: async function (req, res) {
        console.log("resToOUtboundCall")
        try {
            console.log("----------response to phone call is req.params--------", req.params)
            console.log("----------response to phone call is req.query--------", req.query)
            console.log("----------response to phone call is req.query.Digits----------",  req.query.Digits)
            // "https://cryonics-member-response-info.herokuapp.com/FBAlertClear/" + req.params.id
            let user = 0
            console.log("resToOUtboundCall req.params._id", req.params._id)
            try {
                user = await db.CryonicsModel.findOne({ _id: req.params._id }).exec()
            } catch (err) {
                return res.status(400).json({ error: 'Error finding user to clear FBAlert' })
            }
            let watchalert = 0
            let syncAlert = 0
            user?.checkinDevices?.fitbit?.alertArray[0]?.activeState
                ? watchalert = await db.CryonicsModel.updateOne({ _id: req.params._id }, { $set: { "checkinDevices.fitbit.alertArray.0.activeState": false } }).exec()
                : console.log("not setting alert array to false. either doesnt exist, or is already false")
    
            user?.checkinDevices?.fitbit?.syncAlertArray[0]?.activeState
                ? syncAlert = await db.CryonicsModel.updateOne({ _id: req.params._id }, { $set: { "checkinDevices.fitbit.syncAlertArray.0.activeState": false } }).exec()
                : console.log("not setting alert array to false. either doesnt exist, or is already false")
            return res.status(200).send("<Response><Say>You entered the number " + req.query.Digits + " </Say></Response>");
        } catch (err) {
            console.log("ERROR!! ", err)
            return res.status(400).send("<Response><Say>Error clearing your alert</Say></Response>");
        }
    }
};

